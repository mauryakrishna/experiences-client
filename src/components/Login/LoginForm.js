import React, { useState, useRef, useEffect, useContext } from 'react';
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
import UserContext from '../UserContext';
import { SetLoginData } from '../SetLoginData';

import ResendActivationEmail from '../ResendActivation';

import LoginAPI from './LoginAPI';
import { ErrorMessage, TextLikeLink } from '../UIElements';
import InfoMessage from '../UIElements/AuthFlow/InfoMessage';

export default function Login({ loginCallback, toggle }) {
  const { setLoggedIn } = useContext(UserContext);
  const loginInputRef = useRef();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showActivationForm, setShowActivationForm] = useState(false);
  const [
    showMsgForEmailVerification,
    setShowMsgForEmailVerification,
  ] = useState(false);
  const showForgotpasswordForm = () => {
    // setting false will hide login form and make forgot password form visible
    toggle(false);
  };

  useEffect(()=> {
    loginInputRef.current.focus();
  }, []);

  const handleSubmit = async event => {
    event.preventDefault();

    setIsLoading(true);

    try {
      const { exist, author, token, isemailverified } = await LoginAPI(
        email,
        password,
      );
      // the below line placed just after the api response so as to avoid warning of updating unmounted component 
      setIsLoading(false);
      if (!exist) {
        setError('User did not exist.');
      } else if (exist && !isemailverified) {
        setShowMsgForEmailVerification(true);
      } else if (exist && author && token) {
        setError('');
        loginCallback(author, token);
        SetLoginData(author, token);
        // set user context data for login state
        setLoggedIn(true);
      } else {
        setError('Login failed.');
      }
      setShowPassword(false);
      // eslint-disable-next-line no-shadow
    } catch (error) {
      setError('Invalid username or password');
      setIsLoading(false);
      setShowPassword(false);
    }
  };

  const resendEmailVerification = () => {
    setShowActivationForm(!showActivationForm);
  };

  const handlePasswordVisibility = () => setShowPassword(!showPassword);

  return showActivationForm ? (
    <ResendActivationEmail
      resendemail={email}
      resendinvitetext="Login with credentials."
      toggle={resendEmailVerification}
    />
  ) : (
      <Flex width="full" align="center" justifyContent="center">
        <Box p={4} width="100%">
          <Box textAlign="center">
            <Heading size="lg">Login</Heading>
          </Box>
          {showMsgForEmailVerification && (
            <InfoMessage>
              This email address is not verified. Follow the link in verification
            email to verify it. You can request to{' '}
              <TextLikeLink onClick={resendEmailVerification}>
                send it again
            </TextLikeLink>
            .
            </InfoMessage>
          )}
          <Box my={4} textAlign="left">
            <form onSubmit={handleSubmit}>
              {error && <ErrorMessage>{error}</ErrorMessage>}
              <FormControl isRequired mt={6}>
                <Input
                  ref={loginInputRef}
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
                <TextLikeLink onClick={showForgotpasswordForm}>
                  Forgot password?
              </TextLikeLink>
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
  toggle: PropTypes.func.isRequired,
};
