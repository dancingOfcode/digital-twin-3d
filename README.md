# lisp_web_3d

## 1.应用介绍：基于vue3 + vite + vue-router + pinia + three.js + tweenjs 实现的WEB3D可视化大屏基础架构。

## 2.技术栈：[vue3](https://cn.vuejs.org/) + [vite](http://www.webgl3d.cn/) + [vue-router](https://router.vuejs.org/zh/)+ [pinia](https://pinia.vuejs.org/zh/) + [threejs](hhttps://threejs.org/) + [tweenjs](https://createjs.com/tweenjs)

## 3.SRC目录介绍

├─assets 存放应用引用的本地静态资源（如图片、视频等）的目录
├─common threejs二次封装、公共函数、常量存放目录
│ ├─three
│ │ └─lights threejs灯光
│ │ └─viewer.js threejs-API功能集成入口
│ ├─utils
│ │ └─constant.js 常量
│ │ └─utils.js 工具函数
│─components 组件目录
│ └─actionDetail.vue 动作详情-右侧弹窗  
│ └─actionMenu.vue 动作菜单-左侧弹窗
│ └─header.vue header组件  
├─hooks 符合vue3组合式API的常用hooks
├─router 路由集成
├─stores pinia仓库
├─views 业务页面文件存放的目录(新增页面参考此规范创建)
│ ├─homeView
│ │ └─index.vue 大屏页
├─App.vue 应用根组件
├─main.js Vue初始化入口文件

## 4.项目依赖安装

```sh
pnpm install
首次生成husky文件夹还需要执行：npx husky add .husky/commit-msg 'npx commitlint --edit $1'
```

## 5.开发环境运行

```sh
pnpm dev
```

## 6.项目打包

```sh
pnpm build
```

## 6.代码规范检查

```sh
pnpm lint
```

## 7.代码修复，常规的如逗号等可以修复，复杂的需自行修复

```sh
pnpm format
```

## 8.GIT提交规范 （注意冒号: 后面需要空格）

```js
// type 类型定义，表示 git 提交的 type 必须在以下类型范围内
'type-enum': [
  // 当前验证的错误级别
  2,
  // 在什么情况下进行验证
  'always',
  [
    'feat', // 新功能 feature
    'fix', // 修复 bug
    'docs', // 文档注释
    'style', // 代码格式(不影响代码运行的变动)
    'refactor', // 重构(既不增加新功能，也不是修复bug)
    'perf', // 性能优化
    'test', // 增加测试
    'chore', // 构建过程或辅助工具的变动
    'revert', // 回退
    'build', // 打包
  ],
],
  // subject 大小写不做校验
'subject-case': [0],
```
