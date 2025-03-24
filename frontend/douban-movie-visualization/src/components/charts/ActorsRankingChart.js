
import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const ActorsRankingChart = ({ data = [], height = 500 }) => {
  return (
    <ResponsiveContainer width="100%" height={height}>
      <BarChart 
        data={data.slice(0, 20)}
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
  );
};

export default ActorsRankingChart;