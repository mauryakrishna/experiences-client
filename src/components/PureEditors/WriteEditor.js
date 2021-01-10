import React, { useState, useMemo } from 'react';
import PropTypes from 'prop-types';
import { Slate, withReact } from 'slate-react';
import { createEditor } from 'slate';
import { withHistory } from 'slate-history';

import { EditablePlugins, pipe } from '@udecode/slate-plugins';
import { renderLeafBold } from '../SlatePluginsNext/Custom/renderLeafBold';

import HeadingToolbar, {
  plugins as pluginsHeading,
  withPlugins as withPluginsHeading,
} from './HeadingToolbar';

const WriteEditor = ({ initialValue, onChangeCb, placeholder, style }) => {
  const [value, setValue] = useState([
    {
      children: [
        {
          type: 'paragraph',
          children: [{ text: '' }],
        },
      ],
    },
  ]);

  const editor = useMemo(() => pipe(createEditor(), ...withPlugins), []);
  const plugins = [...pluginsHeading];
  const withPlugins = [withReact, withHistory, ...withPluginsHeading];

  return (
    <Slate
      editor={editor}
      value={initialValue || value}
      onChange={newValue => {
        onChangeCb(newValue);
        setValue(newValue);
      }}
    >
      <HeadingToolbar />
      <Box w="100%" px={2} mb={8}>
        <EditablePlugins
          plugins={plugins}
          placeholder={placeholder}
          spellCheck
          style={style}
          renderLeaf={[renderLeafBold]}
        />
      </Box>
    </Slate>
  );
}

WriteEditor.defaultProps = {
  initialValue: null,
  onChangeCb: ()=> {},
  placeholder: '',
  style: {}
}

WriteEditor.propTypes = {
  initialValue: PropTypes.array,
  onChangeCb: PropTypes.func,
  placeholder: PropTypes.string, 
  style: PropTypes.object
};


export default WriteEditor;