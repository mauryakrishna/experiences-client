import React from 'react';
import PropTypes from 'prop-types';
import { Box, Alert, AlertIcon, Text } from '@chakra-ui/core';

export default function Message(props) {
  return (
    <Box my={2}>
      <Alert borderRadius={4} {...props}>
        <AlertIcon />
        <Text fontSize="0.8rem">{props.children}</Text>
      </Alert>
    </Box>
  );
}
Message.propTypes = {
  children: PropTypes.node.isRequired,
};
