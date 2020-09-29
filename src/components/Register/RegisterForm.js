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

import RegisterAPI from './RegisterAPI';
import ErrorMessage from '../UIElements/ErrorMessage';

export default function Register({ registerCallback }) {
  const [email, setEmail] = useState('abc@gmail.com');
  const [password, setPassword] = useState('pwd');
  const [displayname, setDisplayname] = useState('display');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async event => {
    event.preventDefault();

    setIsLoading(true);

    try {
      const { exist, author, token, message } = await RegisterAPI(
        email,
        password,
        displayname,
        Intl.DateTimeFormat().resolvedOptions().timeZone,
      );

      if (exist) {
        setError('User already exists.');
      } else if (!exist && author && token) {
        setError('');
        registerCallback(author, token);
      } else {
        setError(`Regiration failed. ${message}`);
      }
      setIsLoading(false);
      setShowPassword(false);
      // eslint-disable-next-line no-shadow
    } catch (error) {
      setError('Something went wrong. Try again in sometime.');
      setIsLoading(false);
      setShowPassword(false);
    }
  };

  const handlePasswordVisibility = () => setShowPassword(!showPassword);

  return (
    <Flex width="full" align="center" justifyContent="center">
      <Box p={8} width="100%">
        <Box textAlign="center">
          <Heading>Register</Heading>
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
                  minLength="6"
                  maxLength="14"
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
            <FormControl isRequired mt={6}>
              <Input
                minHeight="3"
                maxLength="30"
                type="text"
                placeholder="Display name"
                size="lg"
                onChange={event => setDisplayname(event.currentTarget.value)}
              />
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
                'Register'
              )}
            </Button>
          </form>
        </Box>
      </Box>
    </Flex>
  );
}

Register.propTypes = {
  registerCallback: PropTypes.func.isRequired,
};
