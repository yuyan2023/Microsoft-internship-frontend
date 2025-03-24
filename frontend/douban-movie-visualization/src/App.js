// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import './App.css';
import AntdMovieDashboard from './components/AntdMovieDashboard';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import ProtectedRoute from './components/auth/ProtectedRoute';
import { AuthProvider } from './contexts/AuthContext';

function App() {
  return (
    <div className="App">
      <AuthProvider>
        <Router>
          <Routes>
            {/* 公共路由 */}
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            
            {/* 受保护的路由 */}
            <Route path="/dashboard" element={
              <ProtectedRoute>
                <AntdMovieDashboard apiBaseUrl="http://localhost:5000" />
              </ProtectedRoute>
            } />
            
            {/* 重定向根路径到仪表板或登录页面 */}
            <Route path="/" element={<Navigate to="/dashboard" replace />} />
            
            {/* 捕获所有其他路由并重定向到仪表板 */}
            <Route path="*" element={<Navigate to="/dashboard" replace />} />
          </Routes>
        </Router>
      </AuthProvider>
    </div>
  );
}

export default App;