// 导入批量上报工具
import { lazyReportBatch } from '../report';

/**
 * 保存XMLHttpRequest原型对象
 * 📝 用于后续方法重写和原始方法调用
 */
export const originalProto = XMLHttpRequest.prototype;

/**
 * 保存原始的send方法
 * 🔄 用于后续恢复或调用原始功能
 */
export const originalSend = originalProto.send;

/**
 * 保存原始的open方法
 * 🔄 用于后续恢复或调用原始功能
 */
export const originalOpen = originalProto.open;

/**
 * 重写XMLHttpRequest的open和send方法
 * 📊 捕获XHR请求的URL、方法、时间戳、状态码等性能指标
 */
function overwriteOpenAndSend() {
    // 重写open方法以捕获请求URL和HTTP方法
    originalProto.open = function newOpen(...args) {
        // 保存请求URL（第二个参数）
        this.url = args[1];
        // 保存HTTP方法（第一个参数）
        this.method = args[0];
        // 调用原始open方法，确保正常功能
        originalOpen.apply(this, args);
    }
    
    // 重写send方法以添加性能监控逻辑
    originalProto.send = function newSend(...args) {
        // 记录请求开始时间
        this.startTime = Date.now();
        
        // 定义请求结束回调函数
        const onLoaded = () => {
            // 记录请求结束时间
            this.endTime = Date.now();
            // 计算请求耗时（毫秒）
            this.duration = this.endTime - this.startTime;
            
            // 解构请求相关属性
            const { url, method, startTime, endTime, duration, status } = this;
            
            // 构建上报数据对象
            const reportData = {
                status,                          // HTTP状态码
                duration,                        // 请求耗时（毫秒）
                startTime,                       // 请求开始时间戳
                endTime,                         // 请求结束时间戳
                url,                             // 请求URL
                method: method?.toUpperCase(),   // HTTP方法（转为大写）
                type: 'performance',             // 数据类型：性能监控
                success: status >= 200 && status < 300, // 请求是否成功
                subType: 'xhr'                   // 子类型：XHR请求
            };
            
            // 通过批量上报函数上报性能数据
            lazyReportBatch(reportData);
            
            // 移除事件监听器，避免内存泄漏
            this.removeEventListener('loadend', onLoaded, true);
        };
        
        // 添加请求结束事件监听器（使用捕获模式）
        this.addEventListener('loadend', onLoaded, true);
        
        // 调用原始send方法，确保正常发送请求
        originalSend.apply(this, args);
    };
}

/**
 * XHR请求性能监控初始化函数
 * 🚀 启动XHR请求性能监控，无需额外配置
 */
export default function xhr() {
    // 调用内部方法重写XHR相关方法实现监控
    overwriteOpenAndSend();
}