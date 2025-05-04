import { useEffect, useState } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';

import BreadCrumb from '~/components/BreadCrumb';
import Pagination from '~/components/Pagination';
import {
  fetchMovies,
  fetchNewMovies,
  MovieType,
  MovieTypeMap,
  SortTypeEnum,
} from '~/service/movieAPI';

import MovieContainer from '../home/components/MovieContainer';

export default function List() {
  const appName = import.meta.env.VITE_APP_NAME;
  const { slug } = useParams();
  const [phim, setPhim] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const [totalPage, setTotalPage] = useState(1);
  const page = searchParams.get('page') || 1;

  useEffect(() => {
    (async () => {
      let result: { items: any; totalPages: number };
      if (slug === 'phim-moi') {
        result = await fetchNewMovies(Number(page), 20, true);
      } else {
        result = await fetchMovies(
          {
            type: slug as MovieType,
            page: Number(page),
            limit: 20,
            sort_field: 'modified.time',
            sort_type: SortTypeEnum.desc,
          },
          true,
        );
      }

      setPhim(result.items);
      setTotalPage(result.totalPages);
    })();
  }, [page, slug]);

  const handlePageChange = (newPage: number) => {
    setSearchParams((prev) => {
      prev.set('page', newPage.toString());
      return prev;
    });
  };

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
            { label: MovieTypeMap[slug as string] },
          ]}
        />

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
