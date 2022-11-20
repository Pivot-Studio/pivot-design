# pivot-design

Pivot-Studio 前端组件库

## 开发前必看

1. 启动方式

- clone 下来仓库后，执行`pnpm install` **这里必须注意，必须使用 pnpm**
- 进入`packages/demo`文件夹，执行`npm start`，即可启动组件库项目
- 开发时只需要在`packages/design/components`中去编写组件库，通过**热更新**我们可以在 demo 页中看到效果。

2. 开发前必做

在飞书内编写**组件技术方案**，并且让组件库群内人员过目后再开始编写代码。

**「注意」**：组件的`props`属性要单独抽离出来一个文件，后期用于分离。
