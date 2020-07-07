/* eslint-disable no-shadow */
import useStyles from 'isomorphic-style-loader/useStyles';
import React from 'react';
import PropTypes from 'prop-types';
import { useQuery, useApolloClient } from 'react-apollo-hooks';
import gql from 'graphql-tag';

import s from './Editor.css';
import Layout from '../../components/Editor/Layout';
import PublishExperience from '../../components/Publish/PublishExperience';

export default function Editor({ slugkey }) {
  useStyles(s);

  const client = useApolloClient();
  const cacheData = {
    data: {
      id: null,
      title: null,
      experience: null,
    },
  };

  // edit flow when an experience exist.
  if (slugkey) {
    const GET_AN_EXPERIENCE_QUERY = gql`
      query getAnExperience($slugkey: String!) {
        getAnExperience(slugkey: $slugkey) {
          id
          title
          experience
        }
      }
    `;

    const { loading, data } = useQuery(GET_AN_EXPERIENCE_QUERY, {
      variables: {
        slugkey,
      },
    });

    if (loading) {
      return <span>loading experience for edit...</span>;
    }

    if (data) {
      const { id, title, experience } = data.getAnExperience;
      client.writeData({
        data: {
          id,
          title,
          experience,
        },
      });
    }
  } else {
    client.writeData(cacheData);
  }

  return (
    <div className={s.root}>
      <div className={s.container}>
        <PublishExperience />
        <Layout />
      </div>
    </div>
  );
}

Editor.propTypes = {
  slugkey: PropTypes.string,
};

Editor.defaultProps = {
  slugkey: null,
};
