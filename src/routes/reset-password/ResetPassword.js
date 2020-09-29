import React, { useState } from 'react';
import {
  Text,
  Flex,
  Box,
  Heading,
  FormControl,
  Input,
  Button,
  CircularProgress,
  FormLabel,
} from '@chakra-ui/core';

import { ErrorMessage } from '../../components/UIElements';
import ResetPasswordAPI from './ResetPasswordAPI';

export default async ({ requestkey }) => {
  const [newpassword, setNewPassword] = useState('');
  const [confirmpassword, setConfirmPassword] = useState('');
  const [msgPwdMishmatch, setMsgPwdMisMatch] = useState('');
  const [error, setError] = useState('');
  const [showMessage, setShowMessage] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async event => {
    event.preventDefault();

    setIsLoading(true);

    const { passwordupdated, validrequest } = await ResetPasswordAPI(
      newpassword,
      requestkey,
    );

    try {
      if (passwordupdated) {
        setShowMessage(true);
      } else if (!validrequest) {
        setError('Request expired. Kindly request again and try.');
      }
      setIsLoading(false);
    } catch (err) {
      setError('Could not update password.');
      setIsLoading(false);
    }
  };

  const comparePasswords = confirmpwd => {
    return !(newpassword === confirmpwd);
  };

  const onConfirmPasswordChange = value => {
    setConfirmPassword(value);
    setMsgPwdMisMatch(comparePasswords(value));
  };

  return (
    <Flex width="full" align="center" justifyContent="center">
      <Box p={8} width="100%">
        <Box textAlign="center">
          <Heading as="h4">Login</Heading>
        </Box>
        <Box my={4} textAlign="left">
          {!showMessage ? (
            <form onSubmit={handleSubmit}>
              {error && <ErrorMessage message={error} />}
              <FormControl isRequired mt={6}>
                <FormLabel>
                  Password length should be minimum 6 and maximum 14 characters.
                </FormLabel>
                <Input
                  minLength="6"
                  maxLength="14"
                  type="password"
                  placeholder="New password"
                  size="lg"
                  onChange={event => setNewPassword(event.currentTarget.value)}
                />
              </FormControl>
              <FormControl isRequired mt={6}>
                <Input
                  type="password"
                  placeholder="Confirm Password"
                  size="lg"
                  onChange={event =>
                    onConfirmPasswordChange(event.currentTarget.value)
                  }
                />
              </FormControl>
              {msgPwdMishmatch && <Text> Password did not match.</Text>}
              <Button
                variantColor="teal"
                variant="outline"
                type="submit"
                width="full"
                mt={4}
                isDisabled={msgPwdMishmatch}
              >
                {isLoading ? (
                  <CircularProgress isIndeterminate size="24px" color="teal" />
                ) : (
                  'Submit'
                )}
              </Button>
            </form>
          ) : (
            <Text>Password updated successfully. </Text>
          )}
        </Box>
      </Box>
    </Flex>
  );
};
