import React from 'react';
import Layout from '../../components/Layout';
import Editor from './Editor';

const title = 'Write an experience...';

function action(context, params) {
  return {
    chunks: ['editor'],
    title,
    component: (
      <Layout>
        <Editor slugkey={params.slugkey} />
      </Layout>
    ),
  };
}

export default action;
