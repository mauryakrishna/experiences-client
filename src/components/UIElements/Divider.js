import React from 'react';

import { Divider } from '@chakra-ui/core';

const CustomDvider = props => {
  return (
    <Divider
      {...props}
      orientation="vertical"
      borderColor="teal.500"
      borderWidth="2"
    />
  );
};

export default CustomDvider;
