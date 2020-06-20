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

import Link from '../../components/Link';
import s from './Home.css';

export default function Home() {
  useStyles(s);
  const GET_EXPERIENCES_QUERY = gql`
    query getExperiences {
      getExperiences {
        title
        slug
        slugkey
      }
    }
  `;

  const { loading, data, error } = useQuery(GET_EXPERIENCES_QUERY);

  if (loading || error) {
    return null;
  }

  const experiences = data.getExperiences;

  return (
    <div className={s.root}>
      <div className={s.container}>
        {experiences.map(({ title, slug, slugkey }, index) => {
          const link = `${slug}-${slugkey}`;
          return (
            <Link to={link} key={index}>
              {title}
            </Link>
          );
        })}
      </div>
    </div>
  );
}

Home.propTypes = {};
