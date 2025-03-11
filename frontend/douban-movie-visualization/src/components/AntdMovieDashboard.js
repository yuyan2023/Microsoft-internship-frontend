// 文件: src/components/AntdMovieDashboard.js
import React, { useState } from 'react';
import { Layout, Menu, Spin, Alert } from 'antd';
import { 
  UserOutlined, 
  VideoCameraOutlined, 
  FundOutlined,
  HistoryOutlined 
} from '@ant-design/icons';
import { BarChart, PieChart, Pie, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Cell } from 'recharts';
import useMovieData from '../hooks/useMovieData';

// 样式导入
import 'antd/dist/reset.css';

const { Header, Content, Sider } = Layout;

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
  const [selectedKey, setSelectedKey] = useState('actors');

  // 渲染选中的内容
  const renderContent = () => {
    if (isLoading) {
      return (
        <div className="spin-container" style={{ textAlign: 'center', marginTop: '100px' }}>
          <Spin size="large" />
          <p style={{ marginTop: '20px' }}>加载数据中...</p>
        </div>
      );
    }

    switch (selectedKey) {
      case 'actors':
        return (
          <div className="chart-container">
            <h2>出演次数最多的演员 (Top 20)</h2>
            <ResponsiveContainer width="100%" height={500}>
              <BarChart 
                data={data.actors.slice(0, 20)}
                layout="vertical"
                margin={{ top: 20, right: 30, left: 100, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis type="number" />
                <YAxis type="category" dataKey="actor" width={100} />
                <Tooltip formatter={(value) => [`${value} 部电影`, '出演数量']} />
                <Legend />
                <Bar dataKey="count" name="出演电影数" fill="#8884d8" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        );
      
      case 'directors':
        return (
          <div className="chart-container">
            <h2>出现次数最多的导演 (Top 15)</h2>
            <ResponsiveContainer width="100%" height={500}>
              <BarChart 
                data={data.directors.slice(0, 15)}
                layout="vertical"
                margin={{ top: 20, right: 30, left: 100, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis type="number" />
                <YAxis type="category" dataKey="director" width={100} />
                <Tooltip formatter={(value) => [`${value} 部电影`, '导演数量']} />
                <Legend />
                <Bar dataKey="count" name="导演电影数" fill="#82ca9d" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        );
      
      case 'genres':
        return (
          <div className="chart-container">
            <h2>各类型电影数量分布</h2>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
              <ResponsiveContainer width="100%" height={400}>
                <BarChart 
                  data={data.genres.slice(0, 10)}
                  margin={{ top: 20, right: 30, left: 20, bottom: 80 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="genre" angle={-45} textAnchor="end" height={80} />
                  <YAxis />
                  <Tooltip formatter={(value) => [`${value} 部电影`, '电影数量']} />
                  <Legend />
                  <Bar dataKey="count" name="电影数量">
                    {data.genres.slice(0, 10).map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={CHART_COLORS[index % CHART_COLORS.length]} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
              <ResponsiveContainer width="100%" height={400}>
                <PieChart>
                  <Pie
                    data={data.genres.slice(0, 10)}
                    cx="50%"
                    cy="50%"
                    labelLine={true}
                    outerRadius={150}
                    fill="#8884d8"
                    dataKey="count"
                    nameKey="genre"
                    label={({ genre, percent }) => `${genre}: ${(percent * 100).toFixed(1)}%`}
                  >
                    {data.genres.slice(0, 10).map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={CHART_COLORS[index % CHART_COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value, name, props) => [`${value} 部电影`, props.payload.genre]} />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
        );
      
      case 'decades':
        return (
          <div className="chart-container">
            <h2>电影年代分布</h2>
            <ResponsiveContainer width="100%" height={400}>
              <BarChart
                data={data.decades}
                margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="decade" />
                <YAxis />
                <Tooltip formatter={(value) => [`${value} 部电影`, '数量']} />
                <Legend />
                <Bar dataKey="count" name="电影数量">
                  {data.decades.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={CHART_COLORS[index % CHART_COLORS.length]} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        );
      
      default:
        return null;
    }
  };

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider width={200} theme="light">
        <div className="logo" style={{ height: '64px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <h3 style={{ color: '#001529', margin: 0 }}>豆瓣电影分析</h3>
        </div>
        <Menu
          mode="inline"
          selectedKeys={[selectedKey]}
          style={{ height: '100%' }}
          onSelect={({ key }) => setSelectedKey(key)}
        >
          <Menu.Item key="actors" icon={<UserOutlined />}>
            演员排行
          </Menu.Item>
          <Menu.Item key="directors" icon={<VideoCameraOutlined />}>
            导演排行
          </Menu.Item>
          <Menu.Item key="genres" icon={<FundOutlined />}>
            电影类型
          </Menu.Item>
          <Menu.Item key="decades" icon={<HistoryOutlined />}>
            年代分布
          </Menu.Item>
        </Menu>
      </Sider>
      <Layout>
        <Header style={{ background: '#fff', padding: 0, paddingLeft: 16 }}>
          <h2>豆瓣电影数据可视化</h2>
        </Header>
        <Content style={{ margin: '24px 16px 0', overflow: 'initial' }}>
          <div style={{ padding: 24, background: '#fff', minHeight: 360 }}>
            {renderContent()}
            
            {/* 如果使用的是示例数据，显示提示 */}
            {isUsingSampleData && (
              <Alert
                message="注意"
                description={`API连接失败，显示示例数据以供参考。错误: ${error}`}
                type="warning"
                showIcon
                style={{ marginTop: 20 }}
              />
            )}
          </div>
        </Content>
      </Layout>
    </Layout>
  );
};

export default AntdMovieDashboard;