import { AxiosResponse } from 'axios';

import http from '~/configs/httpService';

import { MovieQueryParams } from './moviesType';

const baseUrl = 'api/movie';

export const fetchMovies = async (options: MovieQueryParams, random = false) => {
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

  let res: AxiosResponse;

  if (random) {
    res = await http.get(`${baseUrl}/hot`, { params });
  } else {
    res = await http.get(baseUrl, { params });
  }

  return res.data;
};

export const fetchMovieInfo = async (slug: string) => {
  const response = await http.get(`${baseUrl}/${slug}`);
  return response.data;
};
