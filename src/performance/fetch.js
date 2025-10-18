// 导入批量上报工具
import { lazyReportBatch } from '../report';

/**
 * 保存原始fetch方法引用
 * 🔄 用于后续恢复或调用原始功能
 */
const originalFetch = window.fetch;

/**
 * 重写fetch方法以监控请求性能
 * 📊 捕获fetch请求的开始时间、结束时间、耗时、状态码等指标
 */
function overwriteFetch() {
    // 覆盖原生fetch方法
    window.fetch = function newFetch(url, config = {}) {
        // 记录请求开始时间戳
        const startTime = Date.now();
        
        // 初始化上报数据对象
        const reportData = {
            type: 'performance',        // 数据类型：性能监控
            subType: 'fetch',           // 子类型：fetch请求
            url,                        // 请求URL
            startTime,                  // 请求开始时间
            method: config.method || 'GET' // HTTP方法，默认为GET
        };
        
        // 调用原始fetch方法并添加性能监控逻辑
        return originalFetch(url, config).then((res) => {
            // 记录请求结束时间
            const endTime = Date.now();
            reportData.endTime = endTime;
            // 计算请求耗时（毫秒）
            reportData.duration = endTime - startTime;
            
            // 克隆响应对象以避免影响原始响应流
            const data = res.clone();
            reportData.status = data.status;     // HTTP状态码
            reportData.success = data.ok;        // 请求是否成功（状态码200-299）
            
            // 通过批量上报函数上报性能数据
            lazyReportBatch(reportData);
            
            // 返回原始响应，不影响正常业务流程
            return res;
        }).catch((err) => {
            // 请求失败处理
            const endTime = Date.now();
            reportData.endTime = endTime;
            reportData.duration = endTime - startTime;
            reportData.status = 0;        // 失败时状态码为0
            reportData.success = false;   // 请求失败标识
            
            // 上报失败情况下的性能数据
            lazyReportBatch(reportData);
        });
    };
}

/**
 * fetch请求性能监控初始化函数
 * 🚀 启动fetch请求性能监控，无需额外配置
 */
export default function fetch() {
    // 调用内部方法重写fetch实现监控
    overwriteFetch();
}