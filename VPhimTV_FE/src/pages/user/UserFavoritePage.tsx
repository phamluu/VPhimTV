import { useQuery } from '@tanstack/react-query';

import { fetchMovies } from '~/service/movies/moviesApi';

export default function UserFavoritePage() {
  const { data } = useQuery({
    queryKey: ['movies'],
    queryFn: () => fetchMovies({}),
  });

  return (
    <div className="rounded-xl bg-base-100 shadow border border-neutral-content/10 p-6 space-y-6 min-h-[460px]">
      <div className="flex items-center justify-between">
        <p className="font-bold text-2xl">Danh sách yêu thích</p>

        <p className="rounded-xl bg-base-content/10 p-2">10 phim</p>
      </div>

      <div className="grid grid-cols-4 gap-4">
        <div className="relative shadow rounded-xl group">
          <img
            src="https://phimimg.com/upload/vod/20250525-1/ee79000b91e915195428528c9ebbfe57.jpg"
            className="rounded-xl"
          />

          <button className="btn btn-soft btn-error opacity-40 hover:opacity-80 btn-sm rounded-full absolute top-2 right-2">
            <i className="fa-regular fa-trash-can"></i>
          </button>

          <a className="btn btn-soft rounded-2xl absolute left-1/2 top-1/2 !-translate-x-1/2 -translate-y-1/2 truncate opacity-0 group-hover:opacity-100 scale-90 group-hover:scale-100 transition-all duration-300 ease-in-out pointer-events-none group-hover:pointer-events-auto">
            <i className="fa-regular fa-play"></i>
            Xem ngay
          </a>

          <p className="absolute bottom-0 left-0 p-2 bg-base-300/75 w-full overflow-hidden text-ellipsis whitespace-nowrap group-hover:whitespace-normal group-hover:text-clip transition-all duration-500 ease-in-out max-h-[2.5rem] group-hover:max-h-[6rem]">
            Lắm Chuyện (Phần 2) Lắm Chuyện (Phần 2)
          </p>
        </div>
      </div>
    </div>
  );
}
