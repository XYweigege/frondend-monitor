// 导入批量上报工具
import { lazyReportBatch } from '../report';

/**
 * 监控页面加载性能
 * 📊 通过pageShow事件监听页面加载完成后的性能数据
 * 🔄 支持处理页面刷新和浏览器前进/后退场景
 */
export default function observerLoad() {
    // 监听pageShow事件，适用于页面首次加载、刷新和前进/后退导航
    window.addEventListener('pageShow', function(event) {
        // 使用requestAnimationFrame确保在浏览器渲染周期中执行
        requestAnimationFrame(() => {
            // 遍历需要监控的事件类型数组（当前仅包含'load'）
            ['load'].forEach((type) => {
                // 构建上报数据对象
                const reportData = {
                    type: 'performance',          // 数据类型：性能监控
                    subType: type,                // 子类型：load事件
                    pageUrl: window.location.href, // 当前页面URL
                    // 计算页面从开始加载到当前的时间差
                    startTime: performance.now() - event.timeStamp
                };
                
                // 通过批量上报函数上报页面加载性能数据
                lazyReportBatch(reportData);
            });
        });
    });
}
