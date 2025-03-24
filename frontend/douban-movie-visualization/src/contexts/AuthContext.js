// src/contexts/AuthContext.js
import React, { createContext, useState, useEffect, useContext } from 'react';
import { message } from 'antd';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // 初始化时检查用户是否已登录
  useEffect(() => {
    const checkLoginStatus = async () => {
      // 检查本地存储
      const savedUser = localStorage.getItem('user');
      if (savedUser) {
        try {
          const userData = JSON.parse(savedUser);
          if (userData.isLoggedIn) {
            // 验证会话是否有效
            const response = await fetch('http://localhost:5000/api/user/current', {
              method: 'GET',
              credentials: 'include'
            });
            
            const data = await response.json();
            
            if (data.success) {
              setCurrentUser({
                id: data.user.id,
                username: data.user.username,
                email: data.user.email,
                isLoggedIn: true
              });
            } else {
              // 会话无效，清除本地存储
              localStorage.removeItem('user');
              setCurrentUser(null);
            }
          }
        } catch (error) {
          console.error('检查登录状态错误:', error);
          localStorage.removeItem('user');
          setCurrentUser(null);
        }
      }
      setLoading(false);
    };

    checkLoginStatus();
  }, []);

  // 登录函数
  const login = async (username, password) => {
    try {
      const response = await fetch('http://localhost:5000/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
        credentials: 'include'
      });

      const data = await response.json();
      
      if (data.success) {
        const user = {
          id: data.user_id,
          username: data.username,
          isLoggedIn: true
        };
        
        localStorage.setItem('user', JSON.stringify(user));
        setCurrentUser(user);
        message.success('登录成功！');
        return { success: true };
      } else {
        message.error(data.message || '登录失败，请检查用户名和密码');
        return { success: false, message: data.message };
      }
    } catch (error) {
      console.error('登录错误:', error);
      message.error('登录请求失败，请检查网络连接');
      return { success: false, message: '网络错误' };
    }
  };

  // 登出函数
  const logout = async () => {
    try {
      await fetch('http://localhost:5000/api/logout', {
        method: 'POST',
        credentials: 'include'
      });
      
      // 清除本地存储和状态
      localStorage.removeItem('user');
      setCurrentUser(null);
      message.success('已成功登出');
      return true;
    } catch (error) {
      console.error('登出错误:', error);
      message.error('登出失败，请稍后再试');
      return false;
    }
  };

  // 注册函数
  const register = async (username, email, password) => {
    try {
      const response = await fetch('http://localhost:5000/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, email, password }),
        credentials: 'include'
      });

      const data = await response.json();
      
      if (data.success) {
        message.success('注册成功！请登录');
        return { success: true };
      } else {
        message.error(data.message || '注册失败，请稍后再试');
        return { success: false, message: data.message };
      }
    } catch (error) {
      console.error('注册错误:', error);
      message.error('注册请求失败，请检查网络连接');
      return { success: false, message: '网络错误' };
    }
  };

  const value = {
    currentUser,
    loading,
    login,
    logout,
    register
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};