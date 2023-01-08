import { getWindow } from '../getWindow';

export function isSVGElement(node: Node): node is SVGElement {
  return node instanceof getWindow(node).SVGElement;
}
