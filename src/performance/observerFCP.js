// 导入批量上报工具
import { lazyReportBatch } from '../report';

/**
 * 监控首次内容绘制(FCP)性能指标
 * 📊 FCP是Core Web Vitals核心指标之一，衡量页面首次显示内容的时间
 * 良好的FCP值应小于1.8秒
 */
export default function observerFCP() {
    /**
     * 性能条目处理函数
     * 📋 处理绘制性能条目，筛选FCP指标并上报
     * @param {PerformanceObserverEntryList} list - 性能条目列表
     */
    const entryHandler = (list) => {
        // 遍历所有绘制性能条目
        for (const entry of list.getEntries()) {
            // 筛选出首次内容绘制(FCP)条目
            if (entry.name === 'first-contentful-paint') {
                // 一旦获取到FCP条目，断开观察者避免重复上报
                observer.disconnect();
                
                // 将性能条目转换为JSON格式，方便数据处理
                const json = entry.toJSON();
                // 调试信息，可在开发环境查看详细指标
                console.log(json);
                
                // 构建上报数据对象
                const reportData = {
                    ...json,                           // 包含完整的FCP性能数据
                    type: 'performance',               // 数据类型：性能监控
                    subType: entry.name,               // 子类型：性能条目标识（first-contentful-paint）
                    pageUrl: window.location.href,     // 当前页面URL
                };
                
                // 通过批量上报函数上报FCP性能数据
                lazyReportBatch(reportData);
            }
        }
    };
    
    // 创建性能观察者实例，用于监听绘制性能指标
    const observer = new PerformanceObserver(entryHandler);
    
    // 配置观察者监听paint类型的性能条目
    // buffered: true - 确保能观察到页面已发生的绘制事件
    observer.observe({type: 'paint', buffered: true});
}