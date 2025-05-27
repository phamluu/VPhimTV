import http from '~/configs/httpService';

interface CountryQueryParams {
  sortField?: string;
  sortType?: string;
}

const baseUrl = 'api/country';

export const fetchCountry = async (options?: CountryQueryParams) => {
  const result = await http.get(baseUrl, { params: options });
  return result.data;
};
