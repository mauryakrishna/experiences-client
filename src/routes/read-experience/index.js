import React from 'react';
import Layout from '../../components/Layout';
import ReadExperience from '../../components/Experience/ReadExperience';

const title = 'Write an experience';

function action(context, params) {
  return {
    chunks: ['read-experience'],
    title,
    component: (
      <Layout>
        <ReadExperience slug={params.slug} />
      </Layout>
    ),
  };
}

export default action;
