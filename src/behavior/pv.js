/**
 * 页面访问量(PV)监控模块
 * 负责捕获和上报页面访问事件
 * 记录页面URL、来源URL和访问时间等信息
 */

import { lazyReportBatch } from '../report';
import { generateUniqueId } from '../utils';

/**
 * 页面访问量(PV)监控初始化函数
 * 生成并上报页面访问数据
 */
export default function pv() {
    // 构建页面访问上报数据
    const reportData = {
        type: 'behavior',              // 事件类型标识
        subType: 'pv',                 // 子类型：页面访问量
        startTime: performance.now(),  // 页面访问时间
        pageUrl: window.location.href, // 当前页面URL
        referror: document.referrer,   // 来源页面URL（referrer）
        uuid: generateUniqueId(),      // 唯一标识符
    };
    
    // 上报页面访问数据
    lazyReportBatch(reportData);
}