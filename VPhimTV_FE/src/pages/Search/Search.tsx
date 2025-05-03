import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

import BreadCrumb from '~/components/BreadCrumb';
import Pagination from '~/components/Pagination';
import { fetchMovies, fetchSearchMovies, MovieType } from '~/service/movieAPI';

import MovieContainer from '../home/components/MovieContainer';

export default function Search() {
  const appName = import.meta.env.VITE_APP_NAME;
  const [phim, setPhim] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const [totalPage, setTotalPage] = useState(1);
  const query = searchParams.get('q');
  const page = searchParams.get('page') || 1;

  const handlePageChange = (newPage: number) => {
    setSearchParams((prev) => {
      prev.set('page', newPage.toString());
      return prev;
    });
  };

  useEffect(() => {
    (async () => {
      let movies = [];
      let totalPage = 0;

      const options = {
        page: Number(page),
        limit: 15,
        sort_field: 'modified.time',
        sort_type: 'desc' as const,
      };

      if (query) {
        [movies, totalPage] = await fetchSearchMovies({
          keyword: query,
          ...options,
        });
      } else {
        movies = await fetchMovies({
          type: MovieType.PhimBo,
          ...options,
        });
      }

      setPhim(movies);
      setTotalPage(totalPage);
    })();
  }, [page, query]);

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

        <MovieContainer
          title=""
          className="space-y-3"
          movies={phim}
          placeholderCount={15}
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
