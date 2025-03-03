import React from 'react';
import './App.css';
import MovieDataVisualization from './components/MovieDataVisualization';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>豆瓣电影数据可视化</h1>
      </header>
      <main>
        <MovieDataVisualization />
      </main>
    </div>
  );
}

export default App;