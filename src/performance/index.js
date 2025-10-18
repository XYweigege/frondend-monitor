// 导入各类性能监控子模块
// 监控fetch请求性能
import fetch from "./fetch";
// 监控性能条目
import observerEntries from "./observerEntries";
// 监控最大内容绘制(LCP)
import observerLCP from "./observeLCP";
// 监控首次内容绘制(FCP)
import observerFCP from "./observerFCP";
// 监控页面加载性能
import observerLoad from "./observerLoad";
// 监控绘制性能
import observerPaint from "./observerPaint";
// 监控XHR请求性能
import xhr from "./xhr";  

/**
 * 性能监控主函数
 * 🔍 集成所有性能监控子模块，统一初始化
 * 包含：网络请求(fetch/xhr)、核心网页指标(LCP/FCP)、页面加载和绘制性能等监控
 */
export default function performance() {
    // 初始化fetch请求监控
    fetch();
    // 初始化性能条目监控
    observerEntries();
    // 初始化最大内容绘制监控
    observerLCP();
    // 初始化首次内容绘制监控
    observerFCP();
    // 初始化页面加载监控
    observerLoad();
    // 初始化绘制性能监控
    observerPaint();
    // 初始化XHR请求监控
    xhr();
}