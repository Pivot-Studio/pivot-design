import React from 'react';
import { Handle } from '@xyflow/react';
import { useFlowContext } from '../../context/index';
import './index.scss';
export default function Gain({ id, data }) {
  const { dispatch } = useFlowContext();
  const setGain = (e) => {
    dispatch({
      type: 'updateNode',
      payload: {
        id: id,
        data: {
          gain: +e.target.value,
        },
      },
    });
  };

  return (
    <div className="gain">
      <div>
        <p className="gain_title">Gain Node</p>

        <label className="gain_frequency">
          <span>value</span>
          <input
            className="nodrag"
            type="range"
            min="0"
            step={0.1}
            max="1"
            value={data.gain}
            onChange={setGain}
          />
          <span>{data.gain}</span>
        </label>
        <hr />
      </div>

      <Handle type="target" position="top" />
      <Handle type="source" position="bottom" />
    </div>
  );
}
