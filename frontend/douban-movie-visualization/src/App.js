// 文件: src/App.js
import React from 'react';
import './App.css';
import AntdMovieDashboard from './components/AntdMovieDashboard';

// 确保导入Ant Design样式
import 'antd/dist/reset.css';

function App() {
  return (
    <div className="App">
      <AntdMovieDashboard apiBaseUrl="http://localhost:5000" />
    </div>
  );
}

export default App;