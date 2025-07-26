/*************函数***************/
import { createRouter, createWebHashHistory } from 'vue-router'

/*************组件***************/
import Page404 from '@/views/Page404.vue'
import MainBox from '@/views/MainBox.vue'

/*************动态引入组件***************/
const components = import.meta.glob('@/views/**/*.vue')
const dynamicPath = []
for (const key in components) {
    const fileName = key.split('/').slice(-1)[0].split('.')[0]
    if (!fileName || ['MainBox', 'Page404'].includes(fileName)) continue
    const path = ['BlogPost'].includes(fileName) ?`/${fileName}/:id` :`/${fileName}`
    dynamicPath.push({
        path,
        component: components[key]
    })
}

const routes = [
    {
        path: '/',
        redirect: '/HomePage'
    },
    { path: '/MainBox', component: MainBox,children: dynamicPath},
    { path: '/:catchAll(.*)', component: Page404 },
]

const router = createRouter({
    history: createWebHashHistory(),
    routes,
})


export default router