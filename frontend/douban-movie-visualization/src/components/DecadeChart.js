import React, { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const DecadeChart = () => {
  const [decadeData, setDecadeData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const response = await fetch('http://localhost:5000/decade_distribution');
        const data = await response.json();
        setDecadeData(data);
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
    if (decadeData.length === 0) {
      const sampleData = [
        { decade: "1940s", count: 5 },
        { decade: "1950s", count: 10 },
        { decade: "1960s", count: 15 },
        { decade: "1970s", count: 22 },
        { decade: "1980s", count: 35 },
        { decade: "1990s", count: 78 },
        { decade: "2000s", count: 102 },
        { decade: "2010s", count: 130 },
        { decade: "2020s", count: 24 }
      ];
      setDecadeData(sampleData);
      setIsLoading(false);
    }
  }, [decadeData.length]);

  if (isLoading) {
    return <div className="text-center p-4">加载中...</div>;
  }

  if (error) {
    return <div className="text-center p-4 text-red-500">加载出错: {error}</div>;
  }

  return (
    <div className="bg-white p-4 rounded-lg shadow">
      <h2 className="text-xl font-semibold mb-4">电影年代分布</h2>
      <ResponsiveContainer width="100%" height={400}>
        <BarChart
          data={decadeData}
          margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="decade" />
          <YAxis />
          <Tooltip formatter={(value) => [`${value} 部电影`, '数量']} />
          <Legend />
          <Bar dataKey="count" fill="#8884d8" name="电影数量" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default DecadeChart;