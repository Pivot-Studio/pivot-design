import { Params } from '../loaders/api/type';
import React from 'react';
import './index.scss';

interface ITableProps {
  name: string;
  params: Params;
}

const ApiTable: React.FC<ITableProps> = ({ name, params }) => {
  // console.log(params, name);
  return (
    <>
      <h3>{name}</h3>
      <table className="pivot-props-table">
        <thead>
          <tr>
            <th>参数名称</th>
            <th>说明</th>
            <th>参数类型</th>
            <th>默认值</th>
            <th>版本支持</th>
          </tr>
        </thead>
        <tbody>
          {params.map((param) => {
            return (
              <tr>
                <td>{param.key}</td>
                <td>{param.description}</td>
                <td>{param.value}</td>
                <td>{param.default && param.default.length && param.default !== 'undefined' ? param.default : '—'}</td>
                <td>{param.version}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  );
};

export default ApiTable;
