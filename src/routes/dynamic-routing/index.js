/**
 * This was written to dynamically match the routes from the URL slug
 */

import React from 'react';

import NotFound from '../not-found';
import ReadExperience from '../../components/Experience/ReadExperience';

const getComponent = path => {
  let component = <NotFound />;

  // path = '/some-path'; //mind the / at the start
  const pathwihoutslash = path.substr(1);
  if (
    pathwihoutslash &&
    RegExp(/^[a-z0-9]+(?:-[a-z0-9]+)*$/i).test(pathwihoutslash)
  ) {
    const slugkey = '';
    component = <ReadExperience slugkey={slugkey} />;
  }

  return component;
};

function action(context) {
  return {
    chunks: ['dynamic-routing'],
    component: getComponent(context.path),
  };
}

export default action;
