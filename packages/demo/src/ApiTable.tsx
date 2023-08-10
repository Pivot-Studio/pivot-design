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
      <h3 className="pivot-props-apiTitle">{name}</h3>
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
                <td style={{ width: '15%' }}>{param.key}</td>
                <td style={{ width: '40%' }}>{param.description}</td>
                <td style={{ width: '20%' }}>{param.value}</td>
                <td style={{ width: '15%' }}>
                  {param.default && param.default.length && param.default !== 'undefined' ? param.default : '—'}
                </td>
                <td style={{ width: '10%' }}>{param.version}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  );
};

export default ApiTable;
