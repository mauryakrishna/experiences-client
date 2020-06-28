/**
 * This was written to dynamically match the routes from the URL slug
 */

import React from 'react';

import NotFound from '../not-found/NotFound';
import ReadExperience from '../../components/Experience/ReadExperience';
import PageContainer from '../../components/PageContainer/PageContainer';
import AllOfAuthor from '../allofauthor/AllOfAuthor';

const getRegex = regex => RegExp(regex);

const getComponent = path => {
  let component = <NotFound />;

  if (path) {
    // experience url
    if (getRegex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/i).test(path)) {
      component = <ReadExperience slug={path} />;
    }
    // about author page
    else if (getRegex(/^@[a-z0-9]*$/i).test(path)) {
      component = <AllOfAuthor authoruid={path} />;
    }
  }

  return component;
};

function action(context) {
  return {
    chunks: ['dynamic-routing'],
    component: (
      // path = '/some-path'; //mind the / at the start
      <PageContainer>{getComponent(context.path.substr(1))}</PageContainer>
    ),
  };
}
export default action;
