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
import Navigation from '../Navigation';
import SignUp from '../../auth/signup';

export default function Header() {
  useStyles(s);
  const EXAMPLE_QUERY = gql`
    query exampleQuery {
      examplequery {
        examplename
      }
    }
  `;

  const { loading, error, data } = useQuery(EXAMPLE_QUERY);

  if (loading || error) {
    return null;
  }

  return (
    <div className={s.root}>
      <div className={s.container}>
        <Navigation />
        <Link className={s.brand} to="/">
          Experiences
        </Link>
        <SignUp />
      </div>
    </div>
  );
}
