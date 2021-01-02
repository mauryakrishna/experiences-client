import React, { useContext } from 'react';
import loadable from '@loadable/component';
const history = loadable(()=> import('../../history'));
const Register = loadable(()=> import('../Register'));
import UserContext from '../UserContext';
import { Button } from '../UIElements';

const GetStarted = () => {
  const context = useContext(UserContext);
  const handleClick = () => {
    history.push('/writeanexperience');
  };
  return (
    <>
      {context.loggedin ? (
        <Button position="relative" variant="solid" onClick={handleClick}>
          Get Started
        </Button>
      ) : (
        <Button variant="solid">
          <Register />
        </Button>
      )}
    </>
  );
};

export default GetStarted;
