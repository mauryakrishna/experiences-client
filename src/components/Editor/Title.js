import React, { useState } from 'react';
import useStyles from 'isomorphic-style-loader/useStyles';
import ShowSaveState from './ShowSaveState';
import SaveTitle from './SaveTitle';

import s from './Editor.css';

const Title = () => {
  useStyles(s);

  const [savestate, setSavestate] = useState(false);
  const [title, setTitle] = useState('');

  const validateTitle = event => {
    let { value } = event.target;

    // remove more than one space
    value = value.replace(/\s\s+/g, ' ');

    setTitle(value);
  };

  const cb = newsavestate => {
    setSavestate(newsavestate);
  };

  return (
    <React.Fragment>
      <ShowSaveState decide={SaveTitle({ title, cb })} state={savestate} />
      <div className={s.placeholdercontainer}>
        <input
          className={s.placeholder}
          placeholder="Start with the title..."
          value={title}
          onChange={validateTitle}
          maxLength="1000"
        />
      </div>
    </React.Fragment>
  );
};

export default Title;
