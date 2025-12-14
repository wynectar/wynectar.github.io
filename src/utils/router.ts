
import { useRoute, useRouter } from 'vue-router';

/**
 * 路由跳转函数
 * @pathDefault 默认跳转路径
 * @pathError 路由出错跳转路径
 * */
export function useNBRouter() {
    const pathDefault = '/blog-post'
    const pathError = '/page404'
    const route = useRoute();
    const router = useRouter();
    const routerPush = (path: string) => {
        router.push(path);
    }
    const navigateToDefault = () => {
        routerPush(pathDefault)
    }
    const navigateToError = () => {
        routerPush(pathError)
    }
    return {
        pathDefault,
        pathError,
        route,
        routerPush,
        navigateToDefault,
        navigateToError
    }
}