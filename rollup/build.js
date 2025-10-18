/**
 * Rollup 构建配置文件
 * 📦 配置不同格式的SDK输出（IIFE、ESM、CJS）
 * 🔧 包含Babel转译和JSON处理功能
 */

// 导入Node.js路径模块，用于处理文件路径
const path = require("path");

// 导入Rollup JSON插件，用于在JS中导入JSON文件
const json = require("@rollup/plugin-json");

// 导入Rollup Babel插件，用于ES6+代码转译
const { babel } = require("@rollup/plugin-babel");

/**
 * 文件路径解析函数
 * 🔍 根据当前文件目录解析相对路径
 * @param {string} filePath - 相对路径
 * @returns {string} 解析后的绝对路径
 */
const resolveFile = function (filePath) {
    return path.join(__dirname, filePath);
};

/**
 * Rollup插件配置数组
 * 🧩 包含构建过程中使用的各种插件
 */
const plugins = [
    // JSON插件配置
    json({
        compact: true, // 压缩JSON输出，减小文件体积
    }),
    
    // Babel插件配置
    babel({
        extensions: [".js", ".ts"], // 处理.js和.ts文件
        babelHelpers: "bundled", // 将babel helpers内联到打包文件中
        presets: [
            [
                "@babel/env", // 使用@babel/env预设进行环境适配
                {
                    targets: {
                        // 浏览器兼容性配置：
                        // 包含市场份额大于1%的浏览器
                        // 最近2个版本的浏览器
                        // 排除IE8及以下版本
                        browsers: ["> 1%", "last 2 versions", "not ie <= 8"],
                    },
                },
            ],
        ],
    }),
];

/**
 * 导出Rollup配置数组
 * 🚀 定义多个构建目标，生成不同格式的输出文件
 */
module.exports = [
    // 1. IIFE格式构建配置 - 适用于浏览器直接引入
    {
        plugins, // 使用上面定义的插件配置
        input: resolveFile("../src/webEyeSDK.js"), // 入口文件路径
        output: {
            file: resolveFile("../dist/monitor.js"), // 输出文件路径
            format: "iife", // 输出格式：立即调用函数表达式
            name: "monitor", // 全局变量名称，浏览器中可通过window.monitor访问
            sourcemap: true, // 生成源码映射文件，便于调试
        },
    },
    
    // 2. ESM格式构建配置 - 适用于现代浏览器和ES模块系统
    {
        plugins,
        input: resolveFile("../src/webEyeSDK.js"),
        output: {
            file: resolveFile("../dist/monitor.esm.js"),
            format: "esm", // 输出格式：ES模块
            name: "monitor",
            sourcemap: true,
        },
    },
    
    // 3. CommonJS格式构建配置 - 适用于Node.js环境
    {
        plugins,
        input: resolveFile("../src/webEyeSDK.js"),
        output: {
            file: resolveFile("../dist/monitor.cjs.js"),
            format: "cjs", // 输出格式：CommonJS模块
            name: "monitor",
            sourcemap: true,
        },
    },
];
