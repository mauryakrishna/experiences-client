import React from 'react';

import { Button } from '@chakra-ui/core';

const CustomButton = props => {
  return (
    <Button mr={3} my="3" variantColor="teal" variant="outline" {...props}>
      {props.children}
    </Button>
  );
};

export default CustomButton;
