import React from 'react';

export default () => {
  const redirect = type => {
    window.location.href = `http://localhost:3000/${type}/facebook`;
  };

  const login = () => {
    redirect('login');
  };

  const register = () => {
    redirect('register');
  };

  return (
    <div>
      <button type="button" onClick={login}>
        Login with Facebook
      </button>
      <button type="button" onClick={register}>
        Register with Facebook
      </button>
    </div>
  );
};
