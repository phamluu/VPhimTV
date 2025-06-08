import { useMutation, useQueries, useQuery } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate, useSearchParams } from 'react-router-dom';

import { useAuth } from '~/hooks/useAuth';
import { logoutUser } from '~/service/auth/authApi';
import { fetchCategory } from '~/service/category/categoryApi';
import { fetchCountry } from '~/service/country/countryApi';
import { fetchUser } from '~/service/user/userApi';

export default function Header() {
  const navigate = useNavigate();
  const location = useLocation();
  const [value, setValue] = useState('');
  const [searchParams, _setSearchParams] = useSearchParams();
  const { user, setUser } = useAuth();

  const [category, country] = useQueries({
    queries: [
      {
        queryKey: ['category'],
        queryFn: () => fetchCategory(),
      },
      {
        queryKey: ['country'],
        queryFn: () => fetchCountry(),
      },
    ],
  });

  useEffect(() => {
    const q = searchParams.get('tu-khoa');
    if (q) setValue(q);
  }, [searchParams]);

  const handleSearch = (e: any) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      navigate(`/tim-kiem?tu-khoa=${encodeURIComponent(value.trim())}`);
    }
  };

  const mutationLogout = useMutation({
    mutationKey: ['logout'],
    mutationFn: () => logoutUser(),
    onSuccess: () => {
      setUser(null);
      localStorage.removeItem('auth');
      navigate('/');
    },
  });

  const userQuery = useQuery({
    queryKey: ['userProfile'],
    queryFn: async () => fetchUser(user.id),
  });

  return (
    <div className="bg-base-100">
      <div className="container navbar shadow mx-auto">
        <div className="sm:hidden flex-none">
          <button className="btn btn-square btn-ghost">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              className="inline-block h-5 w-5 stroke-current"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>{' '}
            </svg>
          </button>
        </div>

        <div className="navbar-start">
          <Link className="btn btn-ghost text-2xl" to="/">
            VPhimTV.com
          </Link>

          <div className="inline-flex">
            {[
              { to: '/danh-sach/phim-moi?trang=1', label: 'Phim Mới', className: 'sm:inline-flex hidden' },
              { to: '/danh-sach/phim-le?trang=1', label: 'Phim Lẻ', className: 'sm:inline-flex hidden' },
              { to: '/danh-sach/phim-bo?trang=1', label: 'Phim Bộ', className: 'lg:inline-flex hidden' },
              { to: '/danh-sach/tv-shows?trang=1', label: 'TV Shows', className: 'lg:inline-flex hidden' },
              { to: '/danh-sach/hoat-hinh?trang=1', label: 'Hoạt Hình', className: 'lg:inline-flex hidden' },
            ].map(({ to, label, className }) => (
              <Link
                key={to}
                className={`btn btn-link !no-underline text-nowrap text-base-content hover:text-primary ${className}`}
                to={to}
              >
                {label}
              </Link>
            ))}

            {/* Category List */}
            <div className="dropdown dropdown-end dropdown-hover xl:inline-block hidden">
              <div
                tabIndex={0}
                role="button"
                className="btn btn-link !no-underline text-nowrap text-base-content hover:text-primary"
              >
                Thể Loại
              </div>
              <ul
                tabIndex={0}
                className="dropdown-content menu grid grid-cols-3 gap-1 bg-base-100 rounded-box z-1 w-96 p-2 shadow"
              >
                {category.data?.data?.map((item: any) => (
                  <li key={item.id} className="hover:text-primary">
                    <Link to={`/tim-kiem?the-loai=${item.slug}`}>{item.name}</Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Country List */}
            <div className="dropdown dropdown-end dropdown-hover xl:inline-block hidden">
              <div
                tabIndex={0}
                role="button"
                className="btn btn-link !no-underline text-nowrap text-base-content hover:text-primary"
              >
                Quốc Gia
              </div>
              <ul
                tabIndex={0}
                className="dropdown-content menu grid grid-cols-3 gap-1 bg-base-100 rounded-box z-1 w-96 p-2 shadow"
              >
                {country.data?.data?.map((item: any) => (
                  <li key={item.id} className="hover:text-primary">
                    <Link to={`/tim-kiem?quoc-gia=${item.slug}`}>{item.name}</Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="navbar-end space-x-3">
          {/* Search Input */}
          <label className="input w-20 sm:w-auto">
            <input
              type="text"
              placeholder="Search"
              onChange={(e) => setValue(e.target.value)}
              value={value}
              onKeyDown={handleSearch}
            />
            <i className="fa-solid fa-magnifying-glass"></i>
          </label>

          {/* User Profile or Login Button */}
          {!user ? (
            <button
              className="btn btn-soft btn-primary"
              onClick={() => {
                localStorage.setItem('redirect', location.pathname + location.search);
                navigate('/dang-nhap');
              }}
            >
              Đăng nhập
            </button>
          ) : (
            <div className="dropdown dropdown-end">
              <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                <div className="w-10 rounded-full">
                  {userQuery.isLoading ? (
                    <div className="skeleton w-full h-full"></div>
                  ) : (
                    <img loading="lazy" src={`${import.meta.env.VITE_APP_API}${userQuery.data?.data.avatar}`} />
                  )}
                </div>
              </div>
              <ul tabIndex={0} className="menu dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
                <li>
                  <Link to={'/ho-so'}>
                    <i className="fa-regular fa-user"></i>
                    Hồ sơ
                  </Link>
                </li>
                <li>
                  <Link to={'/ho-so/yeu-thich'}>
                    <i className="fa-regular fa-award-simple"></i>
                    Phim yêu thích
                  </Link>
                </li>
                <li>
                  <Link to={'/ho-so/lich-su'}>
                    <i className="fa-regular fa-clock"></i>
                    Phim đã xem
                  </Link>
                </li>
                <li onClick={() => mutationLogout.mutate()}>
                  <a>
                    <i className="fa-regular fa-arrow-right-from-bracket"></i>
                    Đăng xuất
                  </a>
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
