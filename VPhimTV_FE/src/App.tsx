import { BrowserRouter, Outlet, Route, Routes } from 'react-router-dom';

import Footer from './components/footer';
import Header from './components/header';
import Home from './pages/Home/Home';

function MainLayout() {
  return (
    <div className="flex flex-col h-screen">
      <Header />
      <main className="flex-1 overflow-auto no-scrollbar">
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
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
