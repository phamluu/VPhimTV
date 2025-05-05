import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

import BreadCrumb from '~/components/BreadCrumb';
import Pagination from '~/components/Pagination';
import Select from '~/components/Select';
import {
  fetchCategory,
  fetchCountry,
  fetchMovies,
  fetchSearchMovies,
  MovieType,
  SortLangEnum,
  SortTypeEnum,
} from '~/service/movieAPI';

import MovieContainer from '../home/components/MovieContainer';

export default function Search() {
  const appName = import.meta.env.VITE_APP_NAME;
  const [phim, setPhim] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const [totalPage, setTotalPage] = useState(1);
  const [categoryList, setCategoryList] = useState([]);
  const [countryList, setCountryList] = useState([]);

  const query = searchParams.get('q');
  const category = searchParams.get('category') || '';
  const country = searchParams.get('country') || '';
  const year = searchParams.get('year') || '';
  const lang = searchParams.get('language') || '';
  const sort = searchParams.get('sort') || 'desc';
  const page = searchParams.get('page') || 1;

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

  useEffect(() => {
    (async () => {
      let movies = [];
      let totalPages = 999;

      const options = {
        page: Number(page),
        limit: 20,
        sort_field: 'modified.time',
        sort_type: sort as SortTypeEnum,
        sort_lang: lang as SortLangEnum,
        year: year,
        category,
        country,
      };

      if (query) {
        const result = await fetchSearchMovies(
          {
            keyword: query,
            ...options,
          },
          true,
        );

        movies = result.items;
        totalPages = result.totalPages;
      } else {
        movies = await fetchMovies({
          type: MovieType.PhimBo,
          ...options,
        });
      }

      setPhim(movies);
      setTotalPage(totalPages);
    })();
  }, [page, query, category, country, year, lang, sort]);

  useEffect(() => {
    (async () => {
      const [categoryResult, countryResult] = await Promise.all([
        fetchCategory(),
        fetchCountry(),
      ]);

      setCategoryList(categoryResult);
      setCountryList(countryResult);
    })();
  }, []);

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
            options={categoryList.map((item: any) => ({
              label: item.name,
              value: item.slug,
            }))}
            defaultOption={category}
            onChange={(value) => handleFilterChange('category', value)}
          />

          <Select
            className="w-32"
            placeholder="Quốc Gia"
            options={countryList.map((item: any) => ({
              label: item.name,
              value: item.slug,
            }))}
            defaultOption={country}
            onChange={(value) => handleFilterChange('country', value)}
          />

          <Select
            className="w-32"
            placeholder="Năm"
            options={Array.from({ length: 2025 - 2017 + 1 }, (_, i) => {
              const year = 2025 - i;
              return { label: String(year), value: String(year) };
            })}
            defaultOption={year}
            onChange={(value) => handleFilterChange('year', value)}
          />

          <Select
            className="w-32"
            placeholder="Ngôn ngữ"
            options={[
              { label: 'Vietsub', value: 'vietsub' },
              { label: 'Thuyết Minh', value: 'thuyet-minh' },
              { label: 'Lồng Tiếng', value: 'long-tieng' },
            ]}
            defaultOption={lang}
            onChange={(value) => handleFilterChange('language', value)}
          />

          <Select
            className="w-32"
            placeholder="Xếp theo"
            options={[
              { label: 'Tăng dần', value: 'asc' },
              { label: 'Giảm dần', value: 'desc' },
            ]}
            defaultOption={sort}
            onChange={(value) => handleFilterChange('sort', value)}
          />
        </div>

        <MovieContainer
          title=""
          className="space-y-3"
          movies={phim}
          placeholderCount={20}
          primary={false}
        />

        <Pagination
          currentPage={Number(page)}
          totalPage={totalPage}
          onPageChange={handlePageChange}
        />
      </div>
    </div>
  );
}
