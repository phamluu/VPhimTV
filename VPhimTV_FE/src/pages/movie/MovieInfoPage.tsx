import { useQuery } from '@tanstack/react-query';
import { Link, useParams } from 'react-router-dom';

import BreadCrumb from '~/components/BreadCrumb';
import { fetchMovieInfo, fetchMovies } from '~/service/movies/moviesApi';

import MovieContainer from '../home/components/MovieContainer';

export default function MovieInfoPage() {
  const { movieSlug } = useParams();
  const appName = import.meta.env.VITE_APP_NAME;

  const movieInfo = useQuery({
    queryKey: ['movieInfo', movieSlug],
    queryFn: () => fetchMovieInfo(movieSlug!),
  });
  const relatedMovies = useQuery({
    queryKey: ['relatedMovies', movieSlug],
    queryFn: () =>
      fetchMovies({ limit: 12, country: movieInfo.data?.country.slug, year: movieInfo.data?.category[0].slug }),
  });

  const movieTypeMap = {
    series: 'phim-bo',
    single: 'phim-le',
    hoathinhh: 'phim-hoat-hinh',
    tvshows: 'phim-truyen-hinh',
  };

  if (!movieInfo.isLoading && movieInfo.data) {
    return (
      <div className="container mx-auto space-y-8 max-w-4xl">
        <div className="bg-base-100 rounded relative">
          <BreadCrumb
            className="text-sm p-3"
            items={[
              {
                label: appName,
                href: '/',
                iconElement: <i className="fa-regular fa-house"></i>,
                className: 'space-x-2',
              },
              {
                label: movieInfo.data?.type.name,
                href: `/${movieTypeMap[movieInfo.data?.type.slug]}`,
              },
              {
                label: movieInfo.data?.year,
                href: `/${movieTypeMap[movieInfo.data?.type.slug]}/${movieInfo.data?.year}`,
              },
              {
                label: movieInfo.data?.country.name,
                href: `/${movieTypeMap[movieInfo.data?.type.slug]}/${movieInfo.data?.year}/${
                  movieInfo.data?.country.slug
                }`,
              },
              {
                label: movieInfo.data?.name,
              },
            ]}
          />

          <img className="min-h-[503px] brightness-75" src={movieInfo?.data?.thumb_url} />

          <div className="absolute bottom-4 left-4 z-10 flex space-x-4">
            <img src={movieInfo?.data?.thumb_url} className="w-[250px] object-cover border" />

            <div className="flex flex-col justify-end space-y-3">
              <p className="text-3xl font-bold shadow">
                {movieInfo?.data?.name} ({movieInfo?.data?.year})
              </p>
              <p className="text-2xl font-bold shadow">{movieInfo?.data?.origin_name}</p>
              <div className="flex gap-4">
                <Link className="btn btn-info w-32 font-bold" to={movieInfo?.data?.trailer_url} target="_blank">
                  <i className="fa-brands fa-youtube"></i>
                  Trailer
                </Link>
                <Link
                  className="btn btn-error w-32 font-bold"
                  to={`/phim/${movieInfo?.data?.slug}/${movieInfo.data?.episodes[0].server_data[0].slug}`}
                >
                  <i className="fa-regular fa-circle-play"></i>
                  Xem phim
                </Link>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-base-300 rounded p-3 space-y-4">
          <div className="bg-base-100 p-4 space-y-4">
            <p className="font-bold text-primary text-xl">
              <i className="fa-regular fa-circle-info"></i>
              <span> Thông tin phim</span>
            </p>

            <div className="flex gap-4">
              <div className="flex-1/3 space-y-2">
                {/* Status */}
                <p className="font-bold">
                  <span>Trạng thái: </span>
                  <span className="text-info">{movieInfo?.data?.episode_current}</span>
                </p>

                {/* Country */}
                <p className="font-bold">
                  <span>Quốc gia: </span>
                  <span className="text-info">{movieInfo?.data?.country?.name}</span>
                </p>

                {/* Quantity */}
                <p className="font-bold">
                  <span>Chất lượng: </span>
                  <span className="text-info">{movieInfo?.data?.quality}</span>
                </p>

                {/* Year */}
                <p className="font-bold">
                  <span>Năm phát hành: </span>
                  <span className="text-info">{movieInfo?.data?.year}</span>
                </p>
              </div>

              <div className="flex-1/3 space-y-2">
                {/* Total Episodes */}
                <p className="font-bold">
                  <span>Tổng số tập: </span>
                  <span className="text-warning">{movieInfo?.data?.episode_total}</span>
                </p>

                {/* Duration */}
                <p className="font-bold">
                  <span>Thời lượng: </span>
                  <span className="text-info">{movieInfo?.data?.time}</span>
                </p>

                {/* Category */}
                <p className="font-bold">
                  <span>Thể loại: </span>
                  {movieInfo?.data?.category.map((item: any, i: number) => (
                    <Link
                      key={i}
                      className="text-info hover:text-warning"
                      to={`/tim-kiem?the-loai=${item.slug}&trang=1`}
                    >
                      {item.name}
                      {i < movieInfo?.data?.category.length - 1 ? ', ' : ''}
                    </Link>
                  ))}
                </p>
              </div>

              <div className="flex-1/3 space-y-2">
                {/* Director */}
                <p className="font-bold">
                  <span>Đạo diễn: </span>
                  <span className="text-info">{movieInfo?.data?.director}</span>
                </p>

                {/* Actor */}
                <p className="font-bold">
                  <span>Diễn viên: </span>
                  <span className="text-info">{movieInfo?.data?.actor}</span>
                </p>
              </div>
            </div>

            <p className="font-bold text-primary text-xl">
              <i className="fa-regular fa-database"></i>
              <span> Nội dung</span>
            </p>

            <p>{movieInfo.data?.content}</p>

            <p className="font-bold text-primary text-xl">
              <i className="fa-regular fa-database"></i>
              <span> Danh sách tập</span>
            </p>

            {movieInfo.data?.episodes?.map((episode: any, i: number) => (
              <div key={i} className="space-y-2">
                <p className="font-bold">
                  SERVER: <span className="text-info">{episode.server_name}</span>
                </p>

                <div className="overflow-y-auto max-h-[200px]">
                  <div className="flex flex-wrap gap-2">
                    {episode.server_data.map((item: any, j: number) => (
                      <Link key={j} to={`/phim/${movieSlug}/${item.slug}`} className="btn btn-soft">
                        {item.episode_name}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>

          <p className="font-bold text-xl mt-6 mb-6">Có thể bạn thích:</p>

          <MovieContainer
            className="space-y-3"
            movies={relatedMovies.data?.data ?? []}
            placeholderCount={16}
            primary={false}
            grid={4}
            imageType="poster"
          />
        </div>
      </div>
    );
  }
}
