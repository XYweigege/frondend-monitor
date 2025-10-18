/**
 * 行为监控模块的入口文件
 * 集成并初始化所有用户行为监控功能
 * 包括：点击事件、页面变化、页面访问(PV)监控
 */

// 导入各个行为监控模块
import onClick from './onClick'; // 点击事件监控
import pageChange from './pageChange'; // 页面变化监控（hashchange和popstate）
import pv from './pv'; // 页面访问量(PV)监控

/**
 * 行为监控主函数
 * 初始化所有行为监控功能
 */
export default function behavior() {
    // 初始化点击事件监控
    onClick();
    
    // 初始化页面变化监控
    pageChange();
    
    // 初始化页面访问量监控
    pv();
}
