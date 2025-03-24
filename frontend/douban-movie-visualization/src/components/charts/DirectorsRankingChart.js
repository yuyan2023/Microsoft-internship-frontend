
import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const DirectorsRankingChart = ({ data = [], height = 500 }) => {
  return (
    <ResponsiveContainer width="100%" height={height}>
      <BarChart 
        data={data.slice(0, 15)}
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
  );
};

export default DirectorsRankingChart;