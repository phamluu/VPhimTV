import { useQuery } from '@tanstack/react-query';
import Hashids from 'hashids';
import { useEffect, useMemo, useState } from 'react';
import { Link, useParams } from 'react-router-dom';

import ArtPlayer from '~/components/ArtPlayer';
import BreadCrumb from '~/components/BreadCrumb';
import { fetchMovieInfo, fetchMovies } from '~/service/movies/moviesApi';
import { movieTypeMap } from '~/utils/classMap';

import MovieContainer from '../home/components/MovieContainer';
import Comments from './CommentPage';

export default function MovieWatchPage() {
  const { movieSlug, episodeSlug } = useParams();
  const [currentEpisode, setCurrentEpisode] = useState<any>();
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

  useEffect(() => {
    if (movieInfo.data && episodeSlug) {
      const slugParts = episodeSlug.split('-');
      const decodedId = hashids.decode(slugParts[slugParts.length - 1])[0];

      if (decodedId) {
        setCurrentEpisode(
          movieInfo.data?.data.episodes?.flatMap((server: any) => server.server_data).find((ep: any) => ep.id === decodedId),
        );
      }
    }
  }, [episodeSlug, hashids, movieInfo.data]);

  if (!movieInfo.isLoading && movieInfo.data && currentEpisode) {
    return (
      <div className="container mx-auto space-y-8">
        <div className="bg-base-100 rounded">
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
                label: movieInfo.data?.data.type.name,
                href: `/${movieTypeMap[movieInfo.data?.data.type.slug]}`,
              },
              {
                label: movieInfo.data?.data.year,
                href: `/${movieTypeMap[movieInfo.data?.data.type.slug]}/${movieInfo.data?.data.year}`,
              },
              {
                label: movieInfo.data?.data.country.name,
                href: `/${movieTypeMap[movieInfo.data?.data.type.slug]}/${movieInfo.data?.data.year}/${
                  movieInfo.data?.data.country.slug
                }`,
              },
              {
                label: movieInfo.data?.data.name,
                href: `/phim/${movieInfo.data?.data.slug}`,
              },
              {
                label:
                  currentEpisode?.episode_name === 'Full'
                    ? `Tập ${currentEpisode?.episode_name}`
                    : currentEpisode?.episode_name,
              },
            ]}
          />

          {currentEpisode && (
            <ArtPlayer url={currentEpisode.link_m3u8} poster={movieInfo.data?.data.poster_url} height={650} />
          )}

          <div className="bg-base-300 rounded p-3 space-y-4">
            <div className="bg-base-100 p-4 space-y-4">
              <p className="font-bold text-primary text-2xl">
                {movieInfo.data?.data.name} - Tập {episodeSlug!.split('-')[1]}
              </p>

              <p className="font-bold text-primary text-xl">
                <i className="fa-regular fa-database"></i>
                <span> Danh sách tập</span>
              </p>

              {movieInfo.data?.data.episodes?.map((episode: any, i: number) => (
                <div key={i} className="space-y-2">
                  <p className="font-bold">
                    SERVER: <span className="text-info">{episode.server_name}</span>
                  </p>

                  <div className="overflow-y-auto max-h-[200px]">
                    <div className="flex flex-wrap gap-2">
                      {episode.server_data.map((item: any, j: number) => (
                        <Link
                          key={j}
                          to={`/phim/${movieSlug}/${item.slug}-${hashids.encode(item.id)}`}
                          className={`btn btn-soft ${currentEpisode?.id === item.id ? 'btn-active' : ''}`}
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
      </div>
    );
  }
}
