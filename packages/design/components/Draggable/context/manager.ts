import type { DraggableNode, UniqueIdentifier } from '../types';

export default class Manager {
  private nodes: {
    draggables: DraggableNode[];
    droppables: DraggableNode[];
  };
  constructor() {
    this.nodes = {
      draggables: [],
      droppables: [],
    };
  }
  push(node: DraggableNode, key: 'draggables' | 'droppables') {
    this.nodes[key].push(node);
  }
  remove(id: UniqueIdentifier, key: 'draggables' | 'droppables') {
    const nodes = this.nodes[key];
    this.nodes[key] = nodes.filter((node) => {
      return node.id !== id;
    });
  }
  clear() {
    this.nodes = {
      draggables: [],
      droppables: [],
    };
  }
  getAll(key: 'draggables' | 'droppables') {
    return this.nodes[key];
  }
  getNode(id: UniqueIdentifier, key: 'draggables' | 'droppables') {
    const nodes = this.nodes[key];
    for (let index = 0; index < nodes.length; index++) {
      const node = nodes[index];
      if (node?.id === id) return node;
    }
    return null;
  }
  // reorderNodes(isPos: boolean = true) {
  //   const reorders = [...this.nodes];
  //   return reorders.sort((a, b) => (isPos ? a.index - b.index : b.index - a.index));
  // }
}
