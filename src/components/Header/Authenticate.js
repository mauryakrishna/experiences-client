import React, { useState, useEffect } from 'react';
import { useQuery } from 'react-apollo-hooks';
import gql from 'graphql-tag';
import localStorage from 'local-storage';

import {
  Button,
  Divider,
  Box,
  Icon,
  PseudoBox,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverBody,
  PopoverArrow,
} from '@chakra-ui/core';
import Login from './Login';
import Link from '../Link';

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
        <Popover usePortal>
          <PopoverTrigger>
            <PseudoBox
              as={Button}
              bg="transparent"
              borderColor="white"
              borderWidth="1px"
              _hover={{
                bg: 'transparent',
                color: ' white',
                borderColor: 'white',
                borderWidth: '1px',
                rounded: '4px',
              }}
              rightIcon="chevron-down"
            >
              {authorname} <Icon name="chevron-down" color="white" />
            </PseudoBox>
          </PopoverTrigger>
          <PopoverContent zIndex={4} width="180px">
            <PopoverArrow />
            <PopoverBody>
              <Box>
                <Link to="/writeanexperience">Write an Experience</Link>
              </Box>
              <Divider />
              <Box>
                <Link to={`/author/${localStorage.get('username')}`}>
                  My Page
                </Link>
              </Box>
              <Divider />
              <Box>
                <Link to="/logout">Logout</Link>
              </Box>
            </PopoverBody>
          </PopoverContent>
        </Popover>
      ) : (
        <Login />
      )}
    </>
  );
};
