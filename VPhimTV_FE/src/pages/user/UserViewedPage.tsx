import { useQuery } from '@tanstack/react-query';
import dayjs from 'dayjs';
import Hashids from 'hashids';
import { useMemo } from 'react';
import { Link, useSearchParams } from 'react-router-dom';

import Loading from '~/components/Loading';
import Pagination from '~/components/Pagination';
import { fetchHistory } from '~/service/history/historyApi';

function formatDuration(duration_seconds: number): string {
  const hours = Math.floor(duration_seconds / 3600);
  const minutes = Math.floor((duration_seconds % 3600) / 60);

  const parts: string[] = [];
  if (hours > 0) parts.push(`${hours}h`);
  if (minutes > 0) parts.push(`${minutes}p`);

  return parts.join(' ') || '0p';
}

function timeAgo(updatedAt: Date | string) {
  return dayjs(updatedAt).fromNow();
}

function calculateProgressPercent(progress_seconds: number, duration_seconds: number): number {
  if (duration_seconds === 0) return 0;
  return Math.min(100, Math.floor((progress_seconds / duration_seconds) * 100));
}

export default function UserViewedPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const page = Number(searchParams.get('trang')) || 1;
  const limit = 12;

  const appName = import.meta.env.VITE_APP_NAME;
  const hashids = useMemo(() => new Hashids(appName, 6), [appName]);

  const viewedMovies = useQuery({
    queryKey: ['viewedMovies', page, limit],
    queryFn: () => fetchHistory(),
  });

  console.log(viewedMovies.data);

  const handlePageChange = (newPage: number) => {
    setSearchParams((prev) => {
      prev.set('trang', newPage.toString());
      return prev;
    });
  };

  return (
    <div className="rounded-xl bg-base-100 shadow border border-neutral-content/10 p-6 space-y-6 min-h-[460px]">
      <div className="flex items-center justify-between">
        <p className="font-bold text-2xl">Lịch sử xem gần đây</p>

        <button className="btn btn-soft rounded-xl">
          <i className="fa-regular fa-trash-can"></i>
          Xoá tất cả
        </button>
      </div>

      {!viewedMovies.isLoading ? (
        viewedMovies.data?.data.map((item: any) => (
          <div key={item.id} className="rounded-xl bg-base-200 shadow border border-neutral-content/10 p-4">
            <div className="flex gap-6">
              <img loading="lazy" src={item.poster_url} className="w-30" />

              <div className="w-full space-y-3">
                <p className="font-bold text-xl">{item.movie_name}</p>

                <div className="flex items-center gap-4 text-base-content/60">
                  <p className="rounded-xl bg-base-content/10 p-2 px-4">{formatDuration(item.duration_seconds)}</p>
                  <p className="rounded-xl bg-base-content/10 p-2 px-4">Lần cuối xem: {timeAgo(item.updated_at)}</p>
                </div>

                <div className="flex items-center gap-4">
                  <progress
                    className="progress"
                    value={calculateProgressPercent(item.progress_seconds, item.duration_seconds)}
                    max="100"
                  ></progress>
                  <span>{calculateProgressPercent(item.progress_seconds, item.duration_seconds)}%</span>
                </div>

                <div className="flex items-center justify-between">
                  <Link
                    className="btn btn-soft hover:btn-success w-32 rounded-xl"
                    to={`/phim/${item.slug}/${item.episode_slug}-${hashids.encode(item.episode_id)}`}
                  >
                    <i className="fa-regular fa-play"></i>
                    Xem tiếp
                  </Link>

                  <button className="btn btn-soft w-32 rounded-xl">
                    <i className="fa-regular fa-trash-can"></i>
                    Xoá lịch sử
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))
      ) : (
        <Loading type="dots" size="xl" />
      )}

      {viewedMovies.data?.pagination?.totalPage > 10 && (
        <Pagination
          currentPage={page}
          totalPage={viewedMovies.data.pagination.totalPage}
          onPageChange={handlePageChange}
        />
      )}
    </div>
  );
}
