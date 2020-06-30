/* eslint-disable import/prefer-default-export */
import gql from 'graphql-tag';

export const GET_EXPERIENCE_ID = gql`
  query {
    id @client
  }
`;

export const GET_EXPERIENCE_TITLE = gql`
  query {
    title @client
  }
`;

export const GET_EXPERIENCE_EXPERIENCE = gql`
  query {
    experience @client
  }
`;
