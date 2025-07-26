const webSpeech = () => {
    // 检查浏览器是否支持Web Speech API
    if (!('speechSynthesis' in window)) {
        console.log('Speech synthesis not supported in this browser');
    }
    if (window.utterance as any) return window.utterance
    const utterance: any = new SpeechSynthesisUtterance()
    // 设置语音属性（可选）
    // utterance.lang = 'en-US'; // 设置语言为英语（美国）
    utterance.rate = 1; // 设置语速，范围从0.1到10
    utterance.pitch = 1; // 设置音高，范围从0到2
    utterance.volume = 1; // 设置音量，范围从0到1
    utterance.clear = () => {
        window.speechSynthesis.cancel();
        utterance.text = ''
    }
    utterance.speak = (text: string) => {
        utterance.clear()
        utterance.text = text
        // 开始语音播报
        window.speechSynthesis.speak(utterance);
    }

    // 监听语音播报的结束事件（可选）
    utterance.onend = () => {
        utterance.clear()
    };

    window.utterance = utterance
    return utterance
}
export default webSpeech()