import React from 'react';
interface ITableProps {
  params: any[];
  name: string;
}
const Table: React.FC<ITableProps> = (props) => {
  const { params, name } = props;
  return (
    <table className="pivot-props-table">
      <thead>
        <tr>
          <th>参数名称</th>
          <th>参数类型</th>
          <th>是否必选</th>
          <th>默认值</th>
          <th>备注</th>
          <th>版本支持</th>
        </tr>
      </thead>
      <tbody>
        {params.map((param) => {
          return (
            <tr>
              <td>{param.key}</td>
              <td>{param.value}</td>
              <td>{param.optional ? '❌' : '✅'}</td>
              <td>{param.default}</td>
              <td>{param.description}</td>
              <td>{param.version}</td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default Table;
