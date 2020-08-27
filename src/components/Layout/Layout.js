/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-present Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import useStyles from 'isomorphic-style-loader/useStyles';
import React from 'react';
import PropTypes from 'prop-types';
import { ThemeProvider, CSSReset, theme, Grid, Divider } from '@chakra-ui/core';

// external-global styles must be imported in your JS.
import s from './Layout.css';
import Header from '../Header';
import Footer from '../Footer';

export default function Layout({ children }) {
  useStyles(s);

  return (
    <ThemeProvider theme={theme}>
      <CSSReset />
      <div className={s.root}>
        <div className={s.container}>
          <Grid>
            <Grid>
              <Header />
            </Grid>
            <Divider borderColor="gray.200" marginTop="0" opacity="0.1" />
            <Grid>{children}</Grid>
            <Grid>
              <Footer />
            </Grid>
          </Grid>
        </div>
      </div>
    </ThemeProvider>
  );
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};
