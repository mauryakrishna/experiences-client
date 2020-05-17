/* eslint-disable no-shadow */
import useStyles from 'isomorphic-style-loader/useStyles';
import React from 'react';
import PropTypes from 'prop-types';
import s from './Editor.css';
import EditableForcedLayout from '../../components/Editor/EditableForcedLayout';

export default function Editor({ title }) {
  useStyles(s);
  return (
    <div className={s.root}>
      <div className={s.container}>
        <EditableForcedLayout />
      </div>
    </div>
  );
}

Editor.propTypes = {
  title: PropTypes.string.isRequired,
};
