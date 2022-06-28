import React from 'react';
import { Route, Routes } from 'react-router-dom';
import NewsItem from '../News/NewsItem';
import News from '../News/News';
import { useEffect } from 'react';
import { useAppDispatch } from '../../store/hooks';
import { fetchNews } from '../../store/slices/news';
import '../../assets/Styles/App.scss';

const App: React.FC = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchNews());
  }, [dispatch]);

  return (
    <div className="app">
      <Routes>
        <Route path="/" element={<News />} />
        <Route path="/News/:title" element={<NewsItem />} />
      </Routes>
    </div>
  );
};

export default App;
