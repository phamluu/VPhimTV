import { BrowserRouter, Outlet, Route, Routes, useLocation } from 'react-router-dom';

import Footer from './components/Footer';
import Header from './components/Header';
import { ConfirmProvider } from './context/ConfirmContext';
import { ToastProvider } from './context/ToastContext';
import HomePage from './pages/home/HomePage';
import MovieInfoPage from './pages/movie/MovieInfoPage';
import MovieListPage from './pages/movie/MovieListPage';
import MovieWatchPage from './pages/movie/MovieWatchPage';
import SearchPage from './pages/search/SearchPage';
import LoginPage from './pages/user/LoginPage';
import RegisterPage from './pages/user/RegisterPage';

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
              <Route path="/phim/:movieSlug" element={<MovieInfoPage />} />
              <Route path="/phim/:movieSlug/:episodeSlug" element={<MovieWatchPage />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </ToastProvider>
    </ConfirmProvider>
  );
}
