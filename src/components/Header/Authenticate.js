import React, { useState, useEffect } from 'react';
import { useQuery } from 'react-apollo-hooks';
import gql from 'graphql-tag';
import localStorage from 'local-storage';

import {
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuGroup,
  MenuDivider,
  MenuOptionGroup,
  MenuItemOption,
  Icon,
} from '@chakra-ui/core';
import Login from './Login';

export default () => {
  const [authorname, setAuthorname] = useState('');
  const [isvalid, setIsValid] = useState(false);

  const VERIFYME_QUERY = gql`
    query verifyMe {
      verifyMe {
        valid
        displayname
        authoruid
      }
    }
  `;
  const { loading, data } = useQuery(VERIFYME_QUERY);

  useEffect(() => {
    if (data && data.verifyMe) {
      const { valid, displayname, authoruid } = data.verifyMe;
      // if token not valid
      if (!valid) {
        // clear cookie from client side
      } else {
        setAuthorname(displayname);
        setIsValid(valid);
      }
      localStorage.set('username', authoruid);
      localStorage.set('loggedin', valid);
    }
  }, [data]);

  if (loading) {
    return <span>...</span>;
  }

  return (
    <>
      {isvalid ? (
        <Menu>
          <MenuButton borderWidth="1px" px={4} py={2}>
            {authorname}
          </MenuButton>
          <MenuList>
            <MenuItem>My Page</MenuItem>
            <MenuItem>Settings</MenuItem>
            <MenuItem>Logout</MenuItem>
          </MenuList>
        </Menu>
      ) : (
        <Login />
      )}
    </>
  );
};
