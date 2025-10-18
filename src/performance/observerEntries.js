
// 导入批量上报工具
import { lazyReportBatch } from '../report';

/**
 * 资源加载性能监控初始化函数
 * 📊 监控页面各类资源（脚本、样式、图片等）的加载性能指标
 * 🔍 确保在页面完全加载后开始监控，避免数据不准确
 */
export default function observerEntries() {
    // 检查页面是否已经完全加载
    if (document.readyState === 'complete') {
        // 如果已加载完成，直接开始监控
        observerEvent();
    } else {
        // 如果页面未加载完成，添加load事件监听
        const onLoad = () => {
            // 页面加载完成后开始监控
            observerEvent();
            // 移除事件监听器，避免重复执行
            window.removeEventListener('load', onLoad, true);
        };
        // 使用捕获模式监听load事件
        window.addEventListener('load', onLoad, true);
    }
}

/**
 * 资源加载性能观察函数
 * 📋 创建PerformanceObserver监控资源加载条目，提取详细性能指标
 */
export function observerEvent() {
    /**
     * 性能条目处理函数
     * 📊 处理资源加载性能数据，计算各项关键指标并上报
     * @param {PerformanceObserverEntryList} list - 性能条目列表
     */
    const entryHandler = (list) => {
        // 获取所有性能条目
        const data = list.getEntries();
        
        // 遍历每个性能条目
        for (let entry of data) {
            // 一旦处理数据，断开观察者以避免重复处理
            if (observer) {
                observer.disconnect();
            }
            
            // 构建详细的性能上报数据
            const reportData = {
                name: entry.name, // 资源URL或名称
                type: 'performance', // 数据类型：性能监控
                subType: entry.entryType, // 条目类型（resource）
                sourceType: entry.initiatorType, // 资源类型（如script、img、link等）
                duration: entry.duration, // 资源总加载时间（毫秒）
                dns: entry.domainLookupEnd - entry.domainLookupStart, // DNS解析耗时
                tcp: entry.connectEnd - entry.connectStart, // TCP连接耗时
                redirect: entry.redirectEnd - entry.redirectStart, // 重定向耗时
                ttfb: entry.responseStart, // 首字节时间（Time To First Byte）
                protocol: entry.nextHopProtocol, // 使用的网络协议
                responseBodySize: entry.encodedBodySize, // 编码后的响应体大小
                responseHeaderSize: entry.transferSize - entry.encodedBodySize, // 响应头大小
                transferSize: entry.transferSize, // 总传输大小（含头部）
                resourceSize: entry.decodedBodySize, // 解码后的资源大小
                startTime: performance.now(), // 记录上报时间
            };
            
            // 通过批量上报函数上报资源加载性能数据
            lazyReportBatch(reportData);
        }
    };

    // 创建性能观察者实例
    let observer = new PerformanceObserver(entryHandler);
    
    // 配置观察者监听resource类型的性能条目
    // buffered: true - 确保能获取到页面已加载的资源数据
    observer.observe({ type: ['resource'], buffered: true });
}