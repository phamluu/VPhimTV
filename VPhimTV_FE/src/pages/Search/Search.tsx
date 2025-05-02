import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import MovieContainer from '../home/components/MovieContainer';
import { fetchMovies, MovieType } from '../home/Home.API';

export default function Search() {
  const [phim, setPhim] = useState([]);

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
        <div className="breadcrumbs p-2 bg-base-100 rounded">
          <ul className="bg-base-300 rounded p-2">
            <li className="text-primary space-x-2">
              <i className="fa-regular fa-house"></i>
              <Link to={'/'}> VPhimTV</Link>
            </li>
            <li>Tìm kiếm</li>
          </ul>
        </div>

        <p className="text-2xl">Kết quả tìm kiếm: </p>

        <MovieContainer
          title=""
          className="space-y-3"
          movies={phim}
          isLoading={phim.length === 0}
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
