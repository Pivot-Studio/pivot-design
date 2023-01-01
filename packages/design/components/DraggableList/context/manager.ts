import type { DraggableNode } from '../utils/types';

export default class Manager {
  private nodes: DraggableNode[];
  constructor() {
    this.nodes = [];
  }
  push(node: DraggableNode) {
    this.nodes.push(node);
  }
  clear() {
    this.nodes = [];
  }
  reorderNodes(isPos: boolean = true) {
    const reorders = [...this.nodes];
    return reorders.sort((a, b) => (isPos ? a.index - b.index : b.index - a.index));
  }
}
