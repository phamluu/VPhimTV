import { useMutation } from '@tanstack/react-query';
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';

import { useAuth } from '~/hooks/useAuth';
import { logoutUser } from '~/service/auth/authApi';

export default function UserLayout() {
  const location = useLocation();
  const pathSegments = location.pathname.split('/').filter(Boolean);
  const rootPath = pathSegments[0] || '';
  const lastPath = pathSegments[1] || '';
  const navigate = useNavigate();
  const { setUser } = useAuth();

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
      navigate('/');
    },
  });

  return (
    <div className="container mx-auto mt-12 mb-12">
      <div className="flex gap-10">
        {/* Slider Menu */}
        <div className="flex-1/4">
          <div className="rounded-xl bg-base-100 shadow border border-neutral-content/10 sticky top-10">
            <div className="space-y-6 p-6">
              <div className="avatar w-full justify-center">
                <div className="w-20 rounded-full border-2 border-neutral/30">
                  <img src="https://img.daisyui.com/images/profile/demo/yellingcat@192.webp" />
                </div>
              </div>

              <p className="text-xl font-bold text-center">Nguyễn Văn A</p>

              <ul className="menu w-full space-y-2">
                {menuItems.map((item) => (
                  <li className="font-bold" key={item.label}>
                    <Link to={item.to} className={`p-3 rounded-xl${item.isActive ? ' menu-focus' : ''}`}>
                      {item.icon}
                      {item.label}
                    </Link>
                  </li>
                ))}
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
      </div>
    </div>
  );
}
