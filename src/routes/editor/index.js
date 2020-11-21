import React from 'react';
import Layout from '../../components/Layout';
import Editor from './Editor';
import DetectMobile from '../../detectmobilebrowser';
import MobileNotSupported from './MobileNotSupported';

const title = 'Write an experience';

function action(context, params) {
  const component = DetectMobile() ? <MobileNotSupported /> : <Editor slugkey={params.slugkey} />
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
