import React from 'react';
import Layout from '../../components/Layout';
import ReadExperience from '../../components/Experience/ReadExperience';

function action(context, params) {
  return {
    chunks: ['read-experience'],
    component: (
      <Layout>
        <ReadExperience slug={params.slug} />
      </Layout>
    ),
  };
}

export default action;
