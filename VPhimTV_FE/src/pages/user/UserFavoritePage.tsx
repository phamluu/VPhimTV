import { useMutation, useQuery } from '@tanstack/react-query';
import { Link, useSearchParams } from 'react-router-dom';

import Pagination from '~/components/Pagination';
import { toast } from '~/hooks/utils/toast';
import { deleteFavorite, fetchFavorites } from '~/service/favorite/favoriteApi';

export default function UserFavoritePage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const page = Number(searchParams.get('trang')) || 1;
  const limit = 10;

  const handlePageChange = (newPage: number) => {
    setSearchParams((prev) => {
      prev.set('trang', newPage.toString());
      return prev;
    });
  };

  const favorites = useQuery({
    queryKey: ['favorites', page, limit],
    queryFn: () => fetchFavorites(page, limit),
  });

  const mutationDeleteFavorite = useMutation({
    mutationKey: ['deleteFavorite'],
    mutationFn: (movieId: number) => deleteFavorite(movieId),
    onSuccess: () => {
      favorites.refetch();
      toast({ type: 'success', message: 'Đã xóa khỏi danh sách yêu thích' });
    },
  });

  return (
    <div className="rounded-xl bg-base-100 shadow border border-neutral-content/10 p-6 space-y-6 min-h-[460px]">
      <div className="flex items-center justify-between">
        <p className="font-bold text-2xl">Danh sách yêu thích</p>

        <p className="rounded-xl bg-base-content/10 p-2">{favorites.data?.pagination.total || 0} phim</p>
      </div>

      <div className="grid grid-cols-4 gap-4">
        {!favorites.isLoading &&
          favorites.data?.data.map((item: any, idx: any) => (
            <div className="relative shadow rounded-xl group" key={idx}>
              <img loading="lazy" src={item.poster_url} className="rounded-xl" />

              <button
                className="btn btn-soft btn-error opacity-40 hover:opacity-80 btn-sm rounded-full absolute top-2 right-2"
                onClick={() => mutationDeleteFavorite.mutate(item.id)}
              >
                <i className="fa-regular fa-trash-can"></i>
              </button>

              <Link
                className="btn btn-soft rounded-2xl absolute left-1/2 top-1/2 !-translate-x-1/2 -translate-y-1/2 truncate opacity-0 group-hover:opacity-100 scale-90 group-hover:scale-100 transition-all duration-300 ease-in-out pointer-events-none group-hover:pointer-events-auto"
                to={`/phim/${item.slug}`}
              >
                <i className="fa-regular fa-play"></i>
                Xem ngay
              </Link>

              <p className="absolute bottom-0 left-0 p-2 bg-base-300/75 w-full overflow-hidden text-ellipsis whitespace-nowrap group-hover:whitespace-normal group-hover:text-clip transition-all duration-500 ease-in-out max-h-[2.5rem] group-hover:max-h-[6rem]">
                {item.name}
              </p>
            </div>
          ))}
      </div>

      {!favorites.isLoading && favorites.data?.pagination?.totalPage > 10 && (
        <Pagination
          currentPage={page}
          totalPage={favorites.data.pagination.totalPage}
          onPageChange={handlePageChange}
        />
      )}
    </div>
  );
}
