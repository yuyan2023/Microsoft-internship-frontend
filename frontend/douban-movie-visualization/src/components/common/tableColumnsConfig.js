
// 电影数据表格的列配置
export const tableColumns = {
    actors: [
      {
        title: '演员',
        dataIndex: 'actor',
        key: 'actor',
        sorter: (a, b) => a.actor.localeCompare(b.actor),
      },
      {
        title: '出演电影数量',
        dataIndex: 'count',
        key: 'count',
        sorter: (a, b) => a.count - b.count,
        defaultSortOrder: 'descend',
      }
    ],
    
    directors: [
      {
        title: '导演',
        dataIndex: 'director',
        key: 'director',
        sorter: (a, b) => a.director.localeCompare(b.director),
      },
      {
        title: '导演电影数量',
        dataIndex: 'count',
        key: 'count',
        sorter: (a, b) => a.count - b.count,
        defaultSortOrder: 'descend',
      }
    ],
    
    genres: [
      {
        title: '电影类型',
        dataIndex: 'genre',
        key: 'genre',
        sorter: (a, b) => a.genre.localeCompare(b.genre),
      },
      {
        title: '电影数量',
        dataIndex: 'count',
        key: 'count',
        sorter: (a, b) => a.count - b.count,
        defaultSortOrder: 'descend',
      }
    ],
    
    decades: [
      {
        title: '年代',
        dataIndex: 'decade',
        key: 'decade',
        sorter: (a, b) => {
          // 从decade字符串中提取年份
          const yearA = parseInt(a.decade);
          const yearB = parseInt(b.decade);
          return yearA - yearB;
        },
      },
      {
        title: '电影数量',
        dataIndex: 'count',
        key: 'count',
        sorter: (a, b) => a.count - b.count,
        defaultSortOrder: 'descend',
      }
    ]
  };
  
  // 准备表格数据的辅助函数
  export const prepareTableData = (data, type) => {
    switch(type) {
      case 'actors':
        return data.actors.map((item, index) => ({
          ...item,
          key: `actor-${index}`
        }));
      case 'directors':
        return data.directors.map((item, index) => ({
          ...item,
          key: `director-${index}`
        }));
      case 'genres':
        return data.genres.map((item, index) => ({
          ...item,
          key: `genre-${index}`
        }));
      case 'decades':
        return data.decades.map((item, index) => ({
          ...item,
          key: `decade-${index}`
        }));
      default:
        return [];
    }
  };