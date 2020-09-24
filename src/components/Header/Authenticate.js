import React, { useState, useEffect } from 'react';
import { useQuery } from 'react-apollo-hooks';
import gql from 'graphql-tag';
import localStorage from 'local-storage';

import {
  Text,
  Flex,
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

import Login from '../Login';
import Link from '../Link';
import Logout from './Logout';
import Register from '../Register';

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
              p={2}
              bg="transparent"
              borderColor="white"
              borderWidth="1px"
              borderRadius="4px"
              _hover={{
                bg: 'transparent',
                color: ' white',
                borderColor: 'white',
                borderWidth: '1px',
                rounded: '4px',
              }}
              rightIcon="chevron-down"
            >
              <Text
                fontSize={{ base: '0.9rem', sm: '1rem' }}
                maxW={{ base: 40, sm: 48 }}
              >
                {authorname}
                <Icon name="chevron-down" color="white" />
              </Text>
            </PseudoBox>
          </PopoverTrigger>
          <PopoverContent zIndex={4} width="180px">
            <PopoverArrow />
            <PopoverBody>
              <Box textDecoration="none">
                <Link to="/writeanexperience">Write an Experience</Link>
              </Box>
              <Divider />
              <Box textDecoration="none">
                <Link to={`/author/${localStorage.get('username')}`}>
                  My Page
                </Link>
              </Box>
              <Divider />
              <Box textDecoration="none">
                <Logout />
              </Box>
            </PopoverBody>
          </PopoverContent>
        </Popover>
      ) : (
        <Flex align="center">
          <Flex bg="transparent" align="flex-end">
            <Login />
          </Flex>
          {/* The flex below may not be right but worked so continued */}
          <Flex w="1px" h="20px" backgroundColor="white" mx={2} />
          <Flex
            bg="transparent"
            align="center"
            justify="center"
            fontWeight="500"
          >
            <Register />
          </Flex>
        </Flex>
      )}
    </>
  );
};
