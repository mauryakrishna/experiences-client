/* eslint-disable react/prop-types */
import React, { useState } from 'react';

import Editor from './Editor';
import Title from './Title';

import ShowSaveState from './ShowSaveState';
import { SAVE_NOTHING } from '../../ConfigConstants';

const Layout = () => {
  const [state, setState] = useState(SAVE_NOTHING);

  const cb = newstate => {
    setState(newstate);
  };

  return (
    <React.Fragment>
      <ShowSaveState state={state} />
      <Title cb={cb} />
      <Editor cb={cb} />
    </React.Fragment>
  );
};

export default Layout;
