# pivot-design

Pivot-Studio 前端组件库

## 开发前必看

1. 启动方式

- clone 下来仓库后，执行`pnpm install` **这里必须注意，必须使用 pnpm**
- 进入`packages/demo`文件夹，执行`npm start`，即可启动组件库项目
- 开发时只需要在`packages/design/components`中去编写组件库，通过**热更新**我们可以在 demo 页中看到效果。

2. 开发前必做

在飞书内编写**组件技术方案**，并且让组件库群内人员过目后再开始编写代码。

**「注意」**：

- 基于 **「master」** 分支新建自己的分支，分支名尽量规范些，比如`feature-button`、`fix-button-disabled`等。
- `packages/*`中有 3 个项目包，采用 monorepo 的项目架构进行管理。其中，**`demo`用于开发时展示效果并且同时进行文档的编写**，`design`用于组件开发，`design-prop`用于定义组件的 props。你可能会好奇为什么要这样分？可以在群里细说～～

3. 开发组件

**有任何不懂的或者规范性问题可以看 Button 组件**

开发组件时的注意事项如下：

- props：所有的 props 均定义在`design-prop`中。每一个组件的 props 均要继承`PivotDesignProps`，**名字规范格式要求：「组件名」+ `Props`**，每一个组件若有自定义 css 变量，**名字规范格式要求：「组件名」+ `CssTokens`**

- 基础色值：本项目利用了 Semi 的 DSM，定制了一套色值。设计系统连接如下：https://semi.design/dsm_store/theme?dsmID=10493

- css 变量：我们默认的 css 变量放在`design/components/common.scss`里，**命名规范：「--pivot-componentName-property」**，用法如下：

```css
background-color: var(
  --button-background-color,
  var(--pivot-button-background-color)
);
```

- 组件 css：组件的 css 以及我们设置的默认类名必须加上一个`pivot`前缀。任何可能用户需要自定义的地方都可以使用 css 变量。

- 图片 icon：所有图片尽可能转换成`ReactSvgComponent`的形式进行引用。
