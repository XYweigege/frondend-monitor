/**
 * 点击事件监控模块
 * 负责捕获和上报用户的鼠标点击和触摸事件
 * 支持PC端(mousedown)和移动端(touchstart)事件
 */

import { lazyReportBatch } from '../report';

/**
 * 点击事件监控初始化函数
 * 为window对象添加鼠标和触摸事件监听器
 */
export default function onClick() {
    /**
     * 支持的事件类型数组
     * mousedown: 鼠标按下事件（PC端）
     * touchstart: 触摸开始事件（移动端）
     */
    ['mousedown', 'touchstart'].forEach((eventType) => {
        // 为每种事件类型添加全局监听器
        window.addEventListener(eventType, (e) => {
            // 获取触发事件的目标元素
            const target = e.target;
            
            // 控制台日志，用于调试（实际生产环境可移除）
            console.log('click', target);
            
            // 只有当目标元素具有tagName属性时（即是DOM元素）才进行上报
            if (target.tagName) {
                // 构建点击事件上报数据
                const reportData = {
                    // scrollTop: document.documentElement.scrollTop, // 注释掉的滚动位置信息
                    type: 'behavior',              // 事件类型标识
                    subType: 'click',              // 子类型：点击事件
                    target: target.tagName,        // 目标元素的标签名（大写）
                    startTime: e.timeStamp,        // 事件发生的时间戳
                    innerHtml: target.innerHTML,   // 目标元素的内部HTML
                    outerHtml: target.outerHTML,   // 目标元素的外部HTML
                    with: target.offsetWidth,      // 目标元素的宽度
                    height: target.offsetHeight,   // 目标元素的高度
                    eventType,                     // 原始事件类型（mousedown或touchstart）
                    path: e.path,                  // 事件传播路径
                };
                
                // 使用批量懒报告方式上报点击事件数据
                lazyReportBatch(reportData);
            }
        });
    });
}