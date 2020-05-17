import React, { useState, useCallback, useMemo } from 'react';
import PropTypes from 'prop-types';
import { Slate, Editable, withReact } from 'slate-react';
import { createEditor } from 'slate';
import { withHistory } from 'slate-history';
import withLayout from './withLayout';
import s from './Editor.css';

const EditableForcedLayout = () => {
  const initialValue = [
    {
      type: 'title',
      children: [{ text: 'Title' }],
    },
    {
      type: 'paragraph',
      children: [
        {
          text: 'Start writing your experience...',
        },
      ],
    },
  ];

  const [value, setValue] = useState(initialValue);
  const renderElement = useCallback(props => <Element {...props} />, []);
  const editor = useMemo(
    () => withLayout(withHistory(withReact(createEditor()))),
    [],
  );

  return (
    // eslint-disable-next-line no-shadow
    <Slate editor={editor} value={value} onChange={value => setValue(value)}>
      <Editable renderElement={renderElement} spellCheck autoFocus />
    </Slate>
  );
};

// eslint-disable-next-line react/prop-types
const Element = ({ attributes, children, element }) => {
  // eslint-disable-next-line default-case
  switch (element.type) {
    case 'title':
      return (
        <span className={s.placeholder} {...attributes}>
          {children}
        </span>
      );
    case 'paragraph':
      return <p {...attributes}>{children}</p>;
    default:
      return null;
  }
};

Element.props = {
  attributes: PropTypes.object,
  children: PropTypes.arrayOf({
    text: PropTypes.string.isRequired,
  }),
  element: PropTypes.objectOf({
    type: PropTypes.string.isRequired,
  }),
};

export default EditableForcedLayout;
