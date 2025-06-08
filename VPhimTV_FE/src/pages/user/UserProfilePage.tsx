import { useQuery } from '@tanstack/react-query';
import dayjs from 'dayjs';
import { Link } from 'react-router-dom';

import { useAuth } from '~/hooks/useAuth';
import { fetchUser } from '~/service/user/userApi';
import { timeAgo } from '~/utils/utils';

export default function UserProfilePage() {
  const apiUrl = import.meta.env.VITE_APP_API;
  const { user } = useAuth();

  const userQuery = useQuery({
    queryKey: ['userProfile'],
    queryFn: async () => fetchUser(user.id),
  });

  return (
    <>
      {/* Hero section */}
      <div className="rounded-xl bg-base-100 shadow flex border border-neutral-content/10">
        <div className="avatar m-6">
          <div className="w-32 rounded-full border-6 border-neutral-content/10">
            {userQuery.isLoading ? (
              <div className="skeleton w-full h-full"></div>
            ) : (
              <img
                loading="lazy"
                src={`${apiUrl}${userQuery.data?.data?.avatar ?? '/images/avatar/defaultAvatar.png'}`}
              />
            )}
          </div>
          <span
            className={`absolute bottom-0 right-0 bg-base-300 p-2 w-10 h-10 flex items-center justify-center rounded-full`}
          >
            <i className="fa-regular fa-camera"></i>
          </span>
        </div>

        <div className="m-6 flex flex-col justify-between">
          {userQuery.isLoading ? (
            <>
              <div className="skeleton h-9 w-80"></div>
              <div className="skeleton h-5 w-96"></div>
              <div className="skeleton h-10 w-52"></div>
            </>
          ) : (
            <>
              <p className="text-3xl font-bold">{userQuery.data?.data?.full_name ?? userQuery.data?.data?.name}</p>
              <p>
                Yêu thích phim {userQuery.data?.data?.top_categories[0]?.name} và{' '}
                {userQuery.data?.data?.top_categories[1]?.name}
              </p>
              <p className="rounded-xl bg-base-content/10 p-3 w-52">
                <i className="fa-regular fa-calendar-week"></i>
                <span className="ms-3">Tham gia {dayjs(userQuery.data?.data?.created_at).format('DD/MM/YYYY')}</span>
              </p>
            </>
          )}
        </div>
      </div>

      {/* Statics section */}
      <div className="flex gap-6">
        {/* Movie watched */}
        <div className="flex flex-1/3 rounded-xl bg-base-100 shadow p-6 border border-neutral-content/10 items-center justify-between">
          <div>
            <p className="text-base-content/60">Phim đã xem</p>
            {userQuery.isLoading ? (
              <span className="loading loading-spinner loading-xl"></span>
            ) : (
              <p className="text-3xl font-bold">{userQuery.data?.data?.watched_count ?? 0}</p>
            )}
          </div>
          <div className="text-4xl bg-base-content/10 p-3 rounded-2xl">
            <i className="fa-regular fa-film"></i>
          </div>
        </div>

        {/* Hours watched */}
        <div className="flex flex-1/3 rounded-xl bg-base-100 shadow p-6 border border-neutral-content/10 items-center justify-between">
          <div>
            <p className="text-base-content/60">Thời gian xem</p>
            {userQuery.isLoading ? (
              <span className="loading loading-spinner loading-xl"></span>
            ) : (
              <p className="text-3xl font-bold">{Math.floor(userQuery.data?.data?.watched_seconds / 3600)} giờ</p>
            )}
          </div>
          <div className="text-4xl bg-base-content/10 p-3 rounded-2xl">
            <i className="fa-regular fa-clock"></i>
          </div>
        </div>

        {/* Favorite category */}
        <div className="flex flex-1/3 rounded-xl bg-base-100 shadow p-6 border border-neutral-content/10 items-center justify-between">
          <div>
            <p className="text-base-content/60">Thể loại yêu thích</p>
            {userQuery.isLoading ? (
              <span className="loading loading-spinner loading-xl"></span>
            ) : (
              <p className="text-3xl font-bold">{userQuery.data?.data?.top_categories[0]?.name}</p>
            )}
          </div>
          <div className="text-4xl bg-base-content/10 p-3 rounded-2xl">
            <i className="fa-regular fa-award-simple"></i>
          </div>
        </div>
      </div>

      {/* Recent section */}
      <div className="rounded-xl bg-base-100 shadow border border-neutral-content/10 p-6">
        <p className="text-2xl font-bold">Hoạt động gần đây</p>

        <div className="space-y-6 mt-6 max-h-[370px] overflow-auto">
          {userQuery.isLoading ? (
            Array.from({ length: 3 }).map((_, index) => <div className="skeleton w-full h-[76px]" key={index}></div>)
          ) : (
            <>
              {userQuery.data?.data?.recent?.histories?.map((history: any) => (
                <div
                  key={history.id}
                  className={`flex items-center gap-4 p-4 bg-base-content/10 rounded-xl border-l-4 ${
                    history.status === 'completed' ? 'border-success' : 'border-info'
                  }`}
                >
                  <div
                    className={`w-3 h-3 rounded-full ${history.status === 'completed' ? 'bg-success' : 'bg-info'}`}
                  ></div>
                  <div className="flex-1">
                    <Link to={`/phim/${history.slug}`} className="font-medium hover:underline hover:text-primary">
                      {history.status === 'completed' ? 'Hoàn thành' : 'Đang xem'} - <span>{history.name}</span>
                    </Link>
                    <p className="text-sm text-base-content/60">{timeAgo(history.updated_at)}</p>
                  </div>
                </div>
              ))}

              {userQuery.data?.data?.recent?.favorites?.map((favorite: any) => (
                <div
                  key={favorite.id}
                  className={`flex items-center gap-4 p-4 bg-base-content/10 rounded-xl border-l-4 border-primary`}
                >
                  <div className={`w-3 h-3 rounded-full bg-primary`}></div>
                  <div className="flex-1">
                    <Link to={`/phim/${favorite.slug}`} className="font-medium hover:underline hover:text-primary">
                      Thêm vào yêu thích - <span>{favorite.name}</span>
                    </Link>
                    <p className="text-sm text-base-content/60">{timeAgo(favorite.updated_at)}</p>
                  </div>
                </div>
              ))}
            </>
          )}
        </div>
      </div>
    </>
  );
}
