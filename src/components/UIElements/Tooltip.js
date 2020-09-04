import React from 'react';
import { Tooltip } from '@chakra-ui/core';

const CustomTooltip = React.forwardRef((props, ref) => {
  return (
    <Tooltip ref={ref} hasArrow placement="top" {...props}>
      {props.children}
    </Tooltip>
  );
});

export default CustomTooltip;
