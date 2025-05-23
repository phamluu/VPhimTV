import axios from 'axios';

import { MovieQueryParams } from './moviesType';

const MOVIE_API = import.meta.env.VITE_APP_API;

export const fetchMovies = async (options: MovieQueryParams) => {
  const {
    limit = 10,
    page = 1,
    sortField = 'updated_at',
    sortType = 'desc',
    typeList,
    language,
    category,
    country,
    year,
    keyword,
  } = options;
  const url = `${MOVIE_API}/movies`;

  try {
    const params = new URLSearchParams();
    params.append('page', page.toString());
    params.append('limit', limit.toString());
    params.append('sort_field', sortField);
    params.append('sort_type', sortType);
    if (typeList) params.append('type_list', typeList);
    if (language) params.append('sort_lang', language);
    if (category) params.append('category', category);
    if (country) params.append('country', country);
    if (year) params.append('year', year);
    if (keyword) params.append('keyword', keyword);

    const response = await axios.get(url, { params });
    return response.data;
  } catch (error) {
    console.error('Error fetching movies:', error);
    throw error;
  }
};

export const fetchMovieInfo = async (slug: string) => {
  const url = `${MOVIE_API}/movies/${slug}`;

  try {
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    console.error('Error fetching movie info:', error);
    throw error;
  }
};
