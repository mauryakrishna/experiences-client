import React from 'react';
import loadable from '@loadable/component';
import Layout from '../../components/Layout';
import { DetectMobileBrowser } from '../../detectmobilebrowser';
const MobileNotSupported = loadable(()=> import('./MobileNotSupported')) ;
const Editor = loadable(()=> import('./Editor'));

const title = 'Write an experience';

function action(context, params) {
  const component = DetectMobileBrowser() ? <MobileNotSupported /> : <Editor slugkey={params.slugkey} />
  return {
    chunks: ['edit-editor', 'write-editor'],
    title,
    component: (
      <Layout pathname={context.pathname}>
        {component}
      </Layout>
    ),
  };
}

export default action;
