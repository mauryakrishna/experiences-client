import React from 'react';
import PropTypes from 'prop-types';
import {
  ThemeProvider,
  CSSReset,
  theme,
  Grid,
  Divider,
  PseudoBox,
} from '@chakra-ui/core';

import Header from '../Header';
import Footer from '../Footer';

export default function Layout({ children }) {
  return (
    <ThemeProvider theme={theme}>
      <CSSReset />
      <PseudoBox maxW="1000px" my="0" mx="auto">
        <Grid>
          <Grid>
            <Header />
          </Grid>
          <Divider borderColor="gray.200" marginTop="0" opacity="0.1" />
          <Grid>{children}</Grid>
          <Divider borderColor="gray.200" marginTop="0" opacity="0.1" />
          <Grid>
            <Footer />
          </Grid>
        </Grid>
      </PseudoBox>
    </ThemeProvider>
  );
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};
