/* eslint-disable react/prop-types */
import React, { useState, useMemo } from 'react';
import { Slate, Editable, withReact } from 'slate-react';
import { createEditor } from 'slate';
import { withHistory } from 'slate-history';
import Placeholder from '../EditorPlugins/PlaceholderPlugin';

const EditableForcedLayout = () => {
  const [value, setValue] = useState([
    {
      type: 'paragraph',
      children: [{ text: '' }],
    },
  ]);
  const editor = useMemo(() => withHistory(withReact(createEditor())), []);

  const plugin = [
    Placeholder({ type: 'paragraph', placeholder: 'this is placeholder' }),
  ];
  return (
    // eslint-disable-next-line no-shadow
    <Slate
      editor={editor}
      value={value}
      plugins={plugin}
      onChange={value => {
        setValue(value);
      }}
    >
      <Editable placeholder="Enter some rich text…" />
    </Slate>
  );
};

export default EditableForcedLayout;
