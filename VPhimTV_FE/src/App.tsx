import { BrowserRouter, Outlet, Route, Routes } from 'react-router-dom';

import Footer from './components/Footer';
import Header from './components/Header';
import HomePage from './pages/home/HomePage';
import MovieInfoPage from './pages/movie/MovieInfoPage';
import MovieListPage from './pages/movie/MovieListPage';
import MovieWatchPage from './pages/movie/MovieWatchPage';
import SearchPage from './pages/search/SearchPage';

function MainLayout() {
  return (
    <div>
      <Header />
      <main className="min-h-[calc(100vh-245px-32px)] mt-6 mb-6">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<HomePage />} />
          <Route path="/tim-kiem/" element={<SearchPage />} />
          <Route path="/danh-sach/:typeSlug" element={<MovieListPage />} />
          <Route path="/phim/:movieSlug" element={<MovieInfoPage />} />
          <Route path="/phim/:movieSlug/:episodeSlug" element={<MovieWatchPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
