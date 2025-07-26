
import { useRoute, useRouter } from 'vue-router';

export function useNBRouter() {
    const pathDefault = '/HomePage'
    const pathError = '/Page404'
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