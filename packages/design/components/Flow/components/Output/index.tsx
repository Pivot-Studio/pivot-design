import React from 'react';
import { Handle } from '@xyflow/react';
import { useFlowContext } from '../../context/index';
// import './index.scss';
export default function Output({ id, data }) {
  const { state, dispatch } = useFlowContext();
  const { isRunning } = state;

  return (
    <div
      className="output"
      style={{ color: 'var(--semi-color-black)' }}
      onClick={() => {
        dispatch({ type: 'toggleAudio' });
      }}
    >
      {isRunning ? 'stop' : 'running'}
      <Handle type="target" position="top" />
    </div>
  );
}
