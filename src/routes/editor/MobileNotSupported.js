import React from 'React';
import { Box } from '@chakra-ui/core';
import { InfoMessage } from '../../components/UIElements';

export default () => {
  return (
    <Box>
      <InfoMessage>
        Currently, editor is not supported on mobile devices.
        You can use the desktop browser to write you experiences.
      </InfoMessage>
    </Box>
  )
}