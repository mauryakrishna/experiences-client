import {
  ParagraphPlugin,
  BoldPlugin,
  ItalicPlugin,
  UnderlinePlugin,
  StrikethroughPlugin,
} from 'slate-plugins-next';

const nodeTypes = {
  typeBold: 'bold',
  typeItalic: 'italic',
  typeUnderline: 'underline',
  typeStrikethrough: 'strikethrough',
};

const plugins = [
  ParagraphPlugin(nodeTypes),
  BoldPlugin(nodeTypes),
  ItalicPlugin(nodeTypes),
  UnderlinePlugin(nodeTypes),
  StrikethroughPlugin(nodeTypes),
];

export { plugins, nodeTypes };
