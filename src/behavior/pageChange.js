/**
 * 页面变化监控模块
 * 负责捕获和上报单页应用中的页面导航变化
 * 支持两种常见的SPA导航方式：hashchange和popstate
 */

import { lazyReportBatch } from '../report';
import { generateUniqueId } from '../utils';

/**
 * 页面变化监控初始化函数
 * 为hashchange和popstate事件添加监听器，监控页面导航变化
 */
export default function pageChange() {
    /**
     * 监控Hash变化（#后面的URL部分变化）
     * 常用于基于Hash Router的单页应用
     */
    let oldUrl = ''; // 记录前一个URL，用于追踪页面来源
    
    window.addEventListener(
        'hashchange',
        function (event) {
            // 控制台日志，用于调试（生产环境可移除）
            console.error('hashchange', event);
            
            // 获取变化后的新URL
            const newUrl = event.newURL;
            
            // 构建页面变化上报数据
            const reportData = {
                form: oldUrl,              // 来源页面URL
                to: newUrl,                // 目标页面URL
                type: 'behavior',          // 事件类型标识
                subType: 'hashchange',     // 子类型：Hash变化
                startTime: performance.now(), // 变化发生时间
                uuid: generateUniqueId(),  // 唯一标识符
            };
            
            // 上报页面变化数据
            lazyReportBatch(reportData);
            
            // 更新旧URL，用于下一次变化的追踪
            oldUrl = newUrl;
        },
        true // 使用捕获阶段监听
    );

    /**
     * 监控popstate事件（浏览器前进后退、history.pushState/replaceState）
     * 常用于基于HTML5 History API的单页应用
     */
    let from = ''; // 记录前一个URL，用于追踪页面来源
    
    window.addEventListener(
        'popstate',
        function (event) {
            // 控制台日志，用于调试（生产环境可移除）
            console.error('popstate', event);
            
            // 获取当前页面URL
            const to = window.location.href;
            
            // 构建页面变化上报数据
            const reportData = {
                form: from,                // 来源页面URL
                to: to,                    // 目标页面URL
                type: 'behavior',          // 事件类型标识
                subType: 'popstate',       // 子类型：popstate事件
                startTime: performance.now(), // 变化发生时间
                uuid: generateUniqueId(),  // 唯一标识符
            };
            
            // 上报页面变化数据
            lazyReportBatch(reportData);
            
            // 更新来源URL，用于下一次变化的追踪
            from = to;
        },
        true // 使用捕获阶段监听
    );
}