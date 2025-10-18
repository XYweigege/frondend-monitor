/**
 * WebEyeSDK 主入口文件
 * 📊 前端监控SDK，提供性能监控、错误捕获和行为分析功能
 * 🚀 支持Vue、React等主流框架
 */

// 导入性能监控模块 - 监控页面加载和资源性能
import performance from './performance/index';

// 导入错误监控模块 - 捕获JavaScript运行时错误
import error from './error/index';

// 导入行为监控模块 - 记录用户交互行为
import behavior from './behavior/index';

// 导入配置管理函数 - 设置SDK全局配置
import { setConfig } from './config';
import config from './config';

// 导入批量上报工具 - 用于数据的批量异步上报
import { lazyReportBatch } from './report';

/**
 * SDK 全局命名空间
 * 🌐 在window对象上挂载SDK实例和版本信息
 */
window.__webEyeSDK__ = {
    version: '0.0.1', // SDK当前版本号
};

/**
 * Vue插件安装函数
 * 🎯 为Vue项目提供错误捕获功能
 * @param {Object} Vue - Vue构造函数
 * @param {Object} options - SDK配置选项
 */
export function install(Vue, options) {
    // 避免重复安装
    if (__webEyeSDK__.vue) return;
    
    // 标记Vue环境已初始化
    __webEyeSDK__.vue = true;
    
    // 设置SDK配置
    setConfig(options);
    
    // 保存原始的错误处理器
    const handler = Vue.config.errorHandler;
    
    // 重写Vue错误处理器，捕获Vue组件内的错误
    Vue.config.errorHandler = function (err, vm, info) {
        // 构建错误上报数据
        const reportData = {
            info, // Vue错误信息（组件生命周期等）
            error: err.stack, // 错误堆栈
            subType: 'vue', // 错误子类型
            type: 'error', // 错误类型
            startTime: window.performance.now(), // 错误发生时间戳
            pageURL: window.location.href, // 发生错误的页面URL
        };
        
        console.log('vue error', reportData);
        
        // 批量上报错误数据
        lazyReportBatch(reportData);
        
        // 如果用户已有自定义错误处理器，调用它
        if (handler) {
            handler.call(this, err, vm, info);
        }
    };
}

/**
 * React错误边界处理函数
 * ⚛️ 用于React项目的错误捕获
 * @param {Error} err - JavaScript错误对象
 * @param {Object} info - React错误边界提供的组件堆栈信息
 */
export function errorBoundary(err, info) {
    // 避免重复初始化
    if (__webEyeSDK__.react) return;
    
    // 标记React环境已初始化
    __webEyeSDK__.react = true;
    
    // 构建错误上报数据
    const reportData = {
        error: err?.stack, // 错误堆栈（可选链防止null/undefined）
        info, // React组件错误信息
        subType: 'react', // 错误子类型
        type: 'error', // 错误类型
        startTime: window.performance.now(), // 错误发生时间戳
        pageURL: window.location.href, // 发生错误的页面URL
    };
    
    // 批量上报错误数据
    lazyReportBatch(reportData);
}

/**
 * SDK初始化函数
 * 🎬 初始化监控SDK，根据配置加载各模块功能
 * @param {Object} options - SDK配置选项，可包含以下模块开关：
 * @param {boolean} options.usePerformance - 是否启用性能监控模块
 * @param {boolean} options.useError - 是否启用错误监控模块
 * @param {boolean} options.useBehavior - 是否启用行为监控模块
 */
export function init(options) {
    // 设置SDK配置
    setConfig(options);
    
    // 根据配置启用性能监控模块
    if (config.usePerformance) {
        console.log('🎯 初始化性能监控模块');
        performance();
    }
    
    // 根据配置启用错误监控模块
    if (config.useError) {
        console.log('🎯 初始化错误监控模块');
        error();
    }
    
    // 根据配置启用行为监控模块
    if (config.useBehavior) {
        console.log('🎯 初始化行为监控模块');
        behavior();
    }
}

/**
 * SDK默认导出对象
 * 📦 提供所有公开的API方法
 */
export default {
    install, // Vue插件安装方法
    errorBoundary, // React错误边界处理
    performance, // 性能监控模块
    error, // 错误监控模块
    behavior, // 行为监控模块
    init, // 初始化方法
}

/**
 * SDK使用示例
 * 💡 以下是初始化SDK的示例代码，展示如何配置模块开关
 */
// webEyeSDK.init({
//     appId: '10000', // 应用标识
//     batchSize: 50,  // 批量上报阈值
//     
//     // 模块开关配置
//     usePerformance: true, // 启用性能监控
//     useError: true,       // 启用错误监控
//     useBehavior: true     // 启用行为监控
// })