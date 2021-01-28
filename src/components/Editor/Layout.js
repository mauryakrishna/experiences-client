/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import { Box, Flex } from "@chakra-ui/core";
import Editor from './Editor';
import Title from './Title';

const Layout = ({ cb }) => {
  return (
    <React.Fragment>
      <Title cb={cb} />
      <Editor cb={cb} />
    </React.Fragment>
  );
};

export default Layout;
