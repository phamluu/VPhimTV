import { Link } from 'react-router-dom';

import loginBackgroundImage from '~/assets/imgs/login-background.jpg';

export default function RegisterPage() {
  return (
    <div
      className="relative flex justify-center items-center min-h-[calc(100vh-64px)] bg-cover bg-center"
      style={{ backgroundImage: `url(${loginBackgroundImage})` }}
    >
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/60 to-transparent z-0" />

      <form className="relative z-10 flex flex-col justify-center items-center p-8 mb-20 shadow-xl rounded-box space-y-6 bg-base-200/90 w-[370px] backdrop-blur-sm">
        <div className="flex flex-col items-center gap-2">
          <p className="text-3xl font-bold text-center text-primary">Đăng Ký</p>
        </div>

        <div className="space-y-2 w-full">
          <label className="label">
            <span className="label-text">Tên đăng nhập</span>
          </label>
          <label className="input flex items-center gap-2">
            <i className="fa fa-user text-base-content/60" />
            <input type="text" placeholder="Tên đăng nhập" className="grow" required />
          </label>
        </div>

        <div className="space-y-2 w-full">
          <label className="label">
            <span className="label-text">Email</span>
          </label>
          <label className="input flex items-center gap-2">
            <i className="fa fa-envelope text-base-content/60" />
            <input type="email" placeholder="example@gmail.com" className="grow" required />
          </label>
        </div>

        <div className="space-y-2 w-full">
          <label className="label">
            <span className="label-text">Mật khẩu</span>
          </label>
          <label className="input flex items-center gap-2">
            <i className="fa fa-lock text-base-content/60" />
            <input type="password" placeholder="************" className="grow" required />
          </label>
        </div>

        <div className="flex w-full gap-3">
          <Link to={'/dang-nhap'} className="btn btn-soft btn-accent flex-1">
            Đăng nhập
          </Link>
          <button className="btn btn-primary flex-2" type="submit">
            Đăng Ký
          </button>
        </div>
      </form>
    </div>
  );
}
