import React from 'react';

import { Divider } from '@chakra-ui/core';

const CustomDvider = props => {
  return (
    <Divider
      orientation="vertical"
      borderColor="teal.500"
      borderWidth="2"
      {...props}
    />
  );
};

export default CustomDvider;
