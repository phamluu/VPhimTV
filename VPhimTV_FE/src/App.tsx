import { BrowserRouter, Outlet, Route, Routes } from 'react-router-dom';

import Footer from './components/Footer';
import Header from './components/Header';
import Home from './pages/home/Home';
import Info from './pages/info/Info';
import Search from './pages/search/Search';

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
          <Route index element={<Home />} />
          <Route path="/info" element={<Info />} />
          <Route path="/search" element={<Search />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
