import { defineStore } from 'pinia'

export const useThemeStore = defineStore('theme', {
    state: () => {
        return { isDark: false }
    },
    // 也可以定义为
    // state: () => ({ count: 0 })
    actions: {
        change() {
            this.isDark = !this.isDark
        },
    },
})