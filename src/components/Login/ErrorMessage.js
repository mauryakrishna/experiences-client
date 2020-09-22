import React from 'react';
import PropTypes from 'prop-types';
import { Box, Alert, AlertIcon, AlertDescription } from '@chakra-ui/core';

export default function ErrorMessage({ message }) {
  return (
    <Box my={4}>
      <Alert status="error" borderRadius={4}>
        <AlertIcon />
        <AlertDescription>{message}</AlertDescription>
      </Alert>
    </Box>
  );
}

ErrorMessage.propTypes = {
  message: PropTypes.string.isRequired,
};
