
import React from 'react';
import { Typography, Divider, Space, Button } from 'antd';
import { BarChartOutlined, TableOutlined } from '@ant-design/icons';

const { Title } = Typography;

const ChartContainer = ({ 
  title, 
  children, 
  viewMode = 'chart', 
  onViewModeChange = () => {}, 
  className = ""
}) => {
  return (
    <div className={`content-container ${className}`}>
      <div className="header-section">
        <Title level={3}>{title}</Title>
        <Space>
          <Button 
            type={viewMode === 'chart' ? 'primary' : 'default'}
            icon={<BarChartOutlined />}
            onClick={() => onViewModeChange('chart')}
          >
            图表视图
          </Button>
          <Button 
            type={viewMode === 'table' ? 'primary' : 'default'}
            icon={<TableOutlined />}
            onClick={() => onViewModeChange('table')}
          >
            表格视图
          </Button>
        </Space>
      </div>
      
      <Divider />
      
      {children}
    </div>
  );
};

export default ChartContainer;