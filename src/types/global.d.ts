export {}; // 确保文件被视为模块
declare global {
  interface Window {
    utterance: any; // 替换为你的具体类型
    // 或者更具体的类型定义：
    // utterance: {
    //   onEvent: (callback: () => void) => void;
    //   trigger: () => void;
    // };
  }
}