
import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Cell } from 'recharts';

// 定义常用的颜色集
const CHART_COLORS = [
  '#1f77b4', '#ff7f0e', '#2ca02c', '#d62728', '#9467bd', 
  '#8c564b', '#e377c2', '#7f7f7f', '#bcbd22', '#17becf',
  '#aec7e8', '#ffbb78', '#98df8a', '#ff9896', '#c5b0d5'
];

const GenresBarChart = ({ data = [], height = 400 }) => {
  return (
    <ResponsiveContainer width="100%" height={height}>
      <BarChart 
        data={data.slice(0, 10)}
        margin={{ top: 20, right: 30, left: 20, bottom: 80 }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="genre" angle={-45} textAnchor="end" height={80} />
        <YAxis />
        <Tooltip formatter={(value) => [`${value} 部电影`, '电影数量']} />
        <Legend />
        <Bar dataKey="count" name="电影数量">
          {data.slice(0, 10).map((entry, index) => (
            <Cell key={`cell-${index}`} fill={CHART_COLORS[index % CHART_COLORS.length]} />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
};

export default GenresBarChart;