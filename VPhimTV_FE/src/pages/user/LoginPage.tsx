import { Link } from 'react-router-dom';

import loginBackgroundImage from '~/assets/imgs/login-background.jpg';

export default function LoginPage() {
  return (
    <div
      className="relative flex justify-center items-center min-h-[calc(100vh-64px)] bg-cover bg-center"
      style={{ backgroundImage: `url(${loginBackgroundImage})` }}
    >
      {/* Overlay gradient mờ đậm từ dưới lên */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/60 to-transparent z-0" />

      {/* Form đăng nhập */}
      <form className="relative z-10 flex flex-col justify-center items-center p-6 mb-20 shadow rounded-box space-y-4 bg-base-300 w-[350px]">
        <p className="text-2xl font-bold text-center">Đăng Nhập</p>

        <div className="space-y-2 w-full">
          <p>Tên đăng nhập:</p>
          <label className="input">
            <input type="text" placeholder="example@gmail.com" className="grow" required />
          </label>
        </div>

        <div className="space-y-2 w-full">
          <p>Mật khẩu:</p>
          <label className="input">
            <input type="password" placeholder="************" className="grow" required />
          </label>
        </div>

        <Link to={''} className="btn-link w-full text-end hover:text-primary">
          Quên mật khẩu?
        </Link>

        <div className="flex w-full gap-4">
          <Link to={'dang-ky'} className="btn btn-accent flex-1/3">
            Đăng ký
          </Link>

          <button className="btn btn-primary w-full flex-2/3" type="submit">
            Đăng Nhập
          </button>
        </div>
      </form>
    </div>
  );
}
