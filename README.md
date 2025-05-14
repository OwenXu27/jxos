# WebOS MacOS Retro

一个仿老 MacOS 风格的 Web OS 项目。

## 技术栈
- React
- TailwindCSS
- shadcn/ui
- Zustand
- Vite
- bun

## 目录结构
```
src/
  apps/           # 各应用模块
  components/     # 共享组件
    desktop/      # 桌面环境相关组件
    windows/      # 窗口管理相关组件
    ui/           # shadcn风格UI组件
  config/         # 配置文件
  contexts/       # React context providers
  hooks/          # 自定义hooks
  lib/            # 工具库
  stores/         # Zustand状态管理
  styles/         # 样式与字体
  types/          # TypeScript类型定义
  utils/          # 工具函数
```

## 启动方式
```bash
bun install
bun run dev
``` 