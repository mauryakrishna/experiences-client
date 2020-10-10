import React, { useState, createContext } from 'react';
import PropTypes from 'prop-types';
import localStorage from 'local-storage';

const UserContext = createContext();

const { Provider } = UserContext;

export const UserProvider = props => {
  const [loggedin, setLoggedIn] = useState(localStorage.get('loggedin'));

  return (
    <Provider value={{ loggedin, setLoggedIn }}>{props.children}</Provider>
  );
};

UserProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default UserContext;
