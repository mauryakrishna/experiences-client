import React from 'react';
import Layout from '../../components/Layout';
import Editor from './Editor';

const title = 'Write an experience...';

function action() {
  return {
    chunks: ['editor'],
    title,
    component: (
      <Layout>
        <Editor title={title} />
      </Layout>
    ),
  };
}

export default action;
