import { Node, co } from '@xyflow/react';

const context = new AudioContext();
const nodes = new Map<string, AudioNode>();

const NodesCreator = {
  osc: (data: { frequency: number; type: OscillatorType }) => {
    const oscNode = context.createOscillator();
    oscNode.frequency.value = data.frequency;
    oscNode.type = data.type;
    oscNode.start();
    return oscNode;
  },
  gain: (data: { gain: number }) => {
    const gainNode = context.createGain();
    gainNode.gain.value = data.gain;
    return gainNode;
  },
  output: () => context.destination,
};

export function updateAudioNode(id: string, data: Record<string, any>) {
  const node = nodes.get(id);
  if (!node || !data) {
    return;
  }

  for (const [key, val] of Object.entries(data)) {
    if (node[key] instanceof AudioParam) {
      node[key].value = val;
    } else {
      node[key] = val;
    }
  }
}

export const createAudioNode = (node: Node) => {
  const { type, id, data } = node;
  const _node = type && NodesCreator[type]?.(data);
  if (_node) {
    return null;
  }
  nodes.set(id, _node);
  updateAudioNode(id, data);

  return _node;
};

/**是否发出声音 */
export function isRunning() {
  return context.state === 'running';
}

/**声音开关 */
export function toggleAudio() {
  return isRunning() ? context.suspend() : context.resume();
}

export const connectNodes = (sourceId: string, targetId: string) => {
  const source = nodes.get(sourceId);
  const target = nodes.get(targetId);

  if (!source || !target) return;

  source.connect(target);
};

export function removeAudioNode(id: string) {
  const node = nodes.get(id);

  if (!node) return;

  node.disconnect();
  node.stop?.();

  nodes.delete(id);
}

/**初始化节点 */
export const initNodes = (initNodes: Node[], isRunning: boolean) => {
  // 初始化的时候先判断下
  if (!isRunning) {
    context.suspend();
  }
  let prevNode: AudioNode;
  initNodes.forEach((node) => {
    const _n = createAudioNode(node);
    // 链接
    if (prevNode) {
      prevNode.connect(_n);
    }
    prevNode = _n;
  });
};
