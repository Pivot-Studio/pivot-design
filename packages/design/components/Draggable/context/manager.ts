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
    const nodes = this.nodes[key];
    if (key === 'draggables') {
      return nodes.sort((a, b) => a.data.current!['sortable'].index - b.data.current!['sortable'].index);
    }
    return nodes;
  }
  getContainerNode(id: UniqueIdentifier) {
    const nodes = [...this.nodes['draggables']];
    return nodes.filter((n) => n.data.current!['sortable'].containerId === id);
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
