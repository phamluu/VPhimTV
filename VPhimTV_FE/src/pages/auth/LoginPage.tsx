import { useMutation } from '@tanstack/react-query';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import loginBackgroundImage from '~/assets/imgs/login-background.jpg';
import { useAuth } from '~/hooks/useAuth';
import { toast } from '~/hooks/utils/toast';
import { loginUser } from '~/service/auth/authApi';
import { encryptObj } from '~/utils/utils';

export default function LoginPage() {
  const navigate = useNavigate();
  const [username, setUsername] = useState('anle@gmail.com');
  const [password, setPassword] = useState('anle');
  const { setUser } = useAuth();

  const mutationLogin = useMutation({
    mutationKey: ['login'],
    mutationFn: (data: any) => loginUser(data.username, data.password),
    onSuccess: (data) => {
      const encrypted = encryptObj(data.user);
      localStorage.setItem('auth', encrypted);

      setUser(data.user);
      navigate('/');
    },
    onError: (error: any) => {
      if (error.errors && typeof error.errors === 'object') {
        Object.entries(error.errors).forEach(([_, messages]) => {
          (messages as string[]).forEach((msg) => {
            toast({ type: 'error', message: msg });
          });
        });
      }
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    mutationLogin.mutate({ username, password });
  };

  return (
    <div
      className="relative flex justify-center items-center min-h-[calc(100vh-64px)] bg-cover bg-center"
      style={{ backgroundImage: `url(${loginBackgroundImage})` }}
    >
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/60 to-transparent z-0" />

      <form
        className="relative z-10 flex flex-col justify-center items-center p-8 mb-20 shadow-xl rounded-box space-y-4 bg-base-200/90 w-[370px] backdrop-blur-sm"
        onSubmit={handleSubmit}
      >
        <div className="flex flex-col items-center gap-2">
          <p className="text-3xl font-bold text-center text-primary">Đăng Nhập</p>
        </div>

        <div className="space-y-2 w-full">
          <label className="label">Tên đăng nhập</label>
          <label className="input validator flex items-center gap-2">
            <i className="fa fa-user text-base-content/60" />
            <input
              type="text"
              placeholder="example@gmail.com"
              className="grow"
              required
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </label>
        </div>

        <div className="space-y-2 w-full">
          <label className="label">Mật khẩu</label>
          <label className="input validator flex items-center gap-2">
            <i className="fa fa-lock text-base-content/60" />
            <input
              type="password"
              placeholder="************"
              className="grow"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </label>
        </div>

        <div className="w-full flex justify-end">
          <Link
            to={''}
            onClick={() => toast({ type: 'info', message: 'Chức năng này đang được phát triển' })}
            className="link link-hover text-sm text-primary/80"
          >
            Quên mật khẩu?
          </Link>
        </div>

        <div className="flex w-full gap-3">
          <Link to={'/dang-ky'} className="btn btn-soft btn-accent flex-1">
            Đăng ký
          </Link>
          <button className="btn btn-primary flex-2" disabled={mutationLogin.isPending} type="submit">
            {mutationLogin.isPending ? (
              <>
                <span className="loading loading-spinner loading-sm"></span>
                Đang đăng nhập...
              </>
            ) : (
              'Đăng Nhập'
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
