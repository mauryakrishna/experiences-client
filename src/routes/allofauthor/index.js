import React from 'react';
import Layout from '../../components/Layout/Layout';
import AllOfAuhtor from './AllOfAuthor';

function action({ params }) {
  return {
    chunks: ['allofauthor'],
    title: 'About you',
    component: (
      <Layout>
        <AllOfAuhtor authorid={params.id} />
      </Layout>
    ),
  };
}

export default action;
