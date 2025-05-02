import { useEffect, useState } from 'react';

import BreadCrumb from '~/components/BreadCrumb';
import { fetchMovies, MovieType } from '~/service/movieAPI';

import MovieContainer from '../home/components/MovieContainer';

export default function Search() {
  const [phim, setPhim] = useState([]);
  const appName = import.meta.env.VITE_APP_NAME;

  useEffect(() => {
    (async () => {
      const movies = await fetchMovies({
        type: MovieType.PhimBo,
        page: 1,
        limit: 12,
        sort_field: 'modified.time',
        sort_type: 'desc',
      });

      setPhim(movies);
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

        <MovieContainer
          title=""
          className="space-y-3"
          movies={phim}
          placeholderCount={15}
          primary={false}
        />

        <div className="w-full join justify-center">
          <button className="join-item btn hidden">◀</button>
          <button className="join-item btn">1</button>
          <button className="join-item btn">2</button>
          <button className="join-item btn btn-disabled">...</button>
          <button className="join-item btn">99</button>
          <button className="join-item btn">100</button>
          <button className="join-item btn">▶</button>
        </div>
      </div>
    </div>
  );
}
