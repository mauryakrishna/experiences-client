/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import Editor from './Editor';
import Title from './Title';

import ShowSaveState from './ShowSaveState';

const Layout = () => {
  const [state, setState] = useState(false);

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
