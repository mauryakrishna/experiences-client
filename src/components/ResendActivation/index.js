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

import ResendActivationEmailAPI from './ResendActivationEmailAPI';
import { ErrorMessage, TextLikeLink } from '../UIElements';
import SuccessMessage from '../UIElements/AuthFlow/SuccessMessage';

export default function ResendActivationEmail({ toggle, resendemail, resendinvitetext }) {
  const [email, setEmail] = useState(resendemail || '');
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
      const { resendsuccess } = await ResendActivationEmailAPI(email);
      if (!resendsuccess) {
        setError('Could not sent an email.');
      }
      setShowMessage(true);
      setIsLoading(false);
    } catch (err) {
      setIsLoading(false);
    }
  };

  return (
    <Flex width="full" align="center" justifyContent="center">
      <Box p={4} width="100%">
        <Box textAlign="center">
          <Heading size="lg">Resend verification email</Heading>
        </Box>
        {showMessage ? (
          <SuccessMessage>
            An email has been sent to your registered email addrees. Kindly
            follow the instruction to activate your account..
          </SuccessMessage>
        ) : (
            <>
              <Box my={4} textAlign="left">
                <form onSubmit={handleSubmit}>
                  {error && <ErrorMessage>{error}</ErrorMessage>}
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
                  {resendinvitetext}
                </TextLikeLink>
              </Box>
            </>
          )}
      </Box>
    </Flex>
  );
}

ResendActivationEmail.defaultProps = {
  resendemail: null,
};

ResendActivationEmail.propTypes = {
  toggle: PropTypes.func.isRequired,
  resendemail: PropTypes.string,
};
