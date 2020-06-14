/* eslint-disable react/prop-types */
import React from 'react';
import { useApolloClient } from 'react-apollo-hooks';
import Editor from './Editor';
import Title from './Title';

const Layout = () => {
  const client = useApolloClient();
  client.writeData({
    data: {
      id: null,
    },
  });

  return (
    <React.Fragment>
      <Title />
      <Editor />
    </React.Fragment>
  );
};

export default Layout;
