/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import Editor from './Editor';
import Title from './Title';

import PublishExperience from '../../components/Publish/PublishButton';
import { SAVE_NOTHING } from '../../ConfigConstants';

const Layout = () => {
  const [state, setState] = useState(SAVE_NOTHING);

  const cb = newstate => {
    setState(newstate);
  };

  return (
    <React.Fragment>
      <PublishExperience saveState={state}/>
      <Title cb={cb} />
      <Editor cb={cb} />
    </React.Fragment>
  );
};

export default Layout;
