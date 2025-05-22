import axios from 'axios';

const MOVIE_API = import.meta.env.VITE_APP_API;

interface CountryQueryParams {
  sortField?: string;
  sortType?: string;
}

export const fetchCountry = async (options?: CountryQueryParams) => {
  const url = `${MOVIE_API}/country`;

  try {
    const result = await axios.get(url, { params: options });
    return result.data;
  } catch (error) {
    console.error('Error fetching categories:', error);
    throw error;
  }
};
