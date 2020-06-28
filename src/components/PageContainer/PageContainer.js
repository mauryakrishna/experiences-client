import useStyles from 'isomorphic-style-loader/useStyles';
import React from 'react';
import PropTypes from 'prop-types';
import Layout from '../Layout';

import s from './PageContainer.css';

export default function PageContainer({ children }) {
  useStyles(s);
  return (
    <div className={s.root}>
      <div className={s.container}>
        <Layout>{children}</Layout>
      </div>
    </div>
  );
}

PageContainer.propTypes = {
  children: PropTypes.node.isRequired,
};