/* eslint-disable no-shadow */
import useStyles from 'isomorphic-style-loader/useStyles';
import React from 'react';
import PropTypes from 'prop-types';
import { useApolloClient } from 'react-apollo-hooks';
import s from './Editor.css';
import Layout from '../../components/Editor/Layout';

export default function Editor({ title }) {
  useStyles(s);
  const client = useApolloClient();
  client.writeData({
    data: {
      id: null,
    },
  });

  return (
    <div className={s.root}>
      <div className={s.container}>
        <Layout />
      </div>
    </div>
  );
}

Editor.propTypes = {
  title: PropTypes.string.isRequired,
};
