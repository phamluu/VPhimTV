import axios from 'axios';

const MOVIE_API = import.meta.env.VITE_APP_API;

interface CategoryQueryParams {
  sortField?: string;
  sortType?: string;
}

export const fetchCategory = async (options?: CategoryQueryParams) => {
  const url = `${MOVIE_API}/category`;

  try {
    const result = await axios.get(url, { params: options });
    return result.data;
  } catch (error) {
    console.error('Error fetching categories:', error);
    throw error;
  }
};
