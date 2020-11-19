import React from 'react';
import PropTypes from 'prop-types';
import { Text } from '@chakra-ui/core';

export default function LegalText(props) {
  return (
    <Text
      textAlign="center"
      m="5px"
      fontWeight="300"
      color="gray"
      fontSize={{ base: '0.5rem', sm: '0.7rem', md: '0.7rem' }} {...props}>{props.children}</Text>
  );
}
LegalText.propTypes = {
  children: PropTypes.node.isRequired,
};
