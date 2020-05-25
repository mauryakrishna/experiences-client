/* eslint-disable react/prop-types */
import React, { useState, useMemo } from 'react';
import { Slate, Editable, withReact } from 'slate-react';
import { createEditor } from 'slate';
import { withHistory } from 'slate-history';

const Editor = () => {
  const [value, setValue] = useState([
    {
      children: [{ text: '' }],
    },
  ]);

  const editor = useMemo(() => withHistory(withReact(createEditor())), []);

  return (
    <Slate
      editor={editor}
      value={value}
      onChange={value => {
        setValue(value);
      }}
    >
      <Editable placeholder="experience" spellCheck autoFocus />
    </Slate>
  );
};

export default Editor;
