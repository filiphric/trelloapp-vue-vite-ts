import React from 'react';
import { useStore } from '@/store/store';
import { useNavigate, Link } from 'react-router-dom';
import loginImg from '@/assets/login.png';

const Login: React.FC = () => {
  const navigate = useNavigate();
  const login = useStore((s) => s.login);
  const loginForm = useStore((s) => s.loginForm);

  const setLoginForm = (field: string, value: string) => {
    useStore.setState({ loginForm: { ...loginForm, [field]: value } });
  };

  const handleLogin = () => {
    login(loginForm.email, loginForm.password).then(() => {
      navigate('/');
    });
  };

  return (
    <div className="grid grid-cols-2 gap-x-8 items-stretch px-28 -mt-10 h-screen">
      <div className="grid content-center">
        <h1 className="mb-8 text-3xl font-bold">Welcome back!</h1>
        <label htmlFor="email">Email</label>
        <input
          value={loginForm.email}
          onChange={(e) => setLoginForm('email', e.target.value)}
          className="px-2 mb-3 w-full h-10 bg-gray3 focus:bg-white rounded-sm"
          placeholder="Email"
          data-test-id="login-email"
          name="email"
        />
        <label htmlFor="password">Password</label>
        <input
          value={loginForm.password}
          onChange={(e) => setLoginForm('password', e.target.value)}
          type="password"
          data-test-id="login-password"
          className="px-2 mb-3 w-full h-10 bg-gray3 focus:bg-white rounded-sm"
          placeholder="Password"
          name="password"
          onKeyUp={(e) => {
            if (e.key === 'Enter') handleLogin();
          }}
        />
        <button data-test-id="login-submit" className="py-2 w-full text-white bg-green7 hover:bg-green6" onClick={handleLogin}>
          Log in
        </button>
        <Link className="mt-4 text-sm text-center underline" to="/signup">
          Don&apos;t have an account? Sign up here.
        </Link>
      </div>
      <img className="gap-x-5 self-center place-self-center" src={loginImg} />
    </div>
  );
};

export default Login;
