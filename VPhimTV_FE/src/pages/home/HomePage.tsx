import { Splide, SplideSlide } from '@splidejs/react-splide';
import { useQueries } from '@tanstack/react-query';

import MovieCard from '~/components/MovieCard';
import { fetchMovies } from '~/service/movies/moviesApi';
import { MoviesTypeEnum } from '~/service/movies/moviesType';

import MovieContainer from './components/MovieContainer';

export default function HomePage() {
  const limit = 12;

  const [newMovies, seriesMovies, singleMovies, animeMovies, tvShowsMovies] = useQueries({
    queries: [
      { queryKey: ['newMovies'], queryFn: () => fetchMovies({ limit }) },
      { queryKey: ['seriesMovies'], queryFn: () => fetchMovies({ limit, typeList: MoviesTypeEnum.series }) },
      { queryKey: ['singleMovies'], queryFn: () => fetchMovies({ limit, typeList: MoviesTypeEnum.single }) },
      { queryKey: ['animeMovies'], queryFn: () => fetchMovies({ limit, typeList: MoviesTypeEnum.hoathinh }) },
      { queryKey: ['tvShowsMovies'], queryFn: () => fetchMovies({ limit, typeList: MoviesTypeEnum.tvshows }) },
    ],
  });

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
        movies={newMovies.data?.data ?? []}
        linkTo={`/danh-sach/phim-moi`}
      />
      <MovieContainer
        title="Phim Bộ"
        className="space-y-3"
        movies={seriesMovies.data?.data ?? []}
        linkTo={`/danh-sach/${MoviesTypeEnum.series}`}
      />
      <MovieContainer
        title="Phim Lẻ"
        className="space-y-3"
        movies={singleMovies.data?.data ?? []}
        linkTo={`/danh-sach/${MoviesTypeEnum.single}`}
      />
      <MovieContainer
        title="Phim Hoạt Hình"
        className="space-y-3"
        movies={animeMovies.data?.data ?? []}
        linkTo={`/danh-sach/${MoviesTypeEnum.hoathinh}`}
      />
      <MovieContainer
        title="TV Shows"
        className="space-y-3"
        movies={tvShowsMovies.data?.data ?? []}
        linkTo={`/danh-sach/${MoviesTypeEnum.tvshows}`}
      />
    </div>
  );
}
