import React from 'react';
import PropTypes from 'prop-types';
import { Button } from '@chakra-ui/core';

const CustomButton = props => {
  return (
    <Button mr={3} my="3" variantColor="teal" variant="outline" {...props}>
      {props.children}
    </Button>
  );
};

CustomButton.propTypes = {
  children: PropTypes.node.isRequired,
};

export default CustomButton;
