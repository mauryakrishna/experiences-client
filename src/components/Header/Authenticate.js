import React, { useContext } from 'react';
import localStorage from 'local-storage';
import loadable from '@loadable/component';
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
import UserContext from "../UserContext";
const Login = loadable(()=> import('../Login'));
const Link = loadable(()=> import('../Link'));
const Register = loadable(()=> import('../Register'));
import { ClearLoginData } from '../SetLoginData';

export default () => {
  const authorname = localStorage.get('displayname');
  const userLoginContext = useContext(UserContext);

  const logout = () => {
    ClearLoginData();
    // redirect to home
    window.location.href = window.location.origin;
  };

  return (
    <>
      {userLoginContext.loggedin ? (
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
                <PseudoBox as="button" onClick={logout}>
                  Logout
                </PseudoBox>
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
