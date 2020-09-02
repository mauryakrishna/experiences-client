import React from 'react';
import { IconButton } from '@chakra-ui/core';

const CustomIconButton = React.forwardRef((props, ref) => {
  return (
    <IconButton
      variant="outline"
      variantColor="teal"
      ref={ref}
      mx="3px"
      {...props}
    />
  );
});

export default CustomIconButton;
