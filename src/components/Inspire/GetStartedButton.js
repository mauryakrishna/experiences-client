import React, { useContext } from 'react';
import history from '../../history';
import UserContext from '../UserContext';
import Register from '../Register';
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
