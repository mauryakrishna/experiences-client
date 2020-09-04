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

import { Box, Flex, Heading } from '@chakra-ui/core';

import s from './Header.css';
import Link from '../Link';
import Authenticate from './Authenticate';

export default function Header() {
  useStyles(s);

  return (
    <Flex
      as="nav"
      align="center"
      justify="space-between"
      wrap="wrap"
      padding="1rem"
      bg="teal.500"
      color="white"
    >
      <Flex align="center" mr={3}>
        <Heading as="h3" size={['xs', 'sm', 'md', 'lg']} letterSpacing="-.1rem">
          <Link className={s.brand} to="/">
            Experiences
          </Link>
        </Heading>
      </Flex>

      <Box>
        <Authenticate />
      </Box>
    </Flex>
  );
}
