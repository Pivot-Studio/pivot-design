import React, {
  PropsWithChildren,
  Reducer,
  ReducerWithoutAction,
  useCallback,
  useContext,
  useEffect,
  useReducer,
} from 'react';
import {
  Background,
  Connection,
  Controls,
  Edge,
  EdgeChange,
  MiniMap,
  Node,
  NodeChange,
  ReactFlow,
  ReactFlowProvider,
  addEdge,
  applyEdgeChanges,
  applyNodeChanges,
  useEdgesState,
  useNodesState,
} from '@xyflow/react';
import { Props } from '../types';
import {
  connectNodes,
  createAudioNode,
  initNodes,
  removeAudioEdge,
  removeAudioNode,
  toggleAudio,
  updateAudioNode,
} from '../audio';
const initialNodes = [
  // {
  //   type: 'osc',
  //   id: 'a',
  //   data: { frequency: 50, type: 'square' },
  //   position: { x: 0, y: 0 },
  // },
  // {
  //   type: 'gain',
  //   id: 'b',
  //   data: { gain: 0 },
  //   position: { x: 0, y: 300 },
  // },
  {
    type: 'output',
    id: '__output',
    position: { x: 200, y: 500 },
  },
];
const initialEdges = [
  // { id: 'e1-2', source: 'a', target: 'b' },
  // { id: 'e2-3', source: 'b', target: 'c' },
];
const InitialState = {
  nodes: initialNodes as Node[],
  edges: initialEdges as Edge[],
  isRunning: false,
};
type State = typeof InitialState;
type ActionType =
  | {
      type: 'createNode';
      payload: {
        type: 'osc' | 'gain' | 'output';
      };
    }
  | {
      type: 'nodesChange';
      payload: {
        changes: NodeChange<Node>[];
      };
    }
  | {
      type: 'edgesChange';
      payload: {
        changes: EdgeChange<Edge>[];
      };
    }
  | {
      type: 'addEdges';
      payload: {
        data: Connection;
      };
    }
  | {
      type: 'updateNode';
      payload: {
        id: string;
        data: Node;
      };
    }
  | {
      type: 'removeNodes';
      payload: {
        ids: string[];
      };
    }
  | {
      type: 'removeEdges';
      payload: {
        edges: Edge[];
      };
    }
  | {
      type: 'toggleAudio';
    };
const Context = React.createContext<{
  state: State;
  dispatch: React.Dispatch<ActionType>;
}>({
  state: InitialState,
  dispatch: (() => {}) as unknown as React.Dispatch<ActionType>,
});
export function reducer(state: State, action: ActionType) {
  const { nodes, edges, isRunning } = state;
  const onNodesChange = (changes: NodeChange<Node>[]) => {
    return applyNodeChanges(changes, nodes);
  };

  const onEdgesChange = (changes: EdgeChange<Edge>[]) => {
    console.log('====[onEdgesChange]:', changes);
    // 取出对应id的edge对象进行合并
    return applyEdgeChanges(changes, edges);
  };
  const addEdge = (data: Connection) => {
    // console.log('====[Connection]:', data);
    connectNodes(data.source, data.target);
    const id = String(new Date().getTime());
    const edge = { ...data, id };
    return edge;
  };
  switch (action.type) {
    // 创建新的节点
    case 'createNode': {
      const { type } = action.payload;
      // TODO
      const data =
        type === 'osc' ? { frequency: 440, type: 'sine' } : { gain: 0 };
      const position = { x: 0, y: 0 };
      const id = `${String(Date.now())}__${type}`;
      createAudioNode({
        id,
        type,
        data,
        position,
      });
      return {
        ...state,
        nodes: [{ id, type, data, position }, ...nodes],
      };
    }
    // 节点变化
    case 'nodesChange': {
      const { changes } = action.payload;
      const nodes = onNodesChange(changes);
      return {
        ...state,
        nodes,
      };
    }
    // 线变化
    case 'edgesChange': {
      const { changes } = action.payload;
      const edges = onEdgesChange(changes);
      return {
        ...state,
        edges,
      };
    }
    // 新增节点
    case 'addEdges': {
      const newEdge = addEdge(action.payload.data);

      return { ...state, edges: [...edges, newEdge] };
    }
    // 删除节点
    case 'removeNodes': {
      const { ids } = action.payload;
      for (const id of ids) {
        removeAudioNode(id);
      }
      const newNodes = nodes.filter((node) => ids.includes(node.id));
      return {
        ...state,
        nodes: newNodes,
      };
    }
    // 删除节点
    case 'removeEdges': {
      const { edges: _edges } = action.payload;
      for (const edge of _edges) {
        removeAudioEdge(edge);
      }

      const ids = edges.map((e) => e.id);
      const newEdges = edges.filter((e) => ids.includes(e.id));
      return {
        ...state,
        edges: newEdges,
      };
    }
    // 节点值变化
    case 'updateNode': {
      const { id, data } = action.payload;
      updateAudioNode(id, data);
      const newNodes = nodes.map((node) =>
        node.id === id ? { ...node, data: { ...node.data, ...data } } : node
      );
      return {
        ...state,
        nodes: newNodes,
      };
    }

    case 'toggleAudio': {
      toggleAudio();
      return {
        ...state,
        isRunning: !isRunning,
      };
    }
    default:
      return { ...state };
  }
}

export const ContextProvider: React.FC<PropsWithChildren<Props>> = ({
  children,
  nodeTypes,
  defaultNodes,
  defaultEdges,
}) => {
  // const [nodes, setNodes, onNodesChange] = useNodesState(
  //   defaultNodes || initialNodes
  // );
  // const [edges, setEdges, onEdgesChange] = useEdgesState(
  //   defaultEdges || initialEdges
  // );
  // const onConnect = useCallback(
  //   (params) => setEdges((eds) => addEdge(params, eds)),
  //   [setEdges]
  // );
  const [state, dispatch] = useReducer<Reducer<State, ActionType>>(
    reducer,
    InitialState
  );
  const { nodes, edges, isRunning } = state;
  console.log('===state', state);
  useEffect(() => {
    initNodes(nodes, isRunning);
  }, []);
  return (
    <ReactFlowProvider>
      <Context.Provider value={{ state, dispatch }}>
        <ReactFlow
          nodes={nodes}
          edges={edges}
          nodeTypes={nodeTypes}
          onNodesChange={(changes) => {
            dispatch({ type: 'nodesChange', payload: { changes } });
          }}
          onEdgesChange={(changes) => {
            dispatch({ type: 'edgesChange', payload: { changes } });
          }}
          onConnect={(data) => {
            dispatch({ type: 'addEdges', payload: { data } });
          }}
          onNodesDelete={(nodes) => {
            dispatch({
              type: 'removeNodes',
              payload: { ids: nodes.map((node) => node.id) },
            });
          }}
          onEdgesDelete={(edges) => {
            console.log('=====[onEdgesDelete]:', edges);

            dispatch({
              type: 'removeEdges',
              payload: { edges },
            });
          }}
        >
          {children}
        </ReactFlow>
      </Context.Provider>
    </ReactFlowProvider>
  );
};
export const useFlowContext = () => {
  return useContext(Context);
};
