function hasClass(element: Element, className: string): boolean {
  if (element.classList) {
    return !!className && element.classList.contains(className);
  }
  return ` ${element.className.baseVal || element.className} `.indexOf(` ${className} `) !== -1;
}

export function addOneClass(element: Element, className: string): void {
  if (element.classList) {
    element.classList.add(className);
  } else if (!hasClass(element, className)) {
    element.className = `${element.className} ${className}`;
  }
}

export function removeOneClass(element: Element, className: string): void {
  if (element.classList) {
    element.classList.remove(className);
  } else {
    element.className = element.className
      .replace(new RegExp(`(^|\\s)${className}(?:\\s|$)`, 'g'), '$1')
      .replace(/\s+/g, ' ')
      .replace(/^\s*|\s*$/g, '');
  }
}
