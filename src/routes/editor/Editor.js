/* eslint-disable no-shadow */
import { Box } from "@chakra-ui/core"
import React from 'react';
import PropTypes from 'prop-types';
import { useQuery, useApolloClient } from 'react-apollo-hooks';
import gql from 'graphql-tag';

import './Editor.css';
import Layout from '../../components/Editor/Layout';

export default function Editor({ slugkey }) {
  const client = useApolloClient();
  const cacheData = {
    data: {
      title: null,
      slugkey: null,
      experience: null,
      ispublished: null,
    },
  };

  // edit flow when an experience exist.
  if (slugkey) {
    const GET_AN_EXPERIENCE_QUERY = gql`
      query getAnExperienceForEdit($slugkey: String!) {
        getAnExperienceForEdit(slugkey: $slugkey) {
          title
          experience
          ispublished
        }
      }
    `;

    const { loading, data, error } = useQuery(GET_AN_EXPERIENCE_QUERY, {
      variables: {
        slugkey,
      },
    });

    if (loading) {
      return <span>loading experience for edit...</span>;
    }

    if (data.getAnExperienceForEdit) {
      const { title, experience, ispublished } = data.getAnExperienceForEdit;
      client.writeData({
        data: {
          title,
          slugkey,
          experience: JSON.stringify(experience),
          ispublished,
        },
      });
    } else {
      console.log('Error getAnExperience', error);
    }
  } else {
    client.writeData(cacheData);
  }

  
  return (
    <Box pl="20px" pr="20px">
      <Box margin="0 auto" maxWidth="768px" px={{ base: '1.5rem', sm: '2rem', md: '4rem' }}>
        <Layout />
      </Box>
    </Box>
  );
}

Editor.propTypes = {
  slugkey: PropTypes.string,
};

Editor.defaultProps = {
  slugkey: null,
};
