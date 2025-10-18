


# monitor-sdk-fe

一个用于浏览器环境的轻量级监控SDK，用于收集前端性能指标、错误信息和用户行为数据。

## 功能概述

### 🔍 错误监控
- JavaScript 运行时错误捕获
- 资源加载错误监控
- Promise 异常监控
- Vue.js 和 React 框架错误捕获
- 自定义错误上报

### 🚀 性能监控
- 核心性能指标采集（FCP、LCP、FP等）
- 页面加载性能分析
- API 请求性能监控（XHR、Fetch）
- 资源加载性能统计

### 📊 用户行为监控
- 页面访问量统计（PV）
- 页面切换追踪（SPA应用）
- 点击事件分析
- 用户行为路径记录

## 快速开始

### 安装

```bash
# 使用 npm
npm install monitor-sdk-fe --save

# 使用 yarn
yarn add monitor-sdk-fe

# 使用 pnpm
pnpm add monitor-sdk-fe
```

### 基本使用

```javascript
// ES Module 引入
import webEyeSDK from 'monitor-sdk-fe';

// 初始化SDK
webEyeSDK.init({
  appId: 'your-application-id',
  url: 'https://your-report-server.com/api',
  usePerformance: true, // 启用性能监控
  useError: true,       // 启用错误监控
  useBehavior: true,    // 启用行为监控
  batchSize: 5          // 批量上报阈值
});
```

### CommonJS 引入

```javascript
// CommonJS 引入
const webEyeSDK = require('monitor-sdk-fe');

// 初始化SDK
webEyeSDK.init({
  appId: 'your-application-id',
  url: 'https://your-report-server.com/api'
});
```

### 浏览器直接使用

```html
<script src="https://unpkg.com/monitor-sdk-fe/dist/monitor.js"></script>
<script>
  // 初始化SDK
  webEyeSDK.init({
    appId: 'your-application-id',
    url: 'https://your-report-server.com/api',
    usePerformance: true,
    useError: true,
    useBehavior: true
  });
</script>
```

## 配置选项

| 选项 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| appId | String | '123456' | 应用ID |
| url | String | '' | 数据上报地址 |
| projectName | String | 'eyesdk' | 项目名称 |
| userId | String | '123456' | 用户ID |
| isImageUpload | Boolean | false | 是否使用图片上传方式 |
| batchSize | Number | 5 | 批量上报阈值 |
| usePerformance | Boolean | false | 是否启用性能监控模块 |
| useError | Boolean | false | 是否启用错误监控模块 |
| useBehavior | Boolean | false | 是否启用行为监控模块 |

## API 参考

### 初始化

```javascript
// 基本初始化
webEyeSDK.init({
  appId: 'your-application-id',
  url: 'https://your-report-server.com/api'
});

// 选择性启用模块
webEyeSDK.init({
  appId: 'your-application-id',
  usePerformance: true,  // 只启用性能监控
  useError: false,
  useBehavior: false
});
```

### 框架集成

#### Vue.js 集成

```javascript
import Vue from 'vue';
import webEyeSDK from 'monitor-sdk-fe';

// 作为Vue插件使用
Vue.use(webEyeSDK, {
  appId: 'your-application-id',
  url: 'https://your-report-server.com/api'
});
```

#### React 集成

```javascript
import React from 'react';
import webEyeSDK from 'monitor-sdk-fe';

// 在ErrorBoundary组件中使用
class ErrorBoundary extends React.Component {
  componentDidCatch(error, errorInfo) {
    webEyeSDK.errorBoundary(error, errorInfo);
  }
  
  render() {
    return this.props.children;
  }
}
```

### 手动启用/禁用模块

```javascript
// 手动启用性能监控
webEyeSDK.performance();

// 手动启用错误监控
webEyeSDK.error();

// 手动启用行为监控
webEyeSDK.behavior();
```

## 开发指南

### 项目结构

```
src/
├── behavior/         # 行为监控模块
│   ├── index.js      # 行为监控入口
│   ├── onClick.js    # 点击事件监控
│   ├── pageChange.js # 页面切换监控
│   └── pv.js         # 页面访问量监控
├── error/            # 错误监控模块
│   └── index.js      # 错误监控入口
├── performance/      # 性能监控模块
│   ├── index.js      # 性能监控入口
│   ├── fetch.js      # Fetch请求监控
│   ├── xhr.js        # XHR请求监控
│   ├── observeLCP.js # 最大内容绘制监控
│   ├── observerFCP.js # 首次内容绘制监控
│   ├── observerPaint.js # 首次绘制监控
│   ├── observerEntries.js # 资源加载监控
│   └── observerLoad.js # 页面加载监控
├── cache.js          # 数据缓存
├── config.js         # 配置管理
├── report.js         # 数据上报
├── utils.js          # 工具函数
└── webEyeSDK.js      # SDK主入口

### 本地开发

```bash
# 安装依赖
pnpm install

# 启动本地服务器
node server.js

# 构建项目
npm run build
```

### 示例页面

项目包含多个演示页面，展示SDK的不同功能：

- 基础示例: `http://localhost:3000/demo/index.html`
- 错误监控: `http://localhost:3000/demo/error/index.html`
- 性能监控: `http://localhost:3000/demo/performance/index.html`
- 行为监控: `http://localhost:3000/demo/behavior/index.html`

## 浏览器兼容性

- Chrome (最近2个版本)
- Firefox (最近2个版本)
- Safari (最近2个版本)
- Edge (最近2个版本)

## 许可证

MIT