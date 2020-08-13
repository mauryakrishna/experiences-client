/* eslint-disable import/prefer-default-export */
import gql from 'graphql-tag';

export const GET_AUTHOR_DISPLAYNAME = gql`
  query {
    displayname @client
  }
`;

export const GET_AUTHOR_UID = gql`
  query {
    authoruid @client
  }
`;
