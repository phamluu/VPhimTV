import { Link } from 'react-router-dom';

export default function Info() {
  return (
    <div className="container mx-auto space-y-8 max-w-4xl">
      <div className="bg-base-100 rounded relative">
        <div className="breadcrumbs text-sm p-3">
          <ul>
            <li className="text-primary space-x-2">
              <i className="fa-regular fa-house"></i>
              <a> Xem phim</a>
            </li>
            <li className="text-primary">
              <a>Phim Chiếu Rạp</a>
            </li>
            <li className="text-primary">
              <a>Phim lẻ</a>
            </li>
            <li>Mật vụ triệu đô</li>
          </ul>
        </div>

        <div className="relative">
          <img
            className=" brightness-75"
            src="https://phimmoichill.moi/wp-content/uploads/2025/04/mat-vu-phu-ho-15810-poster.webp"
          />

          <Link to={'/'}>
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white/70 w-[72px] h-[72px] rounded-full flex items-center justify-center transition-transform duration-200 hover:scale-110">
              <i className="fa-sharp fa-solid fa-circle-play text-7xl text-warning/80"></i>
            </div>
          </Link>
        </div>

        <div className="absolute bottom-4 left-4 z-10 flex space-x-4">
          <img
            src="https://phimmoichill.moi/wp-content/uploads/2025/04/mat-vu-phu-ho-15810-poster.webp"
            className="w-[250px] object-cover border"
          />

          <div className="space-y-3">
            <p className="text-3xl shadow">Mật vụ phụ hồ</p>
            <p className="text-2xl font-bold shadow">A Working Man (2025)</p>
            <div className="flex gap-4">
              <button className="btn btn-info w-32 font-bold">
                <i className="fa-brands fa-youtube"></i>
                Trailer
              </button>
              <button className="btn btn-error w-32 font-bold">
                <i className="fa-regular fa-circle-play"></i>
                Xem phim
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
