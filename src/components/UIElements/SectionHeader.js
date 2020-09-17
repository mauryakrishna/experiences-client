import React from 'react';
import { Text } from '@chakra-ui/core';

const SectionHeader = props => {
  return (
    <Text fontWeight="400" fontSize={{ sm: '1.4rem', md: '1.8rem' }} py={5}>
      {props.children}
    </Text>
  );
};

// eslint-disable-next-line import/prefer-default-export
export default SectionHeader;
