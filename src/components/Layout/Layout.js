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

import ErrorBoundary from '../ErrorBoundry';
import { UserProvider } from '../UserContext';
import Header from '../Header';
import Footer from '../Footer';

export default function Layout({ children, pathname }) {
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

  const showFooter = pathname !== '/writeanexperience';

  return (
    <ThemeProvider theme={customTheme}>
      <CSSReset />
      <ErrorBoundary>
        <UserProvider>
          <PseudoBox maxW="1000px" my="0" mx="auto" lineHeight="1.3">
            <Grid>
              <Grid>
                <Header />
              </Grid>
              <Divider borderColor="gray.200" marginTop="0" opacity="0.1" />

              <Grid minHeight="calc(90vh)">{children}</Grid>

              <Divider borderColor="gray.200" marginTop="0" opacity="0.1" />

              {showFooter && (
                <Grid>
                  <Footer />
                </Grid>
              )}
            </Grid>
          </PseudoBox>
        </UserProvider>
      </ErrorBoundary>
    </ThemeProvider>
  );
}

Layout.defaultProps = {
  pathname: null,
};
Layout.propTypes = {
  children: PropTypes.node.isRequired,
  pathname: PropTypes.string,
};
