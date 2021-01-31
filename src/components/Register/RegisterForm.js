import React, { useState, useRef, useEffect } from 'react';

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
import { ErrorMessage, InfoMessage, SuccessMessage, DisplayAcceptText, TextLikeLink } from '../UIElements';
import ResendActivationEmail from '../ResendActivation';

export default function Register() {
  const emailAddressRef = useRef();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [displayname, setDisplayname] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showMailSentMsg, setShowMailSentMsg] = useState(false);
  const [showActivationForm, setShowActivationForm] = useState(false);
  const [exist, setExist] = useState(false);

  const resendEmailVerification = () => {
    setShowActivationForm(!showActivationForm);
  }
  const handleSubmit = async event => {
    event.preventDefault();

    setIsLoading(true);

    try {
      const { exist } = await RegisterAPI(
        email,
        password,
        displayname,
        Intl.DateTimeFormat().resolvedOptions().timeZone,
      );

      if (exist) {
        setError(`User already exists.`);
        setExist(true);
      } else if (!exist) {
        // show mail sent message
        setShowMailSentMsg(true);
      } else {
        setError(`Regiration failed.`);
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

  useEffect(()=> {
    emailAddressRef.current.focus();
  }, []);

  const handlePasswordVisibility = () => setShowPassword(!showPassword);

  return (
    <Flex width="full" align="center" justifyContent="center">
      <Box p={4} width="100%">
        {!showActivationForm && <>
          <Box textAlign="center">
            <Heading size="lg">Register</Heading>
          </Box>
          {showMailSentMsg ? (
            <SuccessMessage>
              An email has been sent to your registered email addrees. Kindly
              follow the instruction to activate your account.
            </SuccessMessage>
          ) : (
              <Box my={4} textAlign="left">
                <form onSubmit={handleSubmit}>
                  {error && <ErrorMessage>{error}</ErrorMessage>}
                  {exist && <InfoMessage>
                    If you registered previously but could not activate the account.{' '}
                    <TextLikeLink onClick={resendEmailVerification}>Request another verification email.</TextLikeLink>
                  </InfoMessage>
                  }
                  <FormControl isRequired mt={6}>
                    <Input
                      ref={emailAddressRef}
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
                  <DisplayAcceptText />
                  <Button
                    variantColor="teal"
                    variant="outline"
                    type="submit"
                    width="full"
                    mt={1}
                  >
                    {isLoading ? (
                      <CircularProgress isIndeterminate size="24px" color="teal" />
                    ) : (
                        'Register'
                      )}
                  </Button>
                </form>
              </Box>
            )}
        </>
        }
        {
          showActivationForm ? (
            <ResendActivationEmail resendinvitetext="Go for registration" resendemail={email} toggle={resendEmailVerification} />
          ) : (
              <TextLikeLink onClick={resendEmailVerification}>
                Resend email verification link
              </TextLikeLink>
            )
        }
      </Box>
    </Flex>
  );
}
