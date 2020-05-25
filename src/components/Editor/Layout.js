/* eslint-disable react/prop-types */
import React from 'react';
import Editor from './Editor';
import Title from './Title';

const Layout = () => {
  return (
    <React.Fragment>
      <Title />
      <Editor />
    </React.Fragment>
  );
};

export default Layout;
