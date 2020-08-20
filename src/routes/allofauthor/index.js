import React from 'react';
import Layout from '../../components/Layout';
import AllOfAuthor from './AllOfAuthor';

const title = 'All of author';

function action(context, params) {
  return {
    chunks: ['allofauthor'],
    title,
    component: (
      <Layout>
        <AllOfAuthor title={title} authoruid={params.authoruid} />
      </Layout>
    ),
  };
}

export default action;
