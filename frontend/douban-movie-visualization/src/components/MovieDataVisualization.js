import React, { useState, useEffect } from 'react';
import { LineChart, BarChart, PieChart, Pie, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Cell } from 'recharts';
import DecadeChart from './DecadeChart';

const API_BASE_URL = 'http://localhost:5000';

const MovieDataVisualization = () => {
  const [topActors, setTopActors] = useState([]);
  const [topDirectors, setTopDirectors] = useState([]);
  const [genreCounts, setGenreCounts] = useState([]);
  const [decadeData, setDecadeData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const COLORS = [
    '#1f77b4', '#ff7f0e', '#2ca02c', '#d62728', '#9467bd', 
    '#8c564b', '#e377c2', '#7f7f7f', '#bcbd22', '#17becf',
    '#aec7e8', '#ffbb78', '#98df8a', '#ff9896', '#c5b0d5'
  ];

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        // 获取前20名演员数据
        const actorsResponse = await fetch(`${API_BASE_URL}/top_actors?limit=20`);
        const actorsData = await actorsResponse.json();
        setTopActors(actorsData);

        // 获取前15名导演数据
        const directorsResponse = await fetch(`${API_BASE_URL}/top_directors?limit=15`);
        const directorsData = await directorsResponse.json();
        setTopDirectors(directorsData);

        // 获取电影类型分布
        const genresResponse = await fetch(`${API_BASE_URL}/genre_counts`);
        const genresData = await genresResponse.json();
        setGenreCounts(genresData);
        
        // 获取电影年代分布
        const decadeResponse = await fetch(`${API_BASE_URL}/decade_distribution`);
        const decadeData = await decadeResponse.json();
        setDecadeData(decadeData);

        setIsLoading(false);
      } catch (err) {
        setError(err.message);
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  // 使用示例数据进行演示（如果API尚未实现）
  useEffect(() => {
    if (topActors.length === 0) {
      const sampleActors = [
        { actor: "周星驰", count: 8 },
        { actor: "汤姆·汉克斯", count: 7 },
        { actor: "莱昂纳多·迪卡普里奥", count: 6 },
        { actor: "梁朝伟", count: 6 },
        { actor: "张国荣", count: 5 },
        { actor: "马特·达蒙", count: 5 },
        { actor: "黄渤", count: 4 },
        { actor: "刘德华", count: 4 },
        { actor: "姜文", count: 3 },
        { actor: "宫崎骏", count: 3 }
      ];
      setTopActors(sampleActors);
    }
    
    if (topDirectors.length === 0) {
      const sampleDirectors = [
        { director: "克里斯托弗·诺兰", count: 7 },
        { director: "史蒂文·斯皮尔伯格", count: 6 },
        { director: "王家卫", count: 5 },
        { director: "宫崎骏", count: 5 },
        { director: "李安", count: 4 },
        { director: "张艺谋", count: 4 },
        { director: "姜文", count: 3 },
        { director: "徐克", count: 3 },
        { director: "昆汀·塔伦蒂诺", count: 2 },
        { director: "大卫·芬奇", count: 2 }
      ];
      setTopDirectors(sampleDirectors);
    }
    
    if (genreCounts.length === 0) {
      const sampleGenres = [
        { genre: "剧情", count: 120 },
        { genre: "喜剧", count: 78 },
        { genre: "动作", count: 65 },
        { genre: "科幻", count: 43 },
        { genre: "爱情", count: 42 },
        { genre: "动画", count: 36 },
        { genre: "悬疑", count: 32 },
        { genre: "惊悚", count: 29 },
        { genre: "奇幻", count: 25 },
        { genre: "犯罪", count: 24 }
      ];
      setGenreCounts(sampleGenres);
    }
  }, [topActors.length, topDirectors.length, genreCounts.length]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-xl text-gray-600">加载数据中...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-xl text-red-600">加载数据出错: {error}</div>
      </div>
    );
  }

  // 处理图表数据
  const actorsData = topActors.slice(0, 20);
  const directorsData = topDirectors.slice(0, 15);
  const genresData = genreCounts.slice(0, 10);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-8 text-center">豆瓣电影数据可视化</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* 出演次数最多的演员 */}
        <div className="bg-white p-4 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">出演次数最多的演员 (Top 20)</h2>
          <ResponsiveContainer width="100%" height={400}>
            <BarChart 
              data={actorsData}
              layout="vertical"
              margin={{ top: 5, right: 30, left: 100, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis type="number" />
              <YAxis type="category" dataKey="actor" width={100} />
              <Tooltip formatter={(value) => [`${value} 部电影`, '出演数量']} />
              <Legend />
              <Bar dataKey="count" fill="#8884d8" name="出演电影数" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* 出现次数最多的导演 */}
        <div className="bg-white p-4 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">出现次数最多的导演 (Top 15)</h2>
          <ResponsiveContainer width="100%" height={400}>
            <BarChart 
              data={directorsData}
              layout="vertical"
              margin={{ top: 5, right: 30, left: 100, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis type="number" />
              <YAxis type="category" dataKey="director" width={100} />
              <Tooltip formatter={(value) => [`${value} 部电影`, '导演数量']} />
              <Legend />
              <Bar dataKey="count" fill="#82ca9d" name="导演电影数" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* 各类型电影数量 */}
        <div className="bg-white p-4 rounded-lg shadow lg:col-span-2">
          <h2 className="text-xl font-semibold mb-4">各类型电影数量分布</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <ResponsiveContainer width="100%" height={400}>
              <BarChart 
                data={genresData}
                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="genre" angle={-45} textAnchor="end" height={80} />
                <YAxis />
                <Tooltip formatter={(value) => [`${value} 部电影`, '电影数量']} />
                <Legend />
                <Bar dataKey="count" name="电影数量">
                  {genresData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
            <ResponsiveContainer width="100%" height={400}>
              <PieChart>
                <Pie
                  data={genresData}
                  cx="50%"
                  cy="50%"
                  labelLine={true}
                  outerRadius={150}
                  fill="#8884d8"
                  dataKey="count"
                  nameKey="genre"
                  label={({ genre, percent }) => `${genre}: ${(percent * 100).toFixed(1)}%`}
                >
                  {genresData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip formatter={(value, name, props) => [`${value} 部电影`, props.payload.genre]} />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
      
      {/* 电影年代分布 */}
      <div className="mt-8">
        <DecadeChart data={decadeData} />
      </div>
    </div>
  );
};

export default MovieDataVisualization;