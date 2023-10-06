export const ComponentPath = [
  {
    path: 'button',
    title: 'Button 按钮',
  },
  {
    path: 'switch',
    title: 'Switch 开关',
  },
  {
    path: 'card',
    title: 'Card 卡片',
  },
  {
    path: 'draggable',
    title: 'Draggable 拖拽列表',
  },
  {
    path: 'skeleton',
    title: 'Skeleton 骨架屏',
  },
  {
    path: 'icon',
    title: 'Icon 图标',
  },
  {
    path: 'input',
    title: 'Input 输入框',
  },
  {
    path: 'popover',
    title: 'Popover 气泡',
  },
  {
    path: 'modal',
    title: 'Modal 弹窗',
  },
  {
    path: 'transition',
    title: 'Transition 元素动画',
  },
  {
    path: 'tabs',
    title: 'Tabs 标签页',
  },
  {
    path: 'editor',
    title: 'Editor 代码编辑器',
  },
] as const;

export const generateComponentRouter = (mapping: Record<(typeof ComponentPath)[number]['path'], any>) => {
  return ComponentPath.map((component) => {
    // eslint-disable-next-line no-prototype-builtins
    if (mapping.hasOwnProperty(component.path)) {
      return {
        ...component,
        element: mapping[component.path],
      };
    }
    return {};
  });
};
