import React from 'react';
import useStyles from 'isomorphic-style-loader/useStyles';
import { Box } from '@chakra-ui/core';

import s from './Loading.css';

export default () => {
  useStyles(s);
  return (
    <Box>
      <div className={s.loader}>Loading...</div>
    </Box>
  );
};
