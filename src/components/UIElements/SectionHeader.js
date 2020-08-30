import React from 'react';
import { Text } from '@chakra-ui/core';

const SectionHeader = props => {
  return (
    <Text fontWeight="bold" fontSize="18px" py={5}>
      {props.children}
    </Text>
  );
};

// eslint-disable-next-line import/prefer-default-export
export default SectionHeader;
