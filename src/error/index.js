
import { lazyReportBatch } from '../report';

/**
 * 错误监控模块
 * 负责捕获和上报三种类型的错误：
 * 1. 资源加载错误（js、css、img等）
 * 2. JavaScript运行时错误
 * 3. Promise未处理的拒绝错误（包括async/await错误）
 */
export default function error() {
    /**
     * 捕获资源加载失败的错误
     * 监控目标：JavaScript、CSS、图片等外部资源加载失败
     * 使用捕获阶段（useCapture=true）监听error事件
     */
    window.addEventListener(
        'error',
        function (e) {
            // 获取触发错误的目标元素
            const target = e.target;
            
            // 判断是否为资源加载错误（通过检查元素是否有src或href属性）
            if (target.src || target.href) {
                // 获取资源URL
                const url = target.src || target.href;
                
                // 构建错误报告数据
                const reportData = {
                    type: 'error',           // 错误类型标识
                    subType: 'resource',     // 子类型：资源加载错误
                    url,                     // 失败的资源URL
                    html: target.outerHTML,  // 错误元素的HTML内容
                    pageUrl: window.location.href, // 当前页面URL
                    pahts: e.path,           // 事件传播路径
                };
                
                // 使用批量懒报告方式上报错误数据
                lazyReportBatch(reportData);
            }
        },
        true // 第三个参数为true，表示在捕获阶段监听事件
    );

    /**
     * 捕获JavaScript运行时错误
     * 包括语法错误、引用错误、类型错误等
     */
    window.onerror = function (msg, url, lineNo, columnNo, error) {
        // 构建错误报告数据
        const reportData = {
            type: 'error',               // 错误类型标识
            subType: 'js',               // 子类型：JavaScript错误
            msg,                         // 错误信息
            url,                         // 出错的脚本URL
            lineNo,                      // 错误行号
            columnNo,                    // 错误列号
            stack: error.stack,          // 错误堆栈信息
            pageUrl: window.location.href, // 当前页面URL
            startTime: performance.now(), // 错误发生时间
        };
        
        // 使用批量懒报告方式上报错误数据
        lazyReportBatch(reportData);
    };

    /**
     * 捕获Promise未处理的拒绝错误
     * 包括Promise.reject()和async/await中未捕获的错误
     */
    window.addEventListener(
        'unhandledrejection',
        function (e) {
            // 构建错误报告数据
            const reportData = {
                type: 'error',               // 错误类型标识
                subType: 'promise',          // 子类型：Promise错误
                reason: e.reason?.stack,     // Promise拒绝原因的堆栈信息
                pageUrl: window.location.href, // 当前页面URL
                startTime: e.timeStamp,      // 错误发生时间戳
            };
            
            // 使用批量懒报告方式上报错误数据
            lazyReportBatch(reportData);
        },
        true // 第三个参数为true，表示在捕获阶段监听事件
    );
}