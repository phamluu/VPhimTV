import { useMutation, useQueries } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';

import { useAuth } from '~/hooks/useAuth';
import { logoutUser } from '~/service/auth/authApi';
import { fetchCategory } from '~/service/category/categoryApi';
import { fetchCountry } from '~/service/country/countryApi';

export default function Header() {
  const navigate = useNavigate();
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
            <Link
              className="btn btn-link !no-underline text-nowrap text-base-content hover:text-primary sm:inline-flex hidden"
              to="/danh-sach/phim-moi?trang=1"
            >
              Phim Mới
            </Link>
            <Link
              className="btn btn-link !no-underline text-nowrap text-base-content hover:text-primary sm:inline-flex hidden"
              to="/danh-sach/phim-le?trang=1"
            >
              Phim Lẻ
            </Link>

            <Link
              className="btn btn-link !no-underline text-nowrap text-base-content hover:text-primary lg:inline-flex hidden"
              to="/danh-sach/phim-bo?trang=1"
            >
              Phim Bộ
            </Link>

            <Link
              className="btn btn-link !no-underline text-nowrap text-base-content hover:text-primary lg:inline-flex hidden"
              to="/danh-sach/tv-shows?trang=1"
            >
              TV Shows
            </Link>

            <Link
              className="btn btn-link !no-underline text-nowrap text-base-content hover:text-primary lg:inline-flex hidden"
              to="/danh-sach/hoat-hinh?trang=1"
            >
              Hoạt Hình
            </Link>

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
                {category.data?.map((item: any) => (
                  <li key={item._id} className="hover:text-primary">
                    <Link to={`/tim-kiem?the-loai=${item.slug}`}>{item.name}</Link>
                  </li>
                ))}
              </ul>
            </div>
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
                {country.data?.map((item: any) => (
                  <li key={item._id} className="hover:text-primary">
                    <Link to={`/tim-kiem?quoc-gia=${item.slug}`}>{item.name}</Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="navbar-end space-x-3">
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

          {!user ? (
            <Link to={'/dang-nhap'} className="btn btn-soft btn-primary">
              Đăng nhập
            </Link>
          ) : (
            <div className="dropdown dropdown-end">
              <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                <div className="w-10 rounded-full">
                  <img
                    alt="Tailwind CSS Navbar component"
                    src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
                  />
                </div>
              </div>
              <ul tabIndex={0} className="menu dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
                <li>
                  <a className="justify-between">
                    Profile
                    <span className="badge">New</span>
                  </a>
                </li>
                <li>
                  <a>Settings</a>
                </li>
                <li onClick={() => mutationLogout.mutate()}>
                  <a>Đăng xuất</a>
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
