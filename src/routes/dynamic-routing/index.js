/**
 * This was written to dynamically match the routes from the URL slug
 */

import React from 'react';

import NotFound from '../not-found';
import Layout from '../../components/Layout';
import ReadExperience from '../../components/Experience/ReadExperience';
import PageContainer from '../../components/PageContainer/PageContainer';

const getComponent = path => {
  let component = <NotFound />;

  // path = '/some-path'; //mind the / at the start
  const pathwihoutslash = path.substr(1);
  if (
    pathwihoutslash &&
    RegExp(/^[a-z0-9]+(?:-[a-z0-9]+)*$/i).test(pathwihoutslash)
  ) {
    component = (
      <Layout>
        <ReadExperience slug={pathwihoutslash} />
      </Layout>
    );
  }

  return component;
};

function action(context) {
  return {
    chunks: ['dynamic-routing'],
    component: <PageContainer>{getComponent(context.path)}</PageContainer>,
  };
}
export default action;
