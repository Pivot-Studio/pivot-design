import React from 'react';
import { Handle } from '@xyflow/react';
import { useFlowContext } from '../../context/index';
import './index.scss';
export default function Osc({ id, data }) {
  const { dispatch } = useFlowContext();
  const setFrequency = (e) => {
    dispatch({
      type: 'updateNode',
      payload: {
        id: id,
        data: {
          frequency: +e.target.value,
        },
      },
    });
  };
  const setType = (e) => {
    dispatch({
      type: 'updateNode',
      payload: {
        id: id,
        data: {
          type: e.target.value,
        },
      },
    });
  };
  return (
    <div className="osc">
      <div>
        <p className="osc_title">Oscillator Node</p>

        <label className="osc_frequency">
          <span>Frequency</span>
          <input
            className="nodrag"
            type="range"
            min="10"
            max="1000"
            value={data.frequency}
            onChange={setFrequency}
          />
          <span>{data.frequency}Hz</span>
        </label>
        <hr />
        <div className="osc_type">
          <span>Waveform</span>
          <select
            className="nodrag"
            value={data.type}
            style={{ border: '1px solid' }}
            onChange={setType}
          >
            <option value="sine">sine</option>
            <option value="triangle">triangle</option>
            <option value="sawtooth">sawtooth</option>
            <option value="square">square</option>
          </select>
        </div>
      </div>

      <Handle type="source" position="bottom" />
    </div>
  );
}
