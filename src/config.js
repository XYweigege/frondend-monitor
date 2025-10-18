/**
 * SDK 全局配置对象
 * 🎛️ 包含SDK运行所需的各项配置参数
 */
const config = {
    url: '', // 上报服务器地址
    projectName: 'eyesdk', // 项目名称
    appId: '123456', // 应用标识
    userId: '123456', // 用户ID
    isImageUpload: false, // 是否使用图片上传方式
    batchSize: 5, // 批量上报阈值
    // 模块开关配置
    usePerformance: false, // 是否启用性能监控模块
    useError: false, // 是否启用错误监控模块
    useBehavior: false, // 是否启用行为监控模块
};
export function setConfig(options) {
    for (const key in config) {
        if (options[key]) {
            config[key] = options[key];
        }
    }
}
export default config;