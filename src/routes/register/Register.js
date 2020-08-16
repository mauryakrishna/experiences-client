/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-present Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import useStyles from 'isomorphic-style-loader/useStyles';
import React from 'react';
import PropTypes from 'prop-types';
import gql from 'graphql-tag';
import { useMutation, useApolloClient } from 'react-apollo-hooks';
import s from './Register.css';

import history from '../../history';

export default function Register({ title }) {
  useStyles(s);
  const client = useApolloClient();
  const REGISTER_MUTATION_QUERY = gql`
    mutation buttonPressRegister {
      buttonPressRegister {
        exist
        author {
          displayname
          authoruid
        }
      }
    }
  `;

  const [registerAuthor] = useMutation(REGISTER_MUTATION_QUERY, {
    update: (cache, { data }) => {
      const { displayname, authoruid } = data.buttonPressRegister.author;
      client.writeData({ data: { displayname, authoruid, loggedin: true } });

      // redirect to home
      history.push('/');
    },
  });

  const register = () => {
    registerAuthor();
  };

  return (
    <div className={s.root}>
      <div className={s.container}>
        <h1>{title}</h1>
        <p>
          You are not a registered user on Experiences. Click the button below
          to register.
        </p>
        <button type="button" onClick={register}>
          Register me to Experiences
        </button>
      </div>
    </div>
  );
}

Register.propTypes = {
  title: PropTypes.string.isRequired,
};
