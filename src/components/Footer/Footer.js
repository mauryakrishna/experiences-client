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
import { Flex, Text, Divider } from '@chakra-ui/core';
import s from './Footer.css';
import Link from '../Link';

export default function Footer() {
  useStyles(s);

  return (
    <Flex bg="green.50">
      <div className={s.root}>
        <div className={s.container}>
          <Flex align="flex-end">
            <span className={s.text}>© Your Company</span>
            <Divider
              orientation="vertical"
              borderColor="teal.500"
              borderWidth="2"
            />
            <Link className={s.link} to="/">
              Home
            </Link>
            <Divider
              orientation="vertical"
              borderColor="teal.500"
              borderWidth="2"
            />
            <Link className={s.link} to="/about">
              About
            </Link>
            <Divider
              orientation="vertical"
              borderColor="teal.500"
              borderWidth="2"
            />
            <Link className={s.link} to="/privacy">
              Privacy
            </Link>
          </Flex>
        </div>
      </div>
    </Flex>
  );
}
