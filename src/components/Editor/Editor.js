/* eslint-disable react/prop-types */
import React, { useState, useMemo } from 'react';
import { Slate, withReact } from 'slate-react';
import { createEditor } from 'slate';
import { withHistory } from 'slate-history';

import { EditablePlugins, pipe } from 'slate-plugins-next';

import HeadingToolbar, {
  plugins as pluginsHeading,
  withPlugins as withPluginsHeading,
} from './HeadingToolbar';

const plugins = [...pluginsHeading];

const withPlugins = [withReact, withHistory, ...withPluginsHeading];

const Editor = () => {
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

export default Editor;
