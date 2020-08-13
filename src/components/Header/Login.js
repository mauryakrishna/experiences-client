import React from 'react';

export default () => {
  const redirect = url => {
    window.location.href = url;
  };

  const facebook = () => {
    redirect(`http://localhost:3000/login/facebook`);
  };

  return (
    <>
      <button type="button" onClick={facebook}>
        Login with Facebook
      </button>
    </>
  );
};
