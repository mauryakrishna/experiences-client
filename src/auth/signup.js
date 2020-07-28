import React from 'react';
import gql from 'graphql-tag';
import { useQuery, useApolloClient } from 'react-apollo-hooks';

export default () => {
  const onClick = () => {
    console.log('click');
    window.location.href = 'http://localhost:3000/login/facebook';
  };
  return (
    <div>
      <button type="button" onClick={onClick}>
        Login with Facebook
      </button>
      <a href="http://localhost:3000/register/facebook">
        Register with Facebook
      </a>
    </div>
  );
};
