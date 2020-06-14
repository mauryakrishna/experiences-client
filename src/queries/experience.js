/* eslint-disable import/prefer-default-export */
import gql from 'graphql-tag';

export const GET_EXPERIENCE_ID = gql`
  query {
    id @client
  }
`;
