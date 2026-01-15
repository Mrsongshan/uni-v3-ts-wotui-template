# uni-v3-ts-wotui-template

一个基于 uni-app Vue3 + TypeScript + Wot Design Uni 的跨平台应用开发模板。

## 技术栈

- **框架**: uni-app 3.x
- **语言**: TypeScript 5.x
- **UI 库**: Wot Design Uni
- **状态管理**: Pinia
- **构建工具**: Vite 5.x
- **包管理器**: pnpm
- **网络请求**: luch-request

## 特性

- ✅ Vue3 Composition API
- ✅ TypeScript 类型支持
- ✅ Wot Design Uni 组件库
- ✅ 统一的网络请求封装
- ✅ 环境配置管理
- ✅ 请求/响应拦截器
- ✅ 自动组件导入
- ✅ 路径别名配置

## 目录结构

```
uni-v3-ts-wotui-template/
├── src/
│   ├── api/              # API 接口
│   ├── components/       # 公共组件
│   ├── config/           # 配置文件
│   ├── pages/            # 页面
│   ├── static/           # 静态资源
│   ├── stores/           # Pinia 状态管理
│   ├── utils/            # 工具函数
│   ├── App.vue           # 应用入口
│   ├── main.ts           # 主入口文件
│   ├── manifest.json     # 应用配置
│   ├── pages.json        # 页面配置
│   └── uni.scss          # 全局样式
├── .vscode/              # VSCode 配置
├── components.d.ts       # 组件类型声明
├── tsconfig.json         # TypeScript 配置
├── vite.config.ts        # Vite 配置
└── package.json          # 项目依赖
```

## 快速开始

### 安装依赖

```bash
pnpm install
```

### 开发

```bash
# 运行到 H5
pnpm dev:h5

# 运行到微信小程序
pnpm dev:mp-weixin

# 运行到 APP
pnpm dev:app
```

### 构建

```bash
# 构建 H5
pnpm build:h5

# 构建微信小程序
pnpm build:mp-weixin

# 构建 APP
pnpm build:app
```

## 配置说明

### 环境配置

项目配置文件位于 `src/config/index.ts`：

```typescript
// 基础地址
export const baseUrl = process.env.NODE_ENV === 'development'
  ? 'http://192.168.50.29:8001'  // 开发环境
  : 'https://xxxx.xxxx.xxxx'      // 生产环境

// 请求超时时间
export const timeout = 30000

// 不需要鉴权的路径
export const UNNEEDAUTHPATH = ['/login/index', '/index/index', '/guide/index']
```

### 网络请求

使用封装好的 `http` 实例发起请求：

```typescript
// src/api/index.ts
import http from '@/utils/request'

export const userApi = {
  getUserInfo() {
    return http.get('/api/user/info')
  },

  login(data) {
    return http.post('/api/user/login', data)
  }
}
```

### 请求拦截器

在 `src/utils/request.ts` 中配置了：

- **请求拦截**: 自动添加 token
- **响应拦截**: 统一处理错误、业务状态码
- **错误处理**: 网络错误、超时、HTTP 状态码等

## 使用示例

### 页面中调用接口

```vue
<script setup lang="ts">
import { onMounted } from 'vue'
import { userApi } from '@/api'

onMounted(async () => {
  try {
    const res = await userApi.getUserInfo()
    console.log('用户信息:', res)
  } catch (error) {
    console.error('获取失败:', error)
  }
})
</script>
```

### 使用 Wot Design Uni 组件

```vue
<template>
  <view>
    <wd-button type="primary">按钮</wd-button>
    <wd-popup v-model="show">弹窗内容</wd-popup>
  </view>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const show = ref(false)
</script>
```

## 注意事项

### APP 真机调试

1. 确保手机和电脑在同一局域网
2. 修改 `src/config/index.ts` 中的开发环境地址为局域网 IP
3. 在 HBuilderX 中运行到真机

### 小程序开发

1. 微信小程序需要在开发者工具中勾选"不校验合法域名"
2. 正式发布前需要在小程序后台配置服务器域名白名单

### TypeScript 支持

项目已配置 TypeScript，VSCode 会自动提供类型提示和检查：

```bash
# 类型检查
pnpm type-check
```

## 依赖说明

### 核心依赖

- `vue`: Vue 3 框架
- `@dcloudio/uni-*`: uni-app 核心包
- `pinia`: 状态管理
- `luch-request`: 网络请求库
- `wot-design-uni`: UI 组件库

### 开发依赖

- `typescript`: TypeScript 支持
- `vite`: 构建工具
- `@uni-helper/*`: uni-app 开发辅助工具

## License

MIT

## 作者

songshan

## 更新日志

### v0.1.0 (2026-01-15)

- 初始化项目
- 集成 Wot Design Uni
- 封装网络请求
- 配置 TypeScript
- 添加基础示例
