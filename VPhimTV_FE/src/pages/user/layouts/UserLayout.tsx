import { useMutation, useQuery } from '@tanstack/react-query';
import { useRef } from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';

import { useAuth } from '~/hooks/useAuth';
import { logoutUser } from '~/service/auth/authApi';
import { fetchUser } from '~/service/user/userApi';

export default function UserLayout() {
  const apiUrl = import.meta.env.VITE_APP_API;
  const location = useLocation();
  const pathSegments = location.pathname.split('/').filter(Boolean);
  const rootPath = pathSegments[0] || '';
  const lastPath = pathSegments[1] || '';
  const { user, setUser } = useAuth();
  const modalPasswordRef = useRef<HTMLDialogElement | null>(null);

  const userQuery = useQuery({
    queryKey: ['userProfile'],
    queryFn: async () => fetchUser(user.id),
  });

  const menuItems = [
    {
      to: '/ho-so',
      icon: <i className="fa-regular fa-user"></i>,
      label: 'Hồ sơ',
      isActive: rootPath === 'ho-so' && !lastPath,
    },
    {
      to: '/ho-so/yeu-thich',
      icon: <i className="fa-regular fa-heart"></i>,
      label: 'Yêu thích',
      isActive: rootPath === 'ho-so' && lastPath === 'yeu-thich',
    },
    {
      to: '/ho-so/lich-su',
      icon: <i className="fa-regular fa-clock"></i>,
      label: 'Lịch sử xem',
      isActive: rootPath === 'ho-so' && lastPath === 'lich-su',
    },
  ];

  const mutationLogout = useMutation({
    mutationKey: ['logout'],
    mutationFn: () => logoutUser(),
    onSuccess: () => {
      setUser(null);
      localStorage.removeItem('auth');
      window.location.href = '/';
    },
  });

  return (
    <div className="container mx-auto mt-12 mb-12">
      <div className="flex gap-10">
        {/* Slider Menu */}
        <div className="flex-1/4">
          <div className="rounded-xl bg-base-100 shadow border border-neutral-content/10 sticky top-10">
            <div className="p-6">
              <div className="avatar w-full justify-center mb-4">
                <div className="w-20 rounded-full border-2 border-neutral/30">
                  <img
                    loading="lazy"
                    src={`${apiUrl}${userQuery.data?.data?.avatar ?? '/images/avatar/defaultAvatar.png'}`}
                  />
                </div>
              </div>

              {userQuery.isLoading ? (
                <>
                  <div className="skeleton h-7 mb-4"></div>
                  <div className="skeleton h-6 mb-4"></div>
                </>
              ) : (
                <>
                  <p className="text-xl font-bold text-center mb-2">
                    {userQuery.data?.data?.full_name ?? userQuery.data?.data?.name}
                  </p>
                  <p className="font-bold text-center mb-4">{userQuery.data?.data?.email}</p>
                </>
              )}

              <ul className="menu w-full space-y-2">
                {menuItems.map((item) => (
                  <li className="font-bold" key={item.label}>
                    <Link to={item.to} className={`p-3 rounded-xl${item.isActive ? ' menu-focus' : ''}`}>
                      {item.icon}
                      {item.label}
                    </Link>
                  </li>
                ))}
                <li className="font-bold">
                  <a className="p-3 rounded-xl" onClick={() => modalPasswordRef.current?.showModal()}>
                    <i className="fa-regular fa-key"></i>
                    Đổi Mật khẩu
                  </a>
                </li>
              </ul>
            </div>

            <div className="space-y-6 p-6 border-t border-neutral-content/10">
              <button className="btn btn-soft w-full rounded-xl" onClick={() => mutationLogout.mutate()}>
                <i className="fa-regular fa-arrow-right-from-bracket"></i>
                Đăng xuất
              </button>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="flex-3/4 space-y-10">
          <Outlet />
        </div>

        {/* Modal Change Password */}
        <dialog ref={modalPasswordRef} className={`modal`}>
          <div className="modal-box p-4 w-[370px]">
            <form method="dialog">
              <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
            </form>
            <h3 className="text-lg font-bold">Thay Đổi Mật Khẩu</h3>
            <div className="py-4">
              <div className="space-y-4 mx-auto">
                <label className="floating-label">
                  <span>Mật khẩu cũ</span>
                  <input type="password" placeholder="Mật khẩu cũ" className="input w-full" />
                </label>

                <label className="floating-label">
                  <span>Mật khẩu mới</span>
                  <input type="password" placeholder="Mật khẩu mới" className="input w-full" />
                </label>

                <label className="floating-label">
                  <span>Nhập lại mật khẩu mới</span>
                  <input type="password" placeholder="Nhập lại mật khẩu mới" className="input w-full" />
                </label>
              </div>
            </div>
            <div className="modal-action mt-0">
              <button className={`btn btn-soft w-[90px]`}>Huỷ</button>
              <button className={`btn btn-primary w-[90px]`}>OK</button>
            </div>
          </div>
          <form method="dialog" className="modal-backdrop">
            <button>close</button>
          </form>
        </dialog>
      </div>
    </div>
  );
}
