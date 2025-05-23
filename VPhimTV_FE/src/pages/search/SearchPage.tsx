import { useQuery } from '@tanstack/react-query';
import { useSearchParams } from 'react-router-dom';

import BreadCrumb from '~/components/BreadCrumb';
import Pagination from '~/components/Pagination';
import Select from '~/components/Select';
import { fetchCategory } from '~/service/category/categoryApi';
import { fetchCountry } from '~/service/movieAPI';
import { fetchMovies } from '~/service/movies/moviesApi';
import { SortTypeEnum } from '~/service/movies/moviesType';

import MovieContainer from '../home/components/MovieContainer';

export default function SearchPage() {
  const appName = import.meta.env.VITE_APP_NAME;
  const [searchParams, setSearchParams] = useSearchParams();

  const keyword = searchParams.get('q') || undefined;
  const category = searchParams.get('category') || '';
  const country = searchParams.get('country') || '';
  const year = searchParams.get('year') || '';
  const language = searchParams.get('language') || '';
  const sortType = (searchParams.get('sort') || 'desc') as SortTypeEnum;
  const page = Number(searchParams.get('page')) || 1;

  const handlePageChange = (newPage: number) => {
    setSearchParams((prev) => {
      prev.set('page', newPage.toString());
      return prev;
    });
  };

  const handleFilterChange = (key: string, value: string) => {
    setSearchParams((prev) => {
      prev.set(key, value);
      return prev;
    });
  };

  const categoryList = useQuery({ queryKey: ['categoryList'], queryFn: () => fetchCategory() });
  const countryList = useQuery({ queryKey: ['countryList'], queryFn: () => fetchCountry() });
  const searchMovies = useQuery({
    queryKey: ['searchMovies', keyword, category, country, year, language, sortType],
    queryFn: () =>
      fetchMovies({
        limit: 20,
        page,
        sortType,
        language,
        year,
        category,
        country,
        keyword,
      }),
  });

  return (
    <div className="container mx-auto">
      <div className="space-y-5">
        {/* BreadCrumb */}
        <BreadCrumb
          className="p-2 bg-base-100 rounded"
          items={[
            {
              label: appName,
              href: '/',
              iconElement: <i className="fa-regular fa-house"></i>,
              className: 'space-x-2',
            },
            { label: 'Tìm kiếm' },
          ]}
        />

        <p className="text-2xl">Kết quả tìm kiếm: </p>

        <div className="flex justify-end gap-3">
          <Select
            className="w-32"
            placeholder="Thể Loại"
            options={[{ label: 'Tất cả', value: '' }].concat(
              categoryList.data?.map((item: any) => ({
                label: item.name,
                value: item.slug,
              })),
            )}
            defaultOption={category}
            onChange={(value) => handleFilterChange('category', value)}
          />

          <Select
            className="w-32"
            placeholder="Quốc Gia"
            options={[{ label: 'Tất cả', value: '' }].concat(
              countryList.data?.map((item: any) => ({
                label: item.name,
                value: item.slug,
              })),
            )}
            defaultOption={country}
            onChange={(value) => handleFilterChange('country', value)}
          />

          <Select
            className="w-32"
            placeholder="Năm"
            options={[{ label: 'Tất cả', value: '' }].concat(
              Array.from({ length: 2025 - 2017 + 1 }, (_, i) => {
                const year = 2025 - i;
                return { label: String(year), value: String(year) };
              }),
            )}
            defaultOption={year}
            onChange={(value) => handleFilterChange('year', value)}
          />

          <Select
            className="w-32"
            placeholder="Ngôn ngữ"
            options={[
              { label: 'Tất cả', value: '' },
              { label: 'Vietsub', value: 'vietsub' },
              { label: 'Thuyết Minh', value: 'thuyet-minh' },
              { label: 'Lồng Tiếng', value: 'long-tieng' },
            ]}
            defaultOption={language}
            onChange={(value) => handleFilterChange('language', value)}
          />

          <Select
            className="w-32"
            placeholder="Xếp theo"
            options={[
              { label: 'Tăng dần', value: 'asc' },
              { label: 'Giảm dần', value: 'desc' },
            ]}
            defaultOption={sortType}
            onChange={(value) => handleFilterChange('sort', value)}
          />
        </div>

        {!searchMovies.isLoading && (searchMovies.data as any)?.data.length === 0 ? (
          <p className="text-center">Không tìm thấy phim</p>
        ) : (
          <>
            <MovieContainer
              title=""
              className="space-y-3"
              movies={searchMovies.data?.data ?? []}
              placeholderCount={20}
              primary={false}
            />

            <Pagination
              currentPage={Number(page)}
              totalPage={searchMovies.data?.total ?? 999}
              onPageChange={handlePageChange}
            />
          </>
        )}
      </div>
    </div>
  );
}
