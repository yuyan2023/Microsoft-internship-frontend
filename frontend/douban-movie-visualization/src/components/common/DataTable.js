
import React from 'react';
import { Table } from 'antd';

const DataTable = ({ data = [], columns = [], pagination = true }) => {
  const paginationConfig = pagination === true 
    ? {
        pageSize: 10,
        showSizeChanger: true,
        pageSizeOptions: ['10', '20', '50', '100'],
        showTotal: (total) => `共 ${total} 条数据`
      } 
    : pagination;

  return (
    <Table
      dataSource={data}
      columns={columns}
      pagination={paginationConfig}
      bordered
      size="middle"
      scroll={{ x: 'max-content' }}
    />
  );
};

export default DataTable;