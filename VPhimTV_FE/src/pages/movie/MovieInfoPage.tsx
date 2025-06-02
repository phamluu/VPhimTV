import { useQuery } from '@tanstack/react-query';
import Hashids from 'hashids';
import { useMemo } from 'react';
import { Link, useParams } from 'react-router-dom';

import BreadCrumb from '~/components/BreadCrumb';
import Comments from '~/pages/movie/CommentPage';
import { fetchMovieInfo, fetchMovies } from '~/service/movies/moviesApi';
import { movieTypeMap } from '~/utils/classMap';

import MovieContainer from '../home/components/MovieContainer';

export default function MovieInfoPage() {
  const { movieSlug } = useParams();
  const appName = import.meta.env.VITE_APP_NAME;
  const hashids = useMemo(() => new Hashids(appName, 6), [appName]);

  const movieInfo = useQuery({
    queryKey: ['movieInfo', movieSlug],
    queryFn: () => fetchMovieInfo(movieSlug!),
  });
  const relatedMovies = useQuery({
    queryKey: ['relatedMovies', movieSlug],
    queryFn: () =>
      fetchMovies({ limit: 12, country: movieInfo.data?.data.country.slug, year: movieInfo.data?.data.year }),
    enabled: !!movieInfo.data,
  });

  if (!movieInfo.isLoading && movieInfo.data) {
    return (
      <div className="container mx-auto max-w-4xl space-y-8">
        <div className="relative rounded bg-base-100">
          <BreadCrumb
        className="p-3 text-sm"
        items={[
          {
            label: appName,
            href: '/',
            iconElement: <i className="fa-regular fa-house"></i>,
            className: 'space-x-2',
          },
          {
            label: movieInfo.data?.data.type.name,
            href: `/${movieTypeMap[movieInfo.data?.data.type.slug]}`,
          },
          {
            label: movieInfo.data?.data.year,
            href: `/${movieTypeMap[movieInfo.data?.data.type.slug]}/${movieInfo.data?.data.year}`,
          },
          {
            label: movieInfo.data?.data.country.name,
            href: `/${movieTypeMap[movieInfo.data?.data.type.slug]}/${movieInfo.data?.data.year}/${movieInfo.data?.data.country.slug}`,
          },
          {
            label: movieInfo.data?.data.name,
          },
        ]}
          />

          <img className="brightness-75 min-h-[503px]" src={movieInfo.data?.data.thumb_url} />

          <div className="absolute bottom-4 left-4 z-10 flex space-x-4">
        <img src={movieInfo.data?.data.thumb_url} className="w-[250px] object-cover border" />

        <div className="flex flex-col justify-end space-y-3">
          <p className="text-3xl font-bold shadow">
            {movieInfo.data?.data.name} ({movieInfo.data?.data.year})
          </p>
          <p className="text-2xl font-bold shadow">{movieInfo.data?.data.origin_name}</p>
          <div className="flex gap-4">
            <Link className="btn btn-info w-32 font-bold" to={movieInfo.data?.data.trailer_url} target="_blank">
          <i className="fa-brands fa-youtube"></i>
          Trailer
            </Link>
            <Link
          className="btn btn-error w-32 font-bold"
          to={`/phim/${movieInfo.data?.data.slug}/${movieInfo.data?.data.episodes[0].server_data[0].slug}-${hashids.encode(movieInfo.data?.data.episodes[0].server_data[0].id)}`}
            >
          <i className="fa-regular fa-circle-play"></i>
          Xem phim
            </Link>
          </div>
        </div>
          </div>
        </div>

        <div className="rounded bg-base-300 p-3 space-y-4">
          <div className="space-y-4 bg-base-100 p-4">
        <p className="text-xl font-bold text-primary">
          <i className="fa-regular fa-circle-info"></i>
          <span> Thông tin phim</span>
        </p>

        <div className="flex gap-4">
          <div className="space-y-2 flex-1">
            {/* Status */}
            <p className="font-bold">
          <span>Trạng thái: </span>
          <span className="text-info">{movieInfo.data?.data.episode_current}</span>
            </p>

            {/* Country */}
            <p className="font-bold">
          <span>Quốc gia: </span>
          <Link
            className="text-info hover:text-warning"
            to={`/tim-kiem?quoc-gia=${movieInfo.data?.data.country?.slug}`}
          >
            {movieInfo.data?.data.country?.name}
          </Link>
            </p>

            {/* Quantity */}
            <p className="font-bold">
          <span>Chất lượng: </span>
          <span className="text-info">{movieInfo.data?.data.quality}</span>
            </p>

            {/* Year */}
            <p className="font-bold">
          <span>Năm phát hành: </span>
          <Link className="text-info hover:text-warning" to={`/tim-kiem?nam=${movieInfo.data?.data.year}`}>
            {movieInfo.data?.data.year}
          </Link>
            </p>
          </div>

          <div className="space-y-2 flex-1">
            {/* Total Episodes */}
            <p className="font-bold">
          <span>Tổng số tập: </span>
          <span className="text-warning">{movieInfo.data?.data.episode_total}</span>
            </p>
            {/* Duration */}
            <p className="font-bold">
          <span>Thời lượng: </span>
          <span className="text-info">{movieInfo.data?.data.time}</span>
            </p>

            {/* Category */}
            <p className="font-bold">
          <span>Thể loại: </span>
          {movieInfo.data?.data.category.map((item: any, i: number) => (
            <Link
              key={i}
              className="text-info hover:text-warning"
              to={`/tim-kiem?the-loai=${item.slug}&trang=1`}
            >
              {item.name}
              {i < movieInfo.data?.data.category.length - 1 ? ', ' : ''}
            </Link>
          ))}
            </p>
          </div>

          <div className="space-y-2 flex-1">
            {/* Director */}
            <p className="font-bold">
          <span>Đạo diễn: </span>
          <span className="text-info">{movieInfo.data?.data.director}</span>
            </p>

            {/* Actor */}
            <p className="font-bold">
          <span>Diễn viên: </span>
          <span className="text-info">{movieInfo.data?.data.actor}</span>
            </p>
          </div>
        </div>

        <p className="text-xl font-bold text-primary">
          <i className="fa-regular fa-database"></i>
          <span> Nội dung</span>
        </p>

        <p>{movieInfo.data?.data.content}</p>

        <p className="text-xl font-bold text-primary">
          <i className="fa-regular fa-database"></i>
          <span> Danh sách tập</span>
        </p>

        {movieInfo.data?.data.episodes?.map((episode: any, i: number) => (
          <div key={i} className="space-y-2">
            <p className="font-bold">
          SERVER: <span className="text-info">{episode.server_name}</span>
            </p>

            <div className="max-h-[200px] overflow-y-auto">
          <div className="flex flex-wrap gap-2">
            {episode.server_data.map((item: any, j: number) => (
              <Link
            key={j}
            to={`/phim/${movieSlug}/${item.slug}-${hashids.encode(item.id)}`}
            className="btn btn-soft"
              >
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
            movies={relatedMovies.data?.data || []}
            placeholderCount={16}
            primary={false}
            grid={4}
            imageType="poster"
          />
          <Comments />
        </div>
      </div>
    );
  }
}
