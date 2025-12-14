/**
 * 打开新窗口
 * */
export function openWindow(url: string) {
    if (!url) return;
    window.open(url);
}