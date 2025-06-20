import { useMutation } from '@tanstack/react-query';
import { useState } from 'react';
import { Link } from 'react-router-dom';

import loginBackgroundImage from '~/assets/imgs/login-background.jpg';
import { useAuth } from '~/hooks/useAuth';
import { toast } from '~/hooks/utils/toast';
import { registerUser } from '~/service/auth/authApi';
import { encryptObj } from '~/utils/utils';

export default function RegisterPage() {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const { setUser } = useAuth();

  const mutationRegister = useMutation({
    mutationKey: ['login'],
    mutationFn: (data: any) => registerUser(data.username, data.email, data.password),
    onSuccess: (data) => {
      const encrypted = encryptObj(data.data);
      localStorage.setItem('auth', encrypted);
      const redirect = localStorage.getItem('redirect') ?? '/';
      localStorage.removeItem('redirect');

      setUser(data.user);
      window.location.href = redirect;
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

    if (password !== confirmPassword) {
      return toast({ type: 'error', message: 'Mật khẩu không khớp' });
    }
    mutationRegister.mutate({ username, email, password });
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
          <p className="text-3xl font-bold text-center text-primary">Đăng Ký</p>
        </div>

        <div className="space-y-2 w-full">
          <label className="label">Tên đăng nhập</label>
          <label className="input validator flex items-center gap-2">
            <i className="fa fa-user text-base-content/60" />
            <input
              type="text"
              placeholder="Tên đăng nhập"
              className="grow"
              required
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </label>
        </div>

        <div className="space-y-2 w-full">
          <label className="label">Email</label>
          <label className="input validator flex items-center gap-2">
            <i className="fa fa-envelope text-base-content/60" />
            <input
              type="email"
              placeholder="example@gmail.com"
              className="grow"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
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

        <div className="space-y-2 w-full">
          <label className="label">Nhập lại mật khẩu</label>
          <label className="input validator flex items-center gap-2">
            <i className="fa fa-lock text-base-content/60" />
            <input
              type="password"
              placeholder="************"
              className="grow"
              required
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
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
