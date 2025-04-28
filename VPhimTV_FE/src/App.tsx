import { BrowserRouter, Outlet, Route, Routes } from 'react-router-dom';

import Footer from './components/footer';
import Header from './components/header';
import Home from './pages/Home/Home';
import Info from './pages/Info/Info';

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
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
