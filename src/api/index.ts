import axios from "axios";

const useRequest = (config: any) => {
    // 在发送请求之前做些什么
    return config;
}

const useResponse = (response: any) => {
    // 对响应数据做点什么
    return response.data;
}

const useError = (error: any) => {
    // 对请求错误做些什么
    return Promise.reject(error);
}
const baseURL = (import.meta as any).env.VITE_API_BASE_URL
console.log('baseURL:🚀', baseURL)
const service = axios.create({ baseURL })
service.interceptors.request.use(useRequest, useError)
service.interceptors.response.use(useResponse, useError)

export default service