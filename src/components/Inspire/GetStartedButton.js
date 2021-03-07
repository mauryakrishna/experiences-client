import React, { useContext } from 'react';
import loadable from '@loadable/component';
import history from '../../history';
import UserContext from '../UserContext';
import Button from '../UIElements/Button';
import { WRITE_AN_EXPERIENCE_ROUTE } from "../../ConfigConstants"
const Register = loadable(()=> import('../Register'));

const GetStarted = () => {
  const context = useContext(UserContext);
  const handleClick = () => {
    history.push(`${WRITE_AN_EXPERIENCE_ROUTE}`);
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
