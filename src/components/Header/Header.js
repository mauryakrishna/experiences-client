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
import { useQuery } from 'react-apollo-hooks';
import gql from 'graphql-tag';
import s from './Header.css';
import Link from '../Link';
import Authenticate from './Authenticate';
import SignUp from '../../auth/signup';

export default function Header() {
  useStyles(s);

  return (
    <div className={s.root}>
      <div className={s.container}>
        <Link className={s.brand} to="/">
          Experiences
        </Link>
        <Authenticate />
        <SignUp />
      </div>
    </div>
  );
}
