import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';

import BreadCrumb from '~/components/BreadCrumb';
import { fetchMovieInfo, fetchMovies, MovieType } from '~/service/movieAPI';

import MovieContainer from '../home/components/MovieContainer';

export default function Info() {
  const { slug } = useParams();
  const appName = import.meta.env.VITE_APP_NAME;
  const [movieInfo, setMovieInfo] = useState({} as any);
  const [isLoading, setIsLoading] = useState(true);
  const [relatedMovies, setRelatedMovies] = useState([]);

  useEffect(() => {
    (async () => {
      setIsLoading(true);
      const result = await fetchMovieInfo(slug as string);
      setMovieInfo(result);
      setIsLoading(false);
    })();
  }, [slug]);

  useEffect(() => {
    (async () => {
      const movies = await fetchMovies({
        type: MovieType.PhimVietSub,
        page: 1,
        limit: 16,
        country: movieInfo?.movie?.country[0]?.slug,
        year: movieInfo?.movie?.year,
      });
      setRelatedMovies(movies);
    })();
  }, [movieInfo]);

  if (!isLoading && movieInfo) {
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
                label:
                  movieInfo?.movie.type == 'series' ? 'Phim Bộ' : 'Phim Lẻ',
                href: `/${movieInfo?.movie.type}`,
              },
              {
                label: movieInfo?.movie.year,
                href: `/${movieInfo?.movie.type}/${movieInfo?.movie.year}`,
              },
              {
                label: movieInfo?.movie.country[0].name,
                href: `/${movieInfo?.movie.type}/${movieInfo?.movie.year}/${movieInfo?.movie.country[0].slug}`,
              },
              {
                label: movieInfo?.movie.name,
              },
            ]}
          />

          <img
            className="min-h-[503px] brightness-75"
            src={movieInfo?.movie?.thumb_url}
          />

          <div className="absolute bottom-4 left-4 z-10 flex space-x-4">
            <img
              src={movieInfo?.movie?.thumb_url}
              className="w-[250px] object-cover border"
            />

            <div className="flex flex-col justify-end space-y-3">
              <p className="text-3xl font-bold shadow">
                {movieInfo?.movie?.name} ({movieInfo?.movie?.year})
              </p>
              <p className="text-2xl font-bold shadow">
                {movieInfo?.movie?.origin_name}
              </p>
              <div className="flex gap-4">
                <Link
                  className="btn btn-info w-32 font-bold"
                  to={movieInfo?.movie?.trailer_url}
                  target="_blank"
                >
                  <i className="fa-brands fa-youtube"></i>
                  Trailer
                </Link>
                <Link
                  className="btn btn-error w-32 font-bold"
                  to={`/watch/${movieInfo?.movie?.slug}`}
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
                  <span className="text-info">
                    {movieInfo?.movie?.episode_current}
                  </span>
                </p>

                {/* Country */}
                <p className="font-bold">
                  <span>Quốc gia: </span>
                  <span className="text-info">
                    {movieInfo?.movie?.country[0]?.name}
                  </span>
                </p>

                {/* Quantity */}
                <p className="font-bold">
                  <span>Chất lượng: </span>
                  <span className="text-info">{movieInfo?.movie?.quality}</span>
                </p>

                {/* Year */}
                <p className="font-bold">
                  <span>Năm phát hành: </span>
                  <span className="text-info">{movieInfo?.movie?.year}</span>
                </p>
              </div>

              <div className="flex-1/3 space-y-2">
                {/* Total Episodes */}
                <p className="font-bold">
                  <span>Tổng số tập: </span>
                  <span className="text-warning">
                    {movieInfo?.movie?.episode_total}
                  </span>
                </p>

                {/* Duration */}
                <p className="font-bold">
                  <span>Thời lượng: </span>
                  <span className="text-info">{movieInfo?.movie?.time}</span>
                </p>

                {/* Category */}
                <p className="font-bold">
                  <span>Thể loại: </span>
                  {movieInfo?.movie?.category.map((item: any, i: number) => (
                    <Link
                      key={i}
                      className="text-info hover:text-warning"
                      to={`/search?category=${item.slug}&page=1`}
                    >
                      {item.name}
                      {i < movieInfo?.movie?.category.length - 1 ? ', ' : ''}
                    </Link>
                  ))}
                </p>
              </div>

              <div className="flex-1/3 space-y-2">
                {/* Director */}
                <p className="font-bold">
                  <span>Đạo diễn: </span>
                  {movieInfo?.movie?.director.map((item: any, i: number) => (
                    <span key={i} className="text-info">
                      {item}
                      {i < movieInfo?.movie?.director.length - 1 ? ', ' : ''}
                    </span>
                  ))}
                </p>

                {/* Actor */}
                <p className="font-bold">
                  <span>Diễn viên: </span>
                  {movieInfo?.movie?.actor.map((item: any, i: number) => (
                    <span key={i} className="text-info">
                      {item}
                      {i < movieInfo?.movie?.actor.length - 1 ? ', ' : ''}
                    </span>
                  ))}
                </p>
              </div>
            </div>

            <p className="font-bold text-primary text-xl">
              <i className="fa-regular fa-database"></i>
              <span> Nội dung</span>
            </p>

            <p>{movieInfo?.movie.content}</p>

            <p className="font-bold text-primary text-xl">
              <i className="fa-regular fa-database"></i>
              <span> Danh sách tập</span>
            </p>

            {movieInfo?.episodes?.map((episode: any, i: number) => (
              <div key={i} className="space-y-2">
                <p className="font-bold">
                  SERVER:{' '}
                  <span className="text-info">{episode.server_name}</span>
                </p>

                <div className="overflow-y-auto max-h-[200px]">
                  <div className="flex flex-wrap gap-2">
                    {episode.server_data.map((item: any, j: number) => (
                      <Link
                        key={j}
                        to={`/watch/${slug}/${item.slug}`}
                        className="btn btn-soft"
                      >
                        {item.name}
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
            movies={relatedMovies}
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
