import { getWindow } from '../../Draggable/utils/getWindow';

export function isSVGElement(node: Node): node is SVGElement {
  return node instanceof getWindow(node).SVGElement;
}
