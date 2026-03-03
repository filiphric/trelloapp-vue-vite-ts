import React from 'react';
import { useStore } from '@/store/store';
import { useNavigate, Link } from 'react-router-dom';
import signupImg from '@/assets/signup.png';

const Signup: React.FC = () => {
  const navigate = useNavigate();
  const signup = useStore((s) => s.signup);
  const signupForm = useStore((s) => s.signupForm);

  const setSignupForm = (field: string, value: any) => {
    useStore.setState({ signupForm: { ...signupForm, [field]: value } });
  };

  const handleSignup = () => {
    signup(signupForm.email, signupForm.password, signupForm.welcomeEmail).then(() => {
      navigate('/');
    });
  };

  return (
    <div className="grid grid-cols-2 gap-x-8 items-stretch px-28 -mt-10 h-screen">
      <div className="grid content-center">
        <h1 className="mb-8 text-3xl font-bold">Create a new account</h1>
        <label htmlFor="email">Email</label>
        <input
          value={signupForm.email}
          onChange={(e) => setSignupForm('email', e.target.value)}
          className="px-2 mb-3 w-full h-10 bg-gray3 focus:bg-white rounded-sm"
          placeholder="Email"
          name="email"
          data-test-id="signup-email"
        />
        <label htmlFor="password">Password</label>
        <input
          value={signupForm.password}
          onChange={(e) => setSignupForm('password', e.target.value)}
          type="password"
          className="px-2 mb-3 w-full h-10 bg-gray3 focus:bg-white rounded-sm"
          data-test-id="signup-password"
          placeholder="Password"
          name="password"
          onKeyUp={(e) => {
            if (e.key === 'Enter') handleSignup();
          }}
        />
        <div className="mb-4">
          <input
            checked={signupForm.welcomeEmail}
            onChange={(e) => setSignupForm('welcomeEmail', e.target.checked)}
            type="checkbox"
            name="welcomeEmail"
            className="mr-2"
          />
          <label className="text-sm" htmlFor="welcomeEmail">
            Send me a welcome email
          </label>
        </div>
        <button className="py-2 w-full text-white bg-green7 hover:bg-green6" data-test-id="signup-submit" onClick={handleSignup}>
          Create account
        </button>
        <Link className="mt-4 text-sm text-center underline" to="/login">
          Already have an account? Log in here
        </Link>
      </div>
      <img className="gap-x-5 self-center place-self-center" src={signupImg} />
    </div>
  );
};

export default Signup;
