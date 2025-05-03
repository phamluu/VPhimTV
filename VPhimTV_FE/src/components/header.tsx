import { useEffect, useState } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';

export default function Header() {
  const [value, setValue] = useState('');
  const navigate = useNavigate();
  const [searchParams, _setSearchParams] = useSearchParams();

  useEffect(() => {
    const q = searchParams.get('q');
    if (q) setValue(q);
  }, [searchParams]);

  const handleSearch = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      navigate(`/search?q=${encodeURIComponent(value.trim())}&page=1`);
    }
  };

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
              {' '}
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h16"
              ></path>{' '}
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
              to="/phim-moi"
            >
              Phim Mới
            </Link>
            <Link
              className="btn btn-link !no-underline text-nowrap text-base-content hover:text-primary sm:inline-flex hidden"
              to="/phim-ler"
            >
              Phim Lẻ
            </Link>

            <Link
              className="btn btn-link !no-underline text-nowrap text-base-content hover:text-primary lg:inline-flex hidden"
              to="/phim-bo"
            >
              Phim Bộ
            </Link>
            <Link
              className="btn btn-link !no-underline text-nowrap text-base-content hover:text-primary lg:inline-flex hidden"
              to="/phim-chieu-rap"
            >
              Phim Chiếu Rạp
            </Link>

            <div className="dropdown dropdown-hover xl:inline-block hidden">
              <div
                tabIndex={0}
                role="button"
                className="btn btn-link !no-underline text-nowrap text-base-content hover:text-primary"
              >
                Thể Loại
              </div>
              <ul
                tabIndex={0}
                className="dropdown-content menu bg-base-100 rounded-box z-1 w-52 p-2 shadow"
              >
                <li>
                  <Link to={'/'}>Item 1</Link>
                </li>
                <li>
                  <Link to={'/'}>Item 2</Link>
                </li>
              </ul>
            </div>
            <div className="dropdown dropdown-hover xl:inline-block hidden">
              <div
                tabIndex={0}
                role="button"
                className="btn btn-link !no-underline text-nowrap text-base-content hover:text-primary"
              >
                Quốc Gia
              </div>
              <ul
                tabIndex={0}
                className="dropdown-content menu bg-base-100 rounded-box z-1 w-52 p-2 shadow"
              >
                <li>
                  <Link to={'/'}>Item 1</Link>
                </li>
                <li>
                  <Link to={'/'}>Item 2</Link>
                </li>
              </ul>
            </div>
            <div className="dropdown dropdown-hover xl:inline-block hidden">
              <div
                tabIndex={0}
                role="button"
                className="btn btn-link !no-underline text-nowrap text-base-content hover:text-primary"
              >
                Năm Phát Hành
              </div>
              <ul
                tabIndex={0}
                className="dropdown-content menu bg-base-100 rounded-box z-1 w-52 p-2 shadow"
              >
                <li>
                  <Link to={'/'}>Item 1</Link>
                </li>
                <li>
                  <Link to={'/'}>Item 2</Link>
                </li>
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

          <div className="dropdown dropdown-end">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle avatar"
            >
              <div className="w-10 rounded-full">
                <img
                  alt="Tailwind CSS Navbar component"
                  src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
                />
              </div>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
            >
              <li>
                <a className="justify-between">
                  Profile
                  <span className="badge">New</span>
                </a>
              </li>
              <li>
                <a>Settings</a>
              </li>
              <li>
                <a>Logout</a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
