import { vendorPrefix } from '../../utils';
import { UniqueIdentifier } from './types';
import React, { MouseEvent } from 'react';
export function closest(node: Node & { dragitemid?: UniqueIdentifier }, fn: (...args: any[]) => boolean) {
  while (!fn(node) && node) {
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
export function getPositionFromEvent(event: any) {
  if (event.touches && event.touches.length > 0) {
    return {
      x: event.touches[0]!.pageX,
      y: event.touches[0]!.pageY,
    };
  } else if (event.changedTouches && event.changedTouches.length) {
    return {
      x: event.changedTouches[0]!.pageX,
      y: event.changedTouches[0]!.pageY,
    };
  } else {
    return {
      x: event.pageX,
      y: event.pageY,
    };
  }
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
