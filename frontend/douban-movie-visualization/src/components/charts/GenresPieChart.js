
import React from 'react';
import { PieChart, Pie, Tooltip, Legend, ResponsiveContainer, Cell } from 'recharts';

// 定义常用的颜色集
const CHART_COLORS = [
  '#1f77b4', '#ff7f0e', '#2ca02c', '#d62728', '#9467bd', 
  '#8c564b', '#e377c2', '#7f7f7f', '#bcbd22', '#17becf',
  '#aec7e8', '#ffbb78', '#98df8a', '#ff9896', '#c5b0d5'
];

const GenresPieChart = ({ data = [], height = 400 }) => {
  return (
    <ResponsiveContainer width="100%" height={height}>
      <PieChart>
        <Pie
          data={data.slice(0, 10)}
          cx="50%"
          cy="50%"
          labelLine={true}
          outerRadius={150}
          fill="#8884d8"
          dataKey="count"
          nameKey="genre"
          label={({ genre, percent }) => `${genre}: ${(percent * 100).toFixed(1)}%`}
        >
          {data.slice(0, 10).map((entry, index) => (
            <Cell key={`cell-${index}`} fill={CHART_COLORS[index % CHART_COLORS.length]} />
          ))}
        </Pie>
        <Tooltip formatter={(value, name, props) => [`${value} 部电影`, props.payload.genre]} />
        <Legend />
      </PieChart>
    </ResponsiveContainer>
  );
};

export default GenresPieChart;