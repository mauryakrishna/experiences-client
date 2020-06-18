/* eslint-disable react/prop-types */
import React, { useState, useMemo } from 'react';
import PropTypes from 'prop-types';
import { Slate, withReact } from 'slate-react';
import { createEditor } from 'slate';
import { withHistory } from 'slate-history';

import { EditablePlugins, pipe } from 'slate-plugins-next';
import useStyles from 'isomorphic-style-loader/useStyles';

import s from './Editor.css';

import HeadingToolbar, {
  plugins as pluginsHeading,
  withPlugins as withPluginsHeading,
} from './HeadingToolbar';

import SaveExperience from './SaveExperiance';

const plugins = [...pluginsHeading];

const withPlugins = [withReact, withHistory, ...withPluginsHeading];

const Editor = ({ cb }) => {
  useStyles(s);

  const [value, setValue] = useState([
    {
      children: [{ text: '' }],
    },
  ]);

  const editor = useMemo(() => pipe(createEditor(), ...withPlugins), []);

  return (
    <Slate
      editor={editor}
      value={value}
      onChange={newValue => {
        setValue(newValue);
      }}
    >
      <i decide={SaveExperience({ value, cb })} />
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
