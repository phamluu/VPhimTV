export enum SortTypeEnum {
  asc = 'asc',
  desc = 'desc',
}

export enum MoviesTypeEnum {
  series = 'series',
  single = 'single',
  hoathinh = 'hoathinh',
  tvshows = 'tvshows',
}

export interface MovieQueryParams {
  limit?: number;
  page?: number;
  sortField?: string;
  sortType?: SortTypeEnum;
  typeList?: MoviesTypeEnum;
  language?: string;
  category?: string;
  country?: string;
  year?: string;
  keyword?: string;
}
