// src/components/AntdMovieDashboard.js
import React, { useState } from 'react';
import { Layout, Menu, Alert, Spin, Dropdown, Button, Space, Avatar, Typography } from 'antd';
import { 
  UserOutlined, 
  VideoCameraOutlined, 
  PieChartOutlined,
  BarChartOutlined,
  HistoryOutlined,
  LogoutOutlined,
  DownOutlined
} from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import useMovieData from '../hooks/useMovieData';
import { useAuth } from '../contexts/AuthContext';

// 导入图表组件
import ActorsRankingChart from './charts/ActorsRankingChart';
import DirectorsRankingChart from './charts/DirectorsRankingChart';
import GenresBarChart from './charts/GenresBarChart';
import GenresPieChart from './charts/GenresPieChart';
import DecadesDistributionChart from './charts/DecadesDistributionChart';

// 导入通用组件
import ChartContainer from './common/ChartContainer';
import DataTable from './common/DataTable';

// 导入表格配置
import { tableColumns, prepareTableData } from './common/tableColumnsConfig';

const { Header, Content, Sider } = Layout;
const { SubMenu } = Menu;
const { Text } = Typography;

// 定义常用的颜色集
const CHART_COLORS = [
  '#1f77b4', '#ff7f0e', '#2ca02c', '#d62728', '#9467bd', 
  '#8c564b', '#e377c2', '#7f7f7f', '#bcbd22', '#17becf',
  '#aec7e8', '#ffbb78', '#98df8a', '#ff9896', '#c5b0d5'
];

const AntdMovieDashboard = ({ apiBaseUrl = 'http://localhost:5000' }) => {
  // 使用自定义Hook获取数据
  const { data, isLoading, error, isUsingSampleData } = useMovieData(apiBaseUrl);
  
  // 状态管理
  const [selectedKey, setSelectedKey] = useState('actorsRanking'); // 左侧菜单选中项
  const [viewMode, setViewMode] = useState('chart'); // 'chart' 或 'table'
  const [collapsed, setCollapsed] = useState(false); // 侧边栏折叠状态
  
  // 添加身份验证和导航
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();

  // 处理登出
  const handleLogout = async () => {
    const success = await logout();
    if (success) {
      navigate('/login');
    }
  };

  // 用户菜单
  const userMenu = (
    <Menu>
      <Menu.Item key="logout" icon={<LogoutOutlined />} onClick={handleLogout}>
        登出
      </Menu.Item>
    </Menu>
  );

  // 获取当前数据类型
  const getCurrentDataType = () => {
    if (selectedKey.includes('actors')) return 'actors';
    if (selectedKey.includes('director')) return 'directors';
    if (selectedKey.includes('genres')) return 'genres';
    if (selectedKey.includes('decades')) return 'decades';
    return 'actors'; // 默认
  };

  // 获取标题
  const getTitle = () => {
    switch(selectedKey) {
      case 'actorsRanking':
        return '演员出演电影排行';
      case 'directorsRanking':
        return '导演作品数量排行';
      case 'genresBarChart':
        return '电影类型分布 (柱状图)';
      case 'genresPieChart':
        return '电影类型分布 (饼图)';
      case 'decadesDistribution':
        return '电影年代分布';
      default:
        return '豆瓣电影数据分析';
    }
  };

  // 渲染图表内容
  const renderChartContent = () => {
    // 基于选中的菜单项渲染不同图表
    switch (selectedKey) {
      case 'actorsRanking':
        return <ActorsRankingChart data={data.actors} />;
      
      case 'directorsRanking':
        return <DirectorsRankingChart data={data.directors} />;
      
      case 'genresBarChart':
        return <GenresBarChart data={data.genres} />;
      
      case 'genresPieChart':
        return <GenresPieChart data={data.genres} />;
      
      case 'decadesDistribution':
        return <DecadesDistributionChart data={data.decades} />;
      
      default:
        return <div>请从左侧菜单选择一个图表类型</div>;
    }
  };

  // 渲染表格内容
  const renderTableContent = () => {
    const dataType = getCurrentDataType();
    return (
      <DataTable 
        data={prepareTableData(data, dataType)} 
        columns={tableColumns[dataType]} 
      />
    );
  };

  // 渲染内容区域
  const renderContent = () => {
    if (isLoading) {
      return (
        <div className="spin-container" style={{ textAlign: 'center', marginTop: '100px' }}>
          <Spin size="large" />
          <p style={{ marginTop: '20px' }}>加载数据中...</p>
        </div>
      );
    }

    return (
      <ChartContainer 
        title={getTitle()} 
        viewMode={viewMode}
        onViewModeChange={setViewMode}
      >
        {viewMode === 'chart' ? renderChartContent() : renderTableContent()}
        
        {isUsingSampleData && (
          <Alert
            message="注意"
            description={`API连接失败，显示示例数据以供参考。错误: ${error}`}
            type="warning"
            showIcon
            style={{ marginTop: 20 }}
          />
        )}
      </ChartContainer>
    );
  };

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider 
        width={220} 
        theme="light" 
        collapsible 
        collapsed={collapsed} 
        onCollapse={setCollapsed}
      >
        <div className="logo" style={{ 
          height: '64px', 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'center',
          padding: '0 16px',
          overflow: 'hidden'
        }}>
          {!collapsed ? (
            <h3 style={{ color: '#001529', margin: 0 }}>豆瓣电影分析</h3>
          ) : (
            <PieChartOutlined style={{ fontSize: '24px' }} />
          )}
        </div>
        <Menu
          mode="inline"
          selectedKeys={[selectedKey]}
          defaultOpenKeys={['doubanMovieAnalysis']}
          style={{ height: '100%', borderRight: 0 }}
          onSelect={({ key }) => setSelectedKey(key)}
        >
          <SubMenu key="doubanMovieAnalysis" icon={<PieChartOutlined />} title="豆瓣电影分析">
            <Menu.Item key="actorsRanking" icon={<UserOutlined />}>演员出演排行</Menu.Item>
            <Menu.Item key="directorsRanking" icon={<VideoCameraOutlined />}>导演作品排行</Menu.Item>
            <Menu.Item key="genresBarChart" icon={<BarChartOutlined />}>电影类型柱状图</Menu.Item>
            <Menu.Item key="genresPieChart" icon={<PieChartOutlined />}>电影类型饼图</Menu.Item>
            <Menu.Item key="decadesDistribution" icon={<HistoryOutlined />}>电影年代分布</Menu.Item>
          </SubMenu>
        </Menu>
      </Sider>
      <Layout>
        <Header style={{ 
          background: '#fff', 
          padding: '0 16px', 
          display: 'flex', 
          justifyContent: 'space-between',
          alignItems: 'center',
          boxShadow: '0 1px 4px rgba(0,21,41,.08)'
        }}>
          <div>
            <h2 style={{ margin: 0 }}>豆瓣电影数据可视化</h2>
          </div>
          <div>
            {currentUser && (
              <Dropdown overlay={userMenu} trigger={['click']}>
                <Button type="text">
                  <Space>
                    <Avatar icon={<UserOutlined />} />
                    <Text strong>{currentUser.username}</Text>
                    <DownOutlined />
                  </Space>
                </Button>
              </Dropdown>
            )}
          </div>
        </Header>
        <Content style={{ margin: '24px 16px 0', overflow: 'initial' }}>
          <div style={{ padding: 24, background: '#fff', minHeight: 360, borderRadius: '2px' }}>
            {renderContent()}
          </div>
        </Content>
      </Layout>
    </Layout>
  );
};

export default AntdMovieDashboard;