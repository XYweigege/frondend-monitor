// 导入批量上报工具
import { lazyReportBatch } from '../report';

/**
 * 监控最大内容绘制(LCP)性能指标
 * 📊 LCP是Core Web Vitals核心指标之一，衡量页面主要内容加载完成的时间
 * 良好的LCP值应小于2.5秒
 */
export default function observerLCP() {
    /**
     * 性能条目处理函数
     * 📋 处理LCP性能条目，提取关键指标并上报
     * @param {PerformanceObserverEntryList} list - 性能条目列表
     */
    const entryHandler = (list) => {
        // 一旦获取到LCP条目，就断开观察者，避免重复上报
        if (observer) {
            observer.disconnect();
        }
        
        // 遍历性能条目列表
        for (const entry of list.getEntries()) {
            // 将性能条目转换为JSON格式，方便数据处理
            const json = entry.toJSON();
            // 调试信息，可在开发环境查看详细指标
            console.log(json);
            
            // 构建上报数据对象
            const reportData = {
                ...json,                           // 包含完整的LCP性能数据
                type: 'performance',               // 数据类型：性能监控
                subType: entry.name,               // 子类型：性能条目标识（largest-contentful-paint）
                pageUrl: window.location.href,     // 当前页面URL
            };
            
            // 通过批量上报函数上报LCP性能数据
            lazyReportBatch(reportData);
        }
    };
    
    // 创建性能观察者实例，用于监听LCP指标
    const observer = new PerformanceObserver(entryHandler);
    
    // 配置观察者监听largest-contentful-paint类型的性能条目
    // buffered: true - 确保能观察到页面已发生的绘制事件
    observer.observe({type: 'largest-contentful-paint', buffered: true});
}