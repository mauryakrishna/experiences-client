/* eslint-disable react/prop-types */
import React, { useState, useMemo } from 'react';
import PropTypes from 'prop-types';
import isEqual from 'lodash/isEqual';
import { Slate, withReact } from 'slate-react';
import { createEditor } from 'slate';
import { withHistory } from 'slate-history';

import { EditablePlugins, pipe } from 'slate-plugins-next';
import useStyles from 'isomorphic-style-loader/useStyles';

import { useApolloClient } from 'react-apollo-hooks';

import s from './Editor.css';

import HeadingToolbar, {
  plugins as pluginsHeading,
  withPlugins as withPluginsHeading,
} from './HeadingToolbar';

import SaveExperience from './SaveExperiance';
import {
  GET_EXPERIENCE_ID,
  GET_EXPERIENCE_EXPERIENCE,
} from '../../queries/experience';

const plugins = [...pluginsHeading];

const withPlugins = [withReact, withHistory, ...withPluginsHeading];

const Editor = ({ cb }) => {
  useStyles(s);

  const client = useApolloClient();
  const { experience } = client.readQuery({ query: GET_EXPERIENCE_EXPERIENCE });
  const { id } = client.readQuery({ query: GET_EXPERIENCE_ID });

  const saveExperienceDebounceCb = SaveExperience({ id, cb });

  const [value, setValue] = useState(
    JSON.parse(experience) || [{ children: [{ text: '' }] }],
  );

  const editor = useMemo(() => pipe(createEditor(), ...withPlugins), []);

  const isDifferent = (value1, value2) => {
    return !isEqual(value1, value2);
  };

  return (
    <Slate
      editor={editor}
      value={value}
      onChange={newValue => {
        // this condition added to avoid unneccessary trigger at onFocus, onBlur
        // https://github.com/ianstormtaylor/slate/issues/2055
        // so now if there is really change in editor content as compared to just previous then only go for saving
        if (isDifferent(newValue, value)) {
          saveExperienceDebounceCb(newValue);
        }
        setValue(newValue);
      }}
    >
      <HeadingToolbar />
      <EditablePlugins
        plugins={plugins}
        placeholder="experience"
        spellCheck
        autoFocus
      />
    </Slate>
  );
};

Editor.propTypes = {
  cb: PropTypes.func.isRequired,
};
export default Editor;
