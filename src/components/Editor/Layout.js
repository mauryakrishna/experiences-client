/* eslint-disable react/prop-types */
import React, { useState, useContext, useEffect } from 'react';
import Editor from './Editor';
import Title from './Title';
import UserContext from "../UserContext"
import SaveExperience from './SaveExperiance';
import PublishExperience from '../../components/Publish/PublishButton';
import { SAVE_NOTHING } from '../../ConfigConstants';

const Layout = () => {
  const { loggedin } = useContext(UserContext)
  const [state, setState] = useState(SAVE_NOTHING);
  const cb = newstate => {
    setState(newstate);
  };

  const saveExperienceDebounceCb = SaveExperience({ cb });

  const saveDebounce = () => {
    saveExperienceDebounceCb()
  }

  useEffect(()=> {
    if(loggedin) {
      saveExperienceDebounceCb()
    }
  }, [loggedin])

  return (
    <React.Fragment>
      <PublishExperience saveState={state}/>
      <Title saveDebounce={saveDebounce} />
      <Editor saveDebounce={saveDebounce} />
    </React.Fragment>
  );
};

export default Layout;
