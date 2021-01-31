import React, { useState, useMemo } from 'react';
import PropTypes from 'prop-types';
import { Slate, withReact } from 'slate-react';
import { createEditor } from 'slate';
import { withHistory } from 'slate-history';
import { Box } from '@chakra-ui/core';

import { EditablePlugins, pipe } from '@udecode/slate-plugins';
import { renderLeafBold } from '../SlatePluginsNext/Custom/renderLeafBold';

import HeadingToolbar, {
  plugins as pluginsHeading,
  withPlugins as withPluginsHeading,
} from './HeadingToolbar';

const WriteEditor = ({ initialValue, onChangeCb, placeholder, style }) => {
  const withPlugins = [withReact, withHistory, ...withPluginsHeading];
  const plugins = [...pluginsHeading];
  const editor = useMemo(() => pipe(createEditor(), ...withPlugins), []);
  
  return (
    <Slate
      editor={editor}
      value={initialValue}
      onChange={newValue => {
        onChangeCb(newValue);
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
  onChangeCb: ()=> {},
  placeholder: '',
  style: {}
}

WriteEditor.propTypes = {
  initialValue: PropTypes.array.isRequired,
  onChangeCb: PropTypes.func,
  placeholder: PropTypes.string,
  style: PropTypes.object
};


export default WriteEditor;