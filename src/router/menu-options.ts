import { h } from "vue";
import type { Component } from "vue";
import { NIcon } from "naive-ui";
import type { MenuOption } from "naive-ui";
import { RouterLink } from 'vue-router'
import { HomeOutline, AppsOutline, ApertureOutline, ConstructOutline, Flask } from '@vicons/ionicons5'
import { FundProjectionScreenOutlined } from '@vicons/antd'
function renderIcon(icon: Component) {
    return () => h(NIcon, null, { default: () => h(icon) })
}
interface MenuOptionExtend {
    label: string;
    path: string;
    params?: object;
    description?: string;
    [propName: string]: any;
}
function renderMenuLabel(option: MenuOptionExtend) {
    const routeParams = option.params ? { params: option.params } : {}
    return () => h(RouterLink, {
        to: {
            path: option.path,
            ...routeParams,
        }
    }, {
        default: () => [h('span', null, option.label), h('span', {
            style: {
                opacity: 0.5, display: 'block', whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
        } }, option.description)]
})
}

const initMenu: MenuOptionExtend[] = [
    {
        label: '首页',
        description: '博客文章',
        key: 'HomePage',
        path: '/HomePage',
        icon: renderIcon(HomeOutline),
    },
    {
        label: '项目案例',
        description: '持续准备中',
        key: 'ProjectCase',
        path: '/ProjectCase',
        icon: renderIcon(FundProjectionScreenOutlined),
    },
    {
        label: '趣味效果',
        description: '技术及兴趣驱动',
        key: 'FunEffect',
        path: '/FunEffect',
        icon: renderIcon(AppsOutline),
    },
    {
        label: '经验教训',
        description: '知识积累，问题日志',
        key: 'ObjectLesson',
        path: '/ObjectLesson',
        icon: renderIcon(Flask),
    },
    {
        label: '我的工具',
        description: '自研及第三方工具',
        key: 'MyTools',
        path: '/MyTools',
        icon: renderIcon(ConstructOutline),
    },
    {
        label: '个人空间',
        description: '好像没什么信息',
        key: 'PersonalSpace',
        path: '/PersonalSpace',
        icon: renderIcon(ApertureOutline),
    },
]

const menuOptions: MenuOption[] = initMenu.map((item) => ({
    ...item,
    description: `${item.label} ${item.description}`,
    label: renderMenuLabel(item),
}))

export default menuOptions