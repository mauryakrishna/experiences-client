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
} from '@chakra-ui/core';

import ForgotPasswordAPI from './ForgotPasswordAPI';
import { ErrorMessage, TextLikeLink } from '../UIElements';

export default function ForgotPassword({ toggle }) {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [showMessage, setShowMessage] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const showLoginForm = () => {
    // setting it true will show login form and hide this forgot password form
    toggle(true);
  };

  const handleSubmit = async event => {
    event.preventDefault();

    setIsLoading(true);

    try {
      const { emailsent } = await ForgotPasswordAPI(email);
      if (emailsent) {
        setShowMessage(true);
      } else {
        setError('');
      }
      setIsLoading(false);
    } catch (err) {
      setError('');
      setIsLoading(false);
    }
  };

  return (
    <Flex width="full" align="center" justifyContent="center">
      <Box p={8} width="100%">
        {showMessage ? (
          <Box>
            An email has been sent to your registered email id. Kindly follow
            the link therein to reset your password.
          </Box>
        ) : (
          <>
            <Box textAlign="center">
              <Heading size="lg">Forgot Password</Heading>
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
                <Button
                  variantColor="teal"
                  variant="outline"
                  type="submit"
                  width="full"
                  mt={4}
                >
                  {isLoading ? (
                    <CircularProgress
                      isIndeterminate
                      size="24px"
                      color="teal"
                    />
                  ) : (
                    'Submit'
                  )}
                </Button>
              </form>
            </Box>
            <Box>
              <TextLikeLink onClick={showLoginForm}>
                Login with credentials.
              </TextLikeLink>
            </Box>
          </>
        )}
      </Box>
    </Flex>
  );
}

ForgotPassword.propTypes = {
  toggle: PropTypes.func.isRequired,
};
