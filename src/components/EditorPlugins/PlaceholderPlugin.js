import PlaceholderPlugin from 'slate-react-placeholder';

const isOnlyTitle = document => {
  console.log('isOnlyTitle');
  const firstNode = document.nodes.get(0);
  const result =
    document.nodes.size === 2 &&
    firstNode.text === document.text &&
    firstNode.type === 'title';
  return result;
};

const whens = {
  title: (_editor, node) => {
    console.log('when title');
    return node.object === 'block' && node.type === 'title' && node.text === '';
  },

  paragraph: (editor, node) => {
    console.log('when parangraph');
    return (
      node.object === 'block' &&
      node.type === 'paragraph' &&
      node.text === '' &&
      isOnlyTitle(editor.value.document)
    );
  },
};

const fixedCursorStyle = { float: 'left' };

export default ({ type, placeholder }) => {
  console.log('From placeholde pligun');
  if (!['title', 'paragraph'].includes(type)) {
    throw new Error("type needs to be 'title' or 'paragraph'");
  }
  return PlaceholderPlugin({
    placeholder,
    when: whens[type],
    style: fixedCursorStyle,
  });
};
