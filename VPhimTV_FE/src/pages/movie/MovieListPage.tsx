import { useQuery } from '@tanstack/react-query';
import { useParams, useSearchParams } from 'react-router-dom';

import BreadCrumb from '~/components/BreadCrumb';
import Pagination from '~/components/Pagination';
import { fetchMovies } from '~/service/movies/moviesApi';
import { MoviesTypeEnum } from '~/service/movies/moviesType';

import MovieContainer from '../home/components/MovieContainer';

export default function MovieListPage() {
  const appName = import.meta.env.VITE_APP_NAME;
  const { typeSlug } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();
  const page = searchParams.get('trang') || 1;

  const handlePageChange = (newPage: number) => {
    setSearchParams((prev) => {
      prev.set('trang', newPage.toString());
      return prev;
    });
  };
  const movieTypeMap = {
    series: 'phim-bo',
    single: 'phim-le',
    hoathinh: 'hoat-hinh',
    tvshows: 'phim-truyen-hinh',
  };
  const reversedMovieTypeMap = Object.fromEntries(Object.entries(movieTypeMap).map(([key, value]) => [value, key]));

  const movies = useQuery({
    queryKey: ['movies', typeSlug, page],
    queryFn: () =>
      fetchMovies({ typeList: reversedMovieTypeMap[typeSlug!] as MoviesTypeEnum, limit: 20, page: Number(page) }),
  });

  const breadCrumbMap = {
    'phim-moi': 'Phim Mới',
    'phim-bo': 'Phim Bộ',
    'phim-le': 'Phim Lẻ',
    'hoat-hinh': 'Phim Hoạt Hình',
    'tv-shows': 'Phim truyền hình',
  };

  return (
    <div className="container mx-auto">
      <div className="space-y-5">
        <BreadCrumb
          className="p-2 bg-base-100 rounded"
          items={[
            {
              label: appName,
              href: '/',
              iconElement: <i className="fa-regular fa-house"></i>,
              className: 'space-x-2',
            },
            { label: breadCrumbMap[typeSlug!] },
          ]}
        />

        {!movies.isLoading && (movies.data as any)?.data.length === 0 ? (
          <p className="text-center">Không tìm thấy phim bạn muốn</p>
        ) : (
          <>
            <MovieContainer
              title=""
              className="space-y-3"
              movies={movies.data?.data ?? []}
              placeholderCount={20}
              primary={false}
            />

            <Pagination
              currentPage={Number(page)}
              totalPage={movies.data?.pagination.total ?? 999}
              onPageChange={handlePageChange}
            />
          </>
        )}
      </div>
    </div>
  );
}
