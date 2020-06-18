import React, { useState } from 'react';
import useStyles from 'isomorphic-style-loader/useStyles';
import PropTypes from 'prop-types';

import SaveTitle from './SaveTitle';

import s from './Editor.css';

const Title = ({ cb }) => {
  useStyles(s);

  const [title, setTitle] = useState('');

  const validateTitle = event => {
    let { value } = event.target;

    // remove more than one space
    value = value.replace(/\s\s+/g, ' ');

    setTitle(value);
  };

  return (
    <React.Fragment>
      <i decide={SaveTitle({ title, cb })} />
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

Title.propTypes = {
  cb: PropTypes.func.isRequired,
};

export default Title;
