import React, { useState, useEffect } from 'react';
import useStyles from 'isomorphic-style-loader/useStyles';
import s from './Editor.css';

const Title = () => {
  useStyles(s);
  const [title, setTitle] = useState('');

  useEffect(() => {});

  const validateTitle = event => {
    let { value } = event.target;

    // remove more then one space
    value = value.replace(/\s\s+/g, ' ');

    setTitle(value);
  };

  return (
    <div className={s.placeholdercontainer}>
      <input
        className={s.placeholder}
        placeholder="Start with the title ..."
        value={title}
        onChange={validateTitle}
        maxLength="1000"
      />
    </div>
  );
};

export default Title;
