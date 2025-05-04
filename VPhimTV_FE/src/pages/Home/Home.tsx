import { Splide, SplideSlide } from '@splidejs/react-splide';
import { useEffect, useState } from 'react';

import MovieCard from '~/components/MovieCard';
import {
  fetchMovies,
  fetchNewMovies,
  MovieType,
  SortTypeEnum,
} from '~/service/movieAPI';

import MovieContainer from './components/MovieContainer';

export default function Home() {
  const [phimMoi, setPhimMoi] = useState([]);
  const [phimBo, setPhimBo] = useState([]);
  const [phimLe, setPhimLe] = useState([]);
  const [phimHoatHinh, setPhimHoatHinh] = useState([]);

  useEffect(() => {
    (async () => {
      const options = {
        page: 1,
        limit: 12,
        sort_field: 'modified.time',
        sort_type: SortTypeEnum.desc,
      };

      const [getPhimMoi, getPhimBo, getPhimLe, getPhimHoatHinh] =
        await Promise.all([
          fetchNewMovies(),
          fetchMovies({
            type: MovieType.PhimBo,
            ...options,
          }),
          fetchMovies({
            type: MovieType.PhimLe,
            ...options,
          }),
          fetchMovies({
            type: MovieType.HoatHinh,
            ...options,
          }),
        ]);

      setPhimMoi(getPhimMoi);
      setPhimBo(getPhimBo);
      setPhimLe(getPhimLe);
      setPhimHoatHinh(getPhimHoatHinh);
    })();
  }, []);

  return (
    <div className="container mx-auto space-y-8">
      <div className="space-y-3">
        <p className="text-2xl font-bold text-primary">Phim đề cử</p>

        <Splide
          options={{
            perPage: 5,
            gap: '1rem',
            pagination: false,
            arrows: true,
            autoplay: true,
            interval: 6000,
            type: 'loop',
            breakpoints: {
              1024: { perPage: 3 },
              640: { perPage: 2 },
            },
          }}
        >
          {Array.from({ length: 10 }).map((_, i) => (
            <SplideSlide key={i}>
              <MovieCard
                key={i}
                status="Full | Vietsub + Lồng Tiếng"
                title={`404 - Chạy ngay đi - ${i}`}
                image="https://oamarense.com/wp-content/uploads/2025/04/404-chay-ngay-di-15356-poster.webp"
                className="max-h-[137px]"
              />
            </SplideSlide>
          ))}
        </Splide>
      </div>

      <MovieContainer
        title="Phim Mới Cập Nhật"
        className="space-y-3"
        movies={phimMoi}
        linkTo="/list/phim-moi"
      />
      <MovieContainer
        title="Phim Bộ"
        className="space-y-3"
        movies={phimBo}
        linkTo="/list/phim-bo"
      />
      <MovieContainer
        title="Phim Lẻ"
        className="space-y-3"
        movies={phimLe}
        linkTo="/list/phim-le"
      />
      <MovieContainer
        title="Phim Hoạt Hình"
        className="space-y-3"
        movies={phimHoatHinh}
        linkTo="/list/hoat-hinh"
      />
    </div>
  );
}
