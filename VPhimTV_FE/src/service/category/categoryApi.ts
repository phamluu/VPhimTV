import http from '~/configs/httpService';

interface CategoryQueryParams {
  sortField?: string;
  sortType?: string;
}

const baseUrl = 'api/category';

export const fetchCategory = async (options?: CategoryQueryParams) => {
  const result = await http.get(baseUrl, { params: options });
  return result.data;
};
