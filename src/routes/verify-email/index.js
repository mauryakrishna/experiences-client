import React from 'react';

import Verify from './Verify';
import Layout from '../../components/Layout/Layout';

const title = 'Verify email address';

function action(context, params) {
  return {
    chunks: ['verify-email'],
    title,
    component: (
      <Layout>
        <Verify verifykey={params.verifykey} />
      </Layout>
    ),
  };
}

export default action;
