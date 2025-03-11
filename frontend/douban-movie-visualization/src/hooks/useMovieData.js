// 文件: src/hooks/useMovieData.js
import { useState, useEffect } from 'react';

// 示例数据 - 当API不可用时使用
const sampleData = {
  actors: [
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
  ],
  directors: [
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
  ],
  genres: [
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
  ],
  decades: [
    { decade: "1980s", count: 35 },
    { decade: "1990s", count: 78 },
    { decade: "2000s", count: 102 },
    { decade: "2010s", count: 130 },
    { decade: "2020s", count: 24 }
  ]
};

const useMovieData = (apiBaseUrl = 'http://localhost:5000', useSampleOnError = true) => {
  const [data, setData] = useState({
    actors: [],
    directors: [],
    genres: [],
    decades: []
  });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isUsingSampleData, setIsUsingSampleData] = useState(false);

  useEffect(() => {
    const fetchAllData = async () => {
      setIsLoading(true);
      setError(null);
      setIsUsingSampleData(false);
      
      try {
        // 并行请求所有数据
        const [actorsRes, directorsRes, genresRes, decadesRes] = await Promise.all([
          fetch(`${apiBaseUrl}/top_actors?limit=20`),
          fetch(`${apiBaseUrl}/top_directors?limit=15`),
          fetch(`${apiBaseUrl}/genre_counts`),
          fetch(`${apiBaseUrl}/decade_distribution`)
        ]);

        // 检查响应状态
        if (!actorsRes.ok || !directorsRes.ok || !genresRes.ok || !decadesRes.ok) {
          throw new Error('一个或多个API请求失败');
        }

        // 解析响应数据
        const [actors, directors, genres, decades] = await Promise.all([
          actorsRes.json(),
          directorsRes.json(),
          genresRes.json(),
          decadesRes.json()
        ]);

        // 更新状态
        setData({ actors, directors, genres, decades });
      } catch (err) {
        setError(err.message);
        
        // 如果配置为在错误时使用示例数据
        if (useSampleOnError) {
          setData(sampleData);
          setIsUsingSampleData(true);
        }
      } finally {
        setIsLoading(false);
      }
    };

    fetchAllData();
  }, [apiBaseUrl, useSampleOnError]);

  return { data, isLoading, error, isUsingSampleData };
};

export default useMovieData;