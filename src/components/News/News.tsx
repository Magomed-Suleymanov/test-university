import React from 'react';
import { useAppSelector } from '../../store/hooks';
import '../../assets/Styles/News.scss';
import { NavLink } from 'react-router-dom';

const News: React.FC = () => {
  const news = useAppSelector((state) => state.news.list);
  const { loading, error } = useAppSelector((state) => state.news);

  return (
    <div className="container">
      {loading && <h2>Loading...</h2>}
      {error && <h2>An error occured: {error}</h2>}

      {news?.articles.map((item, index) => {
        // Придется использовать индекс, так как нету id
        return (
          <div key={index} className="cardInfo">
            <div className="title">{item.title}</div>
            <div className="date">{item.publishedAt.replace(/[TZ]/g, ' ')}</div>
            <div className="description">{item.description}</div>
            <NavLink className="link" to={`/News/${item.title}`}>
              Full version
            </NavLink>
          </div>
        );
      })}
    </div>
  );
};

export default News;
