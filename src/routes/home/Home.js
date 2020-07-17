/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-present Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import useStyles from 'isomorphic-style-loader/useStyles';
import React, { useState } from 'react';
import { useQuery } from 'react-apollo-hooks';
import gql from 'graphql-tag';

import Link from '../../components/Link';
import s from './Home.css';

export default function Home() {
  useStyles(s);
  const [experiences, setExperiences] = useState([]);
  const experiencePerPage = 10;
  const [cursor, setCursor] = useState(null);

  const GET_EXPERIENCES_QUERY = gql`
    query getExperiences($cursor: String, $experienceperpage: Int!) {
      getExperiences(cursor: $cursor, experienceperpage: $experienceperpage) {
        cursor
        experiences {
          title
          slug
          slugkey
          publishdate
        }
      }
    }
  `;

  const { loading, data, fetchMore } = useQuery(GET_EXPERIENCES_QUERY, {
    variables: { experienceperpage: experiencePerPage },
  });

  const loadMoreExperiences = () => {
    fetchMore({
      query: GET_EXPERIENCES_QUERY,
      variables: { cursor, experienceperpage: experiencePerPage },
      updateQuery: (prev, { fetchMoreResult }) => {
        const prevExp = prev.getExperiences.experiences;
        const newExp = fetchMoreResult.getExperiences.experiences;
        const updatedcursor = fetchMoreResult.getExperiences.cursor;
        const combined = [...prevExp, ...newExp];
        return {
          getExperiences: {
            cursor: updatedcursor,
            experiences: combined,
          },
        };
      },
    });
  };

  React.useEffect(() => {
    if (data) {
      const updatedexperiences = data.getExperiences.experiences;
      setExperiences(updatedexperiences);
      setCursor(data.getExperiences.cursor);
    }
  }, [data]);

  if (loading) {
    return <h4>loading...</h4>;
  }
  if (experiences.length === 0) {
    return <h3>No experiences to take you through.</h3>;
  }
  if (experiences.length > 0) {
    return (
      <div className={s.root}>
        <div className={s.container}>
          {experiences.map(({ title, slug, slugkey }) => {
            const link = `${slug}-${slugkey}`;
            return (
              <div key={slugkey}>
                <Link to={link}>{title}</Link>
              </div>
            );
          })}
        </div>
        <button type="button" onClick={loadMoreExperiences}>
          Load more...
        </button>
      </div>
    );
  }
}
