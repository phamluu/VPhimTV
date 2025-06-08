import { BrowserRouter, Outlet, Route, Routes, useLocation } from 'react-router-dom';

import Footer from './components/Footer';
import Header from './components/Header';
import { RequireAuth } from './components/RequireAuth';
import { AuthProvider } from './context/AuthContext';
import { ConfirmProvider } from './context/ConfirmContext';
import { ToastProvider } from './context/ToastContext';
import LoginPage from './pages/auth/LoginPage';
import RegisterPage from './pages/auth/RegisterPage';
import HomePage from './pages/home/HomePage';
import MovieInfoPage from './pages/movie/MovieInfoPage';
import MovieListPage from './pages/movie/MovieListPage';
import MovieWatchPage from './pages/movie/MovieWatchPage';
import SearchPage from './pages/search/SearchPage';
import UserLayout from './pages/user/layouts/UserLayout';
import UserFavoritePage from './pages/user/UserFavoritePage';
import UserProfilePage from './pages/user/UserProfilePage';
import UserViewedPage from './pages/user/UserViewedPage';

function MainLayout() {
  const location = useLocation();
  const hiddenFooterPaths = ['/dang-nhap', '/dang-ky'];
  const hideFooter = hiddenFooterPaths.includes(location.pathname);

  return (
    <div>
      <Header />
      <main className={`min-h-[calc(100vh-64px)] ${!hideFooter ? 'my-6' : ''}`}>
        <Outlet />
      </main>
      {!hideFooter && <Footer />}
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <ConfirmProvider>
        <ToastProvider>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<MainLayout />}>
                <Route index element={<HomePage />} />
                <Route path="/dang-nhap" element={<LoginPage />} />
                <Route path="/dang-ky" element={<RegisterPage />} />
                <Route path="/tim-kiem/" element={<SearchPage />} />
                <Route path="/danh-sach/:typeSlug" element={<MovieListPage />} />

                <Route path="/phim">
                  <Route path=":movieSlug" element={<MovieInfoPage />} />
                  <Route path=":movieSlug/:episodeSlug" element={<MovieWatchPage />} />
                </Route>

                <Route path="/ho-so" element={<UserLayout />}>
                  <Route index element={<RequireAuth children={<UserProfilePage />} />} />
                  <Route path="yeu-thich" element={<RequireAuth children={<UserFavoritePage />} />} />
                  <Route path="lich-su" element={<RequireAuth children={<UserViewedPage />} />} />
                </Route>
              </Route>
            </Routes>
          </BrowserRouter>
        </ToastProvider>
      </ConfirmProvider>
    </AuthProvider>
  );
}
