import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';

import ArtPlayer from '~/components/ArtPlayer';
import BreadCrumb from '~/components/BreadCrumb';
import { fetchMovieInfo, fetchMovies, MovieType } from '~/service/movieAPI';

import MovieContainer from '../home/components/MovieContainer';

export default function Watch() {
  const { slug, episode } = useParams();
  const [movieInfo, setMovieInfo] = useState({} as any);
  const [isLoading, setIsLoading] = useState(true);
  const [currentEpisode, setCurrentEpisode] = useState({} as any);
  const [relatedMovies, setRelatedMovies] = useState([]);

  useEffect(() => {
    (async () => {
      setIsLoading(true);
      const result = await fetchMovieInfo(slug as string);
      console.log(result);

      setMovieInfo(result);
      setIsLoading(false);
    })();
  }, [slug]);

  useEffect(() => {
    setCurrentEpisode(
      movieInfo.episodes
        ?.flatMap((server: any) => server.server_data)
        .find((ep: any) => ep.slug == episode),
    );
  }, [movieInfo, episode]);

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

  if (!isLoading && movieInfo && currentEpisode) {
    return (
      <div className="container mx-auto space-y-8">
        <div className="bg-base-100 rounded">
          <BreadCrumb
            className="text-sm p-3"
            items={[
              {
                label: import.meta.env.VITE_APP_NAME,
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
                href: `/info/${movieInfo?.movie.slug}`,
              },
              {
                label: `Tập ${episode!.split('-')[1]}`,
              },
            ]}
          />

          <ArtPlayer
            url={currentEpisode.link_m3u8}
            poster={movieInfo.movie.poster_url}
            height={650}
          />

          <div className="bg-base-300 rounded p-3 space-y-4">
            <div className="bg-base-100 p-4 space-y-4">
              <p className="font-bold text-primary text-2xl">
                {movieInfo?.movie.name} - Tập {episode!.split('-')[1]}
              </p>

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
      </div>
    );
  }
}
