import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {
  Flex,
  Box,
  Heading,
  FormControl,
  Input,
  Button,
  CircularProgress,
  InputGroup,
  InputRightElement,
  Icon,
} from '@chakra-ui/core';

import LoginAPI from './LoginAPI';
import ErrorMessage from './ErrorMessage';

export default function Login({ loginCallback }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async event => {
    event.preventDefault();

    setIsLoading(true);

    try {
      const { exist, author, token } = await LoginAPI(email, password);
      if (!exist) {
        setError('User did not exist.');
      } else if (exist && author && token) {
        setError('');
        loginCallback(author);
      } else {
        setError('Login failed.');
      }
      setIsLoading(false);
      setShowPassword(false);
      // eslint-disable-next-line no-shadow
    } catch (error) {
      setError('Invalid username or password');
      setIsLoading(false);
      setShowPassword(false);
    }
  };

  const handlePasswordVisibility = () => setShowPassword(!showPassword);

  return (
    <Flex width="full" align="center" justifyContent="center">
      <Box p={8} width="100%">
        <Box textAlign="center">
          <Heading>Login</Heading>
        </Box>
        <Box my={4} textAlign="left">
          <form onSubmit={handleSubmit}>
            {error && <ErrorMessage message={error} />}
            <FormControl isRequired mt={6}>
              <Input
                type="email"
                placeholder="Email address"
                size="lg"
                onChange={event => setEmail(event.currentTarget.value)}
              />
            </FormControl>
            <FormControl isRequired mt={6}>
              <InputGroup>
                <Input
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Password"
                  size="lg"
                  onChange={event => setPassword(event.currentTarget.value)}
                />
                <InputRightElement width="3rem">
                  <Button
                    h="1.5rem"
                    size="sm"
                    onClick={handlePasswordVisibility}
                  >
                    {showPassword ? (
                      <Icon name="view-off" />
                    ) : (
                      <Icon name="view" />
                    )}
                  </Button>
                </InputRightElement>
              </InputGroup>
            </FormControl>
            <Button
              variantColor="teal"
              variant="outline"
              type="submit"
              width="full"
              mt={4}
            >
              {isLoading ? (
                <CircularProgress isIndeterminate size="24px" color="teal" />
              ) : (
                'Sign In'
              )}
            </Button>
          </form>
        </Box>
      </Box>
    </Flex>
  );
}

Login.propTypes = {
  loginCallback: PropTypes.func.isRequired,
};
