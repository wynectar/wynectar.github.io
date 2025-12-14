/*************函数***************/
import { createRouter, createWebHashHistory } from 'vue-router'

/*************组件***************/
import Page404 from '@/views/Page404.vue'
import MainBox from '@/views/MainBox.vue'
import HomePage from '@/views/HomePage.vue'

function convertStyleName(styleName: String) {
    // 先将首字母转为小写，再转换
    const lowerFirst = styleName.charAt(0).toLowerCase() + styleName.slice(1);
    return lowerFirst.replace(/([A-Z])/g, '-$1').toLowerCase()
};
/*************动态引入组件***************/
const components = import.meta.glob('@/views/**/*.vue')
const dynamicPath = []
for (const key in components) {
    const fileName = key.split('/').slice(-1)[0].split('.')[0]
    if (!fileName || ['HomePage', 'MainBox', 'Page404'].includes(fileName)) continue
    const pathName = convertStyleName(fileName)
    const path = ['BlogDetail'].includes(fileName) ? `/${pathName}/:id` : `/${pathName}`
    dynamicPath.push({
        path,
        component: components[key]
    })
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
    { path: '/:catchAll(.*)', component: Page404 },
]

const router = createRouter({
    history: createWebHashHistory(),
    routes,
})

export default router