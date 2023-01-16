import type { DraggableNode, UniqueIdentifier } from '../types';

export default class Manager {
  private nodes: DraggableNode[];
  constructor(manager?: Manager) {
    if (manager) {
      this.nodes = manager.nodes;
      return;
    }
    this.nodes = [];
  }
  push(node: DraggableNode) {
    this.nodes.push(node);
  }
  clear() {
    this.nodes = [];
  }
  getAll() {
    return this.nodes;
  }
  getActiveNode(id: UniqueIdentifier) {
    for (let index = 0; index < this.nodes.length; index++) {
      const node = this.nodes[index];
      if (node?.id === id) return node;
    }
    return null;
  }
  reorderNodes(isPos: boolean = true) {
    const reorders = [...this.nodes];
    return reorders.sort((a, b) => (isPos ? a.index - b.index : b.index - a.index));
  }
}
