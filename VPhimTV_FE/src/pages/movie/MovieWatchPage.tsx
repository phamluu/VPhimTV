import { useMutation, useQuery } from '@tanstack/react-query';
import Hashids from 'hashids';
import { useEffect, useMemo, useRef, useState } from 'react';
import { Link, useParams } from 'react-router-dom';

import ArtPlayer from '~/components/ArtPlayer';
import BreadCrumb from '~/components/BreadCrumb';
import { useAuth } from '~/hooks/useAuth';
import Comments from '~/pages/movie/CommentPage';
import { addHistory } from '~/service/history/historyApi';
import { fetchMovieInfo, fetchMovies } from '~/service/movies/moviesApi';
import { addView } from '~/service/view/viewApi';
import { movieTypeMap } from '~/utils/classMap';

import MovieContainer from '../home/components/MovieContainer';

export default function MovieWatchPage() {
  const { movieSlug, episodeSlug } = useParams();
  const [currentEpisode, setCurrentEpisode] = useState<any>();
  const appName = import.meta.env.VITE_APP_NAME;
  const hashids = useMemo(() => new Hashids(appName, 6), [appName]);
  const lastSavedTimeRef = useRef(0);
  const { user } = useAuth();

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
          movieInfo.data?.data.episodes
            ?.flatMap((server: any) => server.server_data)
            .find((ep: any) => ep.id === decodedId),
        );
      }
    }
  }, [episodeSlug, hashids, movieInfo.data]);

  const mutationAddHistory = useMutation({
    mutationFn: (data: { movie_id: number; episode_id: number; progress_seconds: number; duration_seconds: number }) =>
      addHistory(data),
    onSuccess: () => console.log('Updated history'),
    onError: (error) => console.log('Error updating history:', error),
  });

  const mutationAddView = useMutation({
    mutationFn: (episode_id: number) => addView(episode_id),
    onSuccess: () => console.log('Added view history'),
    onError: (error) => console.log('Error adding view history:', error),
  });

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
                href: `/danh-sach/${movieTypeMap[movieInfo.data?.data.type.slug]}`,
              },
              {
                label: movieInfo.data?.data.year,
                href: `/tim-kiem?&nam=${movieInfo.data?.data.year}`,
              },
              {
                label: movieInfo.data?.data.country.name,
                href: `/tim-kiem?&nam=${movieInfo.data?.data.year}&quoc-gia=${movieInfo.data?.data.country.slug}`,
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
            <ArtPlayer
              url={currentEpisode.link_mp4 ? currentEpisode.link_mp4 : currentEpisode.link_m3u8}
              poster={movieInfo.data?.data.poster_url}
              height={650}
              on={{
                'video:timeupdate': (event: Event) => {
                  // If not logged in, do not save history
                  if (!user) return;

                  const video = event.target as HTMLVideoElement;
                  const currentTime = video.currentTime;
                  const duration = video.duration;

                  if (currentTime - lastSavedTimeRef.current >= 300 || lastSavedTimeRef.current === 0) {
                    lastSavedTimeRef.current = currentTime;

                    mutationAddHistory.mutate({
                      movie_id: movieInfo.data?.data.id,
                      episode_id: currentEpisode.id,
                      progress_seconds: Math.floor(currentTime),
                      duration_seconds: Math.floor(duration),
                    });
                  }
                },
                'video:ended': () => {
                  mutationAddHistory.mutate({
                    movie_id: movieInfo.data?.data.id,
                    episode_id: currentEpisode.id,
                    progress_seconds: Math.floor(currentEpisode.duration_seconds),
                    duration_seconds: Math.floor(currentEpisode.duration_seconds),
                  });
                },
              }}
              once={{
                'video:play': () => {
                  // Add view count
                  console.log('Adding view for episode:', currentEpisode.id);
                  mutationAddView.mutate(currentEpisode.id);
                },
              }}
            />
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
            <Comments movieId={1} />
          </div>
        </div>
      </div>
    );
  }
}
