import axios from 'axios';

const MOVIE_API = import.meta.env.VITE_APP_API;

interface MoviesOptions {
  limit?: number;
  page?: number;
  sortField?: string;
  sortType?: 'asc' | 'desc';
  typeList?: 'series' | 'single' | 'hoathinh' | 'tvshows';
  sortLang?: string;
  category?: string;
  country?: string;
  year?: string;
}

export const fetchMovies = async (options: MoviesOptions) => {
  const {
    limit = 10,
    page = 1,
    sortField = 'updated_at',
    sortType = 'desc',
    typeList,
    sortLang,
    category,
    country,
    year,
  } = options;
  const url = `${MOVIE_API}/movies`;

  try {
    const params = new URLSearchParams();
    params.append('page', page.toString());
    params.append('limit', limit.toString());
    params.append('sort_field', sortField);
    params.append('sort_type', sortType);
    if (typeList) params.append('type_list', typeList);
    if (sortLang) params.append('sort_lang', sortLang);
    if (category) params.append('category', category);
    if (country) params.append('country', country);
    if (year) params.append('year', year);

    console.log(url, params.toString());

    const response = await axios.get(url, { params });
    const data = response.data;

    return data;
  } catch (error) {
    console.error('Error fetching movies:', error);
    throw error;
  }
};
