


# WebEyeSDK 前端监控SDK

一个轻量级、高性能的前端监控SDK，用于收集和分析网页的错误、性能和用户行为数据，帮助开发者更好地了解和优化前端应用。

## ✨ 功能特性

### 错误监控
- JavaScript 运行时错误捕获
- 资源加载错误监控
- Promise 未捕获异常监控
- 自定义错误上报

### 性能监控
- 核心 Web Vitals 指标收集（FCP、LCP、CLS等）
- 页面加载性能监控
- 资源加载性能监控
- API 请求性能监控（XHR、Fetch）

### 用户行为监控
- 页面访问量（PV）统计
- 页面切换监控
- 点击事件追踪
- 自定义事件上报

### 数据上报
- 批量上报机制
- 数据本地缓存
- 失败重试策略

## 🚀 安装

### NPM 安装

```bash
npm install webeyssdk --save
```

### CDN 引入

```html
<script src="https://cdn.example.com/webeyssdk.min.js"></script>
```

## 📖 使用指南

### 基本用法

```javascript
// ES Module
import WebEyeSDK from 'webeyssdk';

// 初始化SDK
const sdk = new WebEyeSDK({
  appId: 'your-app-id',
  serverUrl: 'https://your-monitor-server.com/api/report',
  sampleRate: 1.0,
  enableError: true,
  enablePerformance: true,
  enableBehavior: true
});

// 启动监控
sdk.init();
```

### 浏览器直接使用

```html
<script>
  // 初始化SDK
  const sdk = new window.WebEyeSDK({
    appId: 'your-app-id',
    serverUrl: 'https://your-monitor-server.com/api/report'
  });
  
  // 启动监控
  sdk.init();
</script>
```

## ⚙️ 配置选项

| 配置项 | 类型 | 默认值 | 说明 |
| ------ | ---- | ------ | ---- |
| appId | String | - | 应用唯一标识，必填 |
| serverUrl | String | - | 数据上报地址，必填 |
| sampleRate | Number | 1.0 | 采样率（0-1） |
| enableError | Boolean | true | 是否启用错误监控 |
| enablePerformance | Boolean | true | 是否启用性能监控 |
| enableBehavior | Boolean | true | 是否启用行为监控 |
| maxBatchSize | Number | 20 | 批量上报的最大条数 |
| reportInterval | Number | 5000 | 上报间隔（毫秒） |
| debug | Boolean | false | 是否开启调试模式 |

## 📊 API 文档

### 初始化与配置

#### `new WebEyeSDK(config)`
创建SDK实例

```javascript
const sdk = new WebEyeSDK(config);
```

#### `sdk.init()`
启动监控

```javascript
sdk.init();
```

#### `sdk.setConfig(config)`
动态更新配置

```javascript
sdk.setConfig({
  sampleRate: 0.5,
  enableBehavior: false
});
```

#### `sdk.destroy()`
销毁SDK实例，停止所有监控

```javascript
sdk.destroy();
```

### 自定义上报

#### `sdk.reportError(error)`
上报自定义错误

```javascript
sdk.reportError(new Error('Custom error message'));
```

#### `sdk.reportEvent(name, data)`
上报自定义事件

```javascript
sdk.reportEvent('custom_event', {
  category: 'user',
  action: 'share',
  label: 'facebook'
});
```

#### `sdk.reportPerformance(metrics)`
上报自定义性能数据

```javascript
sdk.reportPerformance({
  name: 'custom_measure',
  duration: 123,
  start: 1623456789
});
```

## 🔍 数据格式

### 错误数据

```javascript
{
  type: 'error',
  timestamp: 1623456789000,
  appId: 'your-app-id',
  pageUrl: 'https://example.com/page',
  errorInfo: {
    message: 'Uncaught TypeError: Cannot read property of undefined',
    stack: 'Error: ...',
    type: 'TypeError',
    filename: 'app.js',
    lineno: 42,
    colno: 12
  }
}
```

### 性能数据

```javascript
{
  type: 'performance',
  timestamp: 1623456789000,
  appId: 'your-app-id',
  pageUrl: 'https://example.com/page',
  metrics: {
    fcp: 123,
    lcp: 456,
    cls: 0.1,
    ttfb: 100,
    domReady: 300,
    load: 500
  }
}
```

### 行为数据

```javascript
{
  type: 'behavior',
  timestamp: 1623456789000,
  appId: 'your-app-id',
  pageUrl: 'https://example.com/page',
  eventType: 'click',
  eventData: {
    target: '#button',
    text: 'Submit',
    path: ['div', 'form', 'button']
  }
}
```

## 🛠️ 项目结构

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
│   ├── observeLCP.js # LCP指标监控
│   ├── observerFCP.js # FCP指标监控
│   ├── observerLoad.js # 页面加载监控
│   ├── observerPaint.js # 绘制指标监控
│   └── xhr.js        # XHR请求监控
├── cache.js          # 本地缓存模块
├── config.js         # 配置管理模块
├── report.js         # 数据上报模块
├── utils.js          # 工具函数模块
└── webEyeSDK.js      # SDK主类
```

## 🔧 开发指南

### 安装依赖

```bash
pnpm install
```

### 构建项目

```bash
pnpm run build
```

### 本地开发服务器

```bash
node server.js
```

然后访问 `http://localhost:3000/demo/index.html` 查看演示页面。

## 📝 浏览器兼容性

- Chrome (>= 60)
- Firefox (>= 55)
- Safari (>= 11)
- Edge (>= 80)

## 🤝 贡献指南

欢迎提交 Issue 和 Pull Request 来改进这个项目。

## 📄 许可证

[MIT License](https://opensource.org/licenses/MIT)