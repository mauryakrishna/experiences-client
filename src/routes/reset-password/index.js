import React from 'react';
import ResetPassword from './ResetPassword';
import Layout from '../../components/Layout/Layout';

async function action(context, params) {
  return {
    title: 'Reset password',
    chunks: ['resetpassword'],
    component: (
      <Layout>
        <ResetPassword requestkey={params.requestkey} />
      </Layout>
    ),
  };
}

export default action;
