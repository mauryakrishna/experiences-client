import React from 'react';
import PropTypes from 'prop-types';
import { Text } from '@chakra-ui/core';

const InspireText = props => {
  return (
    <Text fontSize={{ base: '1rem', sm: '2rem', md: '3rem' }} fontWeight="700">
      {props.children}
    </Text>
  );
};

InspireText.propTypes = {
  children: PropTypes.node.isRequired,
};

export default InspireText;
