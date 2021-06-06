import React from 'react';
import PropTypes from 'prop-types';
import { Text } from '@chakra-ui/core';

const Title = props => {
  return (
    <Text
      fontWeight="500"
      fontSize={{ base: '1.2rem', md: '1.2rem' }}
      margin={3}
      width="95%"
      color="gray.800"
      {...props}
    >
      {props.children}
    </Text>
  );
};

Title.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Title;
