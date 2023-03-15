import { vendorPrefix } from '../../utils';
import { Coordinate, UniqueIdentifier } from '../types';
import React from 'react';
export { Listeners } from './Listener';

export function setTransform(transform?: Coordinate) {
  if (!transform) return {};
  return {
    [`${vendorPrefix}Transform`]: `translate3d(${transform.x}px,${transform.y}px,0)`,
  };
}

export function overlayStyle(clientRect: DOMRect | null, margin: any, transform: Coordinate): React.CSSProperties {
  const { height, width, x, y } = clientRect!;
  const { left, top } = margin;

  return {
    height: `${height}px`,
    left: `${x - left}px`,
    top: `${y - top}px`,
    width: `${width}px`,
    boxSizing: 'border-box',
    position: 'fixed',
    ...setTransform(transform),
  };
}
export function closest(node: HTMLElement & { dragitemid?: UniqueIdentifier }, fn: (...args: any[]) => boolean) {
  while (!fn(node) && node && node !== document.body) {
    // eslint-disable-next-line no-param-reassign
    node = node.parentNode as HTMLElement;
  }
  return node;
}

export function setInlineStyles(node: HTMLElement, styles: React.CSSProperties) {
  Object.keys(styles).forEach((key) => {
    node.style[key] = styles[key];
  });
}

export function setTranslate3d(node: HTMLElement, translate?: { x: number; y: number }) {
  node.style[`${vendorPrefix}Transform`] = translate == null ? '' : `translate3d(${translate.x}px,${translate.y}px,0)`;
}
export function setTransitionDuration(node: HTMLElement, duration?: number) {
  node.style[`${vendorPrefix}TransitionDuration`] = duration == null ? '' : `${duration}ms`;
}

function getPixelValue(stringValue: string) {
  if (stringValue.endsWith('px')) {
    return parseFloat(stringValue);
  }

  return 0;
}
export function getElementMargin(element: HTMLElement) {
  const style = window.getComputedStyle(element);
  return {
    bottom: getPixelValue(style.marginBottom),
    left: getPixelValue(style.marginLeft),
    right: getPixelValue(style.marginRight),
    top: getPixelValue(style.marginTop),
  };
}

export const arrayMove = (array: any[], from: number, to: number) => {
  const resArray = array.slice();
  resArray.splice(to < 0 ? to + array.length : to, 0, resArray.splice(from, 1)[0]);
  return resArray;
};
