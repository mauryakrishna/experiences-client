import React from 'react';
import { PseudoBox, Link } from '@chakra-ui/core';

export default () => {
  const logout = () => {
    window.location.href = `${window.location.origin}/logout`;
  };

  return (
    <PseudoBox as="button" onClick={logout}>
      Logout
    </PseudoBox>
  );
};
