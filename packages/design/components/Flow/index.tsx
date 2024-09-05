import React, { CSSProperties, useCallback, useEffect, useState } from 'react';
import { TabsItemProps, TabsProps } from 'pivot-design-props';
import { prefix } from '../constants';
import classnames from 'classnames';
import './index.scss';
import {
  Background,
  Controls,
  MiniMap,
  Panel,
  ReactFlow,
  ReactFlowProvider,
  addEdge,
  useEdgesState,
  useNodesState,
} from '@xyflow/react';

import '@xyflow/react/dist/style.css';
// import '@xyflow/react/dist/base.css';
import { ContextProvider, useFlowContext } from './context';
import Osc from './components/Osc';
import Output from './components/Output';
import Gain from './components/Gain';

const defaultNodes = [
  { id: 'a', data: { label: 'oscillator' }, position: { x: 100, y: 100 } },
  { id: 'b', data: { label: 'gain' }, position: { x: 250, y: 150 } },
  { id: 'c', data: { label: 'output' }, position: { x: 300, y: 400 } },
];
const initialEdges = [{ id: 'e1-2', source: '1', target: '2' }];

const nodeTypes = {
  osc: Osc,
  output: Output,
  gain: Gain,
};

const MyPanel = () => {
  const { dispatch } = useFlowContext();
  return (
    <Panel position="top-right">
      <button
        onClick={() =>
          dispatch({ type: 'createNode', payload: { type: 'osc' } })
        }
      >
        osc
      </button>
      <button
        onClick={() =>
          dispatch({ type: 'createNode', payload: { type: 'gain' } })
        }
      >
        amp
      </button>
    </Panel>
  );
};
const Flow: React.FC<TabsProps> = (props) => {
  const { className, style } = props;

  // Create the brain of our audio-processing graph
  // const context = new AudioContext();

  // Create an oscillator node to generate tones 振荡器节点生成音调
  // const osc = context.createOscillator();

  // Create a gain node to control the volume 增益节点来控制音量
  // const amp = context.createGain();

  // Pass the oscillator's output through the gain node and to our speakers
  // osc.connect(amp);
  // amp.connect(context.destination);

  // Start generating those tones!
  // osc.start();
  return (
    <div className={classnames(`${prefix}_flow`, className)} style={style}>
      <ContextProvider defaultNodes={defaultNodes} nodeTypes={nodeTypes}>
        <>
          <MyPanel></MyPanel>
          <Controls />
          <MiniMap />
          <Background variant="dots" gap={12} size={1} />
        </>
      </ContextProvider>
    </div>
  );
};
export default Flow;
