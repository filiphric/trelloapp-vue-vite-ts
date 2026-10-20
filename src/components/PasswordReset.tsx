import React, { useState } from 'react';
import axios, { AxiosError } from 'axios';
import { Link, useSearchParams } from 'react-router-dom';
import loginImg from '@/assets/login.png';

const PasswordReset: React.FC<{ confirm?: boolean }> = ({ confirm = false }) => {
  const [params] = useSearchParams();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);
  const token = params.get('token');

  const submit = async (event: React.FormEvent) => {
    event.preventDefault();
    setBusy(true);
    setError('');
    try {
      const response = await axios.post(`/api/password-reset/${confirm ? 'confirm' : 'request'}`, confirm ? { token, password } : { email });
      setMessage(response.data.message);
    } catch (err) {
      setError(
        axios.isAxiosError(err)
          ? (err as AxiosError<{ message: string }>).response?.data?.message || 'Something went wrong. Please try again.'
          : 'Something went wrong. Please try again.'
      );
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="grid grid-cols-2 gap-x-8 items-stretch px-28 -mt-10 h-screen">
      <div className="grid content-center">
        <h1 className="mb-8 text-3xl font-bold">{confirm ? 'Choose a new password' : 'Forgot your password?'}</h1>
        {message ? (
          <p role="status" data-test-id="reset-success">
            {message}
          </p>
        ) : confirm && !token ? (
          <p role="alert">This reset link is missing a token. Request a new link.</p>
        ) : (
          <form onSubmit={submit}>
            <label htmlFor="reset-input">{confirm ? 'New password' : 'Email'}</label>
            <input
              id="reset-input"
              type={confirm ? 'password' : 'email'}
              autoComplete={confirm ? 'new-password' : 'email'}
              value={confirm ? password : email}
              onChange={(event) => (confirm ? setPassword(event.target.value) : setEmail(event.target.value))}
              minLength={confirm ? 8 : undefined}
              maxLength={confirm ? 72 : 254}
              required
              data-test-id={confirm ? 'reset-password' : 'reset-email'}
              className="px-2 mb-3 w-full h-10 bg-gray3 focus:bg-white rounded-sm"
            />
            {error && (
              <p role="alert" className="mb-3 text-red-600">
                {error}
              </p>
            )}
            <button type="submit" disabled={busy} data-test-id="reset-submit" className="py-2 w-full text-white bg-green7 hover:bg-green6 disabled:opacity-50">
              {busy ? 'Please wait…' : confirm ? 'Update password' : 'Send reset link'}
            </button>
          </form>
        )}
        <Link className="mt-4 text-sm text-center underline" to="/login">
          Back to login
        </Link>
        {confirm && (
          <Link className="mt-4 text-sm text-center underline" to="/forgot-password">
            Request a new reset link
          </Link>
        )}
      </div>
      <img alt="" className="gap-x-5 self-center place-self-center" src={loginImg} />
    </div>
  );
};

export default PasswordReset;
