import React from 'react';
import { Icon } from '@chakra-ui/core';

const CustomIcon = React.forwardRef((props, ref) => {
  return <Icon ref={ref} mx="3px" {...props} />;
});

export default CustomIcon;
