// 检查给定的 DOM 元素是否包含给定的类名
function hasClass(element: Element, className: string): boolean {
  if (element.classList) {
    return !!className && element.classList.contains(className);
  }
  return ` ${element.className} `.indexOf(` ${className} `) !== -1;
}

// 将给定的类名添加到给定的 DOM 元素上
function addOneClass(element: Element, className: string): void {
  if (element.classList) {
    element.classList.add(className);
  } else if (!hasClass(element, className)) {
    element.className = `${element.className} ${className}`;
  }
}

// DOM 元素移除类名
function removeOneClass(element: Element, className: string): void {
  if (element.classList) {
    element.classList.remove(className);
  } else {
    element.className = element.className
      .replace(new RegExp(`(^|\\s)${className}(?:\\s|$)`, 'g'), '$1')
      .replace(/\s+/g, ' ')
      .replace(/^\s*|\s*$/g, '');
  }
}

// 强制浏览器重新计算元素的布局
export const forceReflow = (node: { scrollTop: number }) => node.scrollTop;

// 添加类名到 dom 元素
export const addClass = (node: HTMLElement, classes: string) =>
  node && classes && classes.split(' ').forEach((c: any) => addOneClass(node, c));

// 从 dom 元素删除类名
export const removeClass = (node: HTMLElement, classes: string) =>
  node && classes && classes.split(' ').forEach((c: any) => removeOneClass(node, c));
