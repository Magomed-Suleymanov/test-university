export type Articles = {
  title: string;
  author: string;
  description: string;
  url: string;
  publishedAt: string;
  content: string;
};

export type News = {
  status: string;
  articles: Articles[];
  totalResults: number;
};

export type NewsState = {
  list: News;
  loading: boolean;
  error: string | null;
};
