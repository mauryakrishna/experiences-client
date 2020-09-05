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
  const breakpoints = ['20em', '30em', '48em', '62em', '80em'];
  breakpoints.xs = breakpoints[0];
  breakpoints.sm = breakpoints[1];
  breakpoints.md = breakpoints[2];
  breakpoints.lg = breakpoints[3];
  breakpoints.xl = breakpoints[4];

  const customTheme = {
    ...theme,
    breakpoints,
  };

  console.log('breakpoints', theme);
  return (
    <ThemeProvider theme={customTheme}>
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
