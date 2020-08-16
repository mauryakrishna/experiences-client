import React from 'react';

export default () => {
  const logout = () => {
    window.location.href = 'http://localhost:3000/logout';
  };

  return (
    <button type="button" onClick={logout}>
      Logout
    </button>
  );
};
