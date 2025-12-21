/*************函数***************/
import { createRouter, createWebHashHistory } from 'vue-router';
import type { RouteLocationNormalized, NavigationGuardNext } from 'vue-router';

/*************组件***************/
import Page404 from '@/views/Page404.vue';
import MainBox from '@/views/MainBox.vue';
import HomePage from '@/views/HomePage.vue';

function convertStyleName(styleName: String) {
  // 先将首字母转为小写，再转换
  const lowerFirst = styleName.charAt(0).toLowerCase() + styleName.slice(1);
  return lowerFirst.replace(/([A-Z])/g, '-$1').toLowerCase();
}
/*************动态引入组件***************/
const components = import.meta.glob('@/views/**/*.vue');
const dynamicPath = [];
for (const key in components) {
  const fileName = key.split('/').slice(-1)[0].split('.')[0];
  if (!fileName || ['HomePage', 'MainBox', 'Page404'].includes(fileName)) continue;
  const pathName = convertStyleName(fileName);
  const path = ['BlogDetail'].includes(fileName) ? `/${pathName}/:id` : `/${pathName}`;
  dynamicPath.push({
    path,
    component: components[key]
  });
}

const routes = [
  {
    path: '/',
    redirect: '/blog-post'
  },
  {
    path: '/home-page',
    component: HomePage
  },
  { path: '/main-box', component: MainBox, children: dynamicPath },
  { path: '/:catchAll(.*)', component: Page404 }
];

const router = createRouter({
  history: createWebHashHistory(),
  routes
});

import { createDiscreteApi } from 'naive-ui';

// 创建离散API实例
const { loadingBar } = createDiscreteApi(['loadingBar']);
// 路由导航守卫
router.beforeEach(
  (to: RouteLocationNormalized, from: RouteLocationNormalized, next: NavigationGuardNext) => {
    console.log(to, from);
    // 开始加载
    loadingBar.start();
    next(); // 确保调用 next() 函数
  }
);

router.afterEach(() => {
  // 完成加载
  setTimeout(() => {
    loadingBar.finish();
  }, 200);
});

router.onError(() => {
  // 加载出错
  loadingBar.error();
});

export default router;
