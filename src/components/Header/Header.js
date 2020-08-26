/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-present Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import useStyles from 'isomorphic-style-loader/useStyles';
import React from 'react';

import { Grid, Box } from '@chakra-ui/core';

import s from './Header.css';
import Link from '../Link';
import Authenticate from './Authenticate';
import SignUp from '../../auth/signup';
import Logout from './Logout';

export default function Header() {
  useStyles(s);

  return (
    <Grid templateColumns="repeat(2, 2fr)" gap={3}>
      <Box border="1px" borderColor="green.200" w="100%" height="40px" p={3}>
        <Link className={s.brand} to="/">
          Experiences
        </Link>
      </Box>
      <Box
        border="1px"
        borderColor="green.200"
        w="100%"
        height="40px"
        p={3}
        textAlign="center"
      >
        <Authenticate />
      </Box>
    </Grid>
  );
}
