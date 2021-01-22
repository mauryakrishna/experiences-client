import React from 'react';
import { Box } from '@chakra-ui/core';
import { InfoMessage } from '.';

export default () => {
  return (
    <Box>
      <InfoMessage>
        Currently, editor is not supported on mobile devices.
        You can use the desktop browser to write you experiences and thoughts.
      </InfoMessage>
    </Box>
  )
}