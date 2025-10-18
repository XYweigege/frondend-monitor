


# monitor-sdk-fe

一个用于浏览器和Node环境的监控SDK，用于收集性能指标、错误信息和用户行为数据。

## 功能概述

### 🔍 错误监控
- JavaScript 运行时错误捕获
- 资源加载错误监控
- Promise 异常监控
- 自定义错误上报

### 🚀 性能监控
- 核心性能指标采集（FCP、LCP等）
- 页面加载性能分析
- API 请求性能监控（XHR、Fetch）
- 资源加载性能统计

### 📊 用户行为监控
- 页面访问量统计
- 页面切换追踪
- 点击事件分析
- 自定义事件收集

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
import MonitorSDK from 'monitor-sdk-fe';

// 初始化SDK
const sdk = new MonitorSDK({
  appId: 'your-application-id',
  serverUrl: 'https://your-report-server.com/api',
  enableError: true,
  enablePerformance: true,
  enableBehavior: true,
  sampleRate: 1.0
});

// 启动监控
sdk.init();
```

### CommonJS 引入

```javascript
// CommonJS 引入
const MonitorSDK = require('monitor-sdk-fe');

// 初始化并启动SDK
const sdk = new MonitorSDK({
  appId: 'your-application-id',
  serverUrl: 'https://your-report-server.com/api'
});
sdk.init();
```

### 浏览器直接使用

```html
<script src="https://unpkg.com/monitor-sdk-fe/dist/monitor.js"></script>
<script>
  // 初始化并启动SDK
  const sdk = new window.MonitorSDK({
    appId: 'your-application-id',
    serverUrl: 'https://your-report-server.com/api'
  });
  sdk.init();
</script>
```

## 配置选项

| 选项 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| appId | String | - | 应用ID（必填） |
| serverUrl | String | - | 数据上报地址（必填） |
| sampleRate | Number | 1.0 | 采样率(0-1) |
| enableError | Boolean | true | 是否开启错误监控 |
| enablePerformance | Boolean | true | 是否开启性能监控 |
| enableBehavior | Boolean | true | 是否开启行为监控 |
| maxBatchSize | Number | 20 | 批量上报最大条数 |
| reportInterval | Number | 5000 | 上报间隔(ms) |
| debug | Boolean | false | 是否开启调试模式 |

## API 参考

### 初始化与配置

#### 创建SDK实例
```javascript
const sdk = new MonitorSDK(config);
```

#### 初始化监控
```javascript
sdk.init();
```

#### 更新配置
```javascript
sdk.setConfig({ enableBehavior: false, sampleRate: 0.5 });
```

#### 销毁实例
```javascript
sdk.destroy();
```

### 数据上报API

#### 上报自定义错误
```javascript
sdk.reportError(new Error('Something went wrong'));
```

#### 上报自定义事件
```javascript
sdk.reportEvent('custom_event', { key: 'value' });
```

#### 上报性能数据
```javascript
sdk.reportPerformance({ name: 'custom_metric', value: 100 });
```

## 开发指南

### 项目结构

```
src/
├── behavior/         # 行为监控模块
├── error/            # 错误监控模块
├── performance/      # 性能监控模块
├── cache.js          # 数据缓存
├── config.js         # 配置管理
├── report.js         # 数据上报
├── utils.js          # 工具函数
└── webEyeSDK.js      # 主入口
```

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