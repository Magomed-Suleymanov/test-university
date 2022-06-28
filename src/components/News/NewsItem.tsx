import React from 'react';
import { useParams } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { deleteItem } from '../../store/slices/news';
import '../../assets/Styles/NewsItem.scss';

const NewsItem: React.FC = () => {
  const news = useAppSelector((state) => state.news.list);
  const dispatch = useAppDispatch();

  const { title } = useParams();
  const history = createBrowserHistory();

  const deleteNews = () => {
    if (title) {
      history.back();
      dispatch(deleteItem(title));
    }
  };

  return (
    <div>
      {news.articles.map((item, index) => {
        if (item.title === title)
          return (
            // Опять используем index потому что нет индивидуального ключа (id)
            <div className="itemWrap" key={index}>
              <h2>{item.title}</h2>
              <div className="itemDate">
                {item.publishedAt.replace(/[TZ]/g, ' ')}
              </div>
              <div className="itemContent">{item.content}</div>
              <button onClick={deleteNews}>Delete</button>
            </div>
          );
        return null;
      })}
    </div>
  );
};

export default NewsItem;
