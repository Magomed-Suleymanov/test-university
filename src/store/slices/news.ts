import { createSlice, PayloadAction, createAsyncThunk, AnyAction } from '@reduxjs/toolkit';
import { NewsState, News } from '../../utils/types'


export const fetchNews = createAsyncThunk<News, undefined, {rejectValue: string}>(
    'news/fetchNews',
    async function (_, { rejectWithValue }) {
      const response = await fetch('https://newsapi.org/v2/top-headlines?country=us&category=science&apiKey=28d0f6274146423b8162ac4fea5912cf');

      if (!response.ok) {
        return rejectWithValue('Server Error!');
      }

      const data = await response.json();

      return data;
    }
);

// Не смог реализовать удаление с сервера по причине того, что api не поддерживает эту возможность при бесплатном приобретенит.
// Поэтому сделал локальное удаление

export const deleteItem = createAsyncThunk<string, string, { rejectValue: string }>(
  'todos/deleteTodo',
  async function (title) {
   return title;
  }
);

const initialState: NewsState = {
  list: {
    status: '',
    articles: [] ,
    totalResults: 0
  },
  loading: false,
  error: null,
}

const newsSlice = createSlice({
  name: 'news',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchNews.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchNews.fulfilled, (state, action) => {
        state.list = action.payload;
        state.loading = false;
      })
      .addCase(deleteItem.fulfilled, (state, action) => {
        state.list.articles = state.list.articles.filter((item: { title: string; }) => item.title !== action.payload);
      })
      .addMatcher(isError, (state, action: PayloadAction<string>) => {
        state.error = action.payload;
        state.loading = false;
      });
  }
});

export default newsSlice.reducer;

function isError(action: AnyAction) {
  return action.type.endsWith('rejected');
}