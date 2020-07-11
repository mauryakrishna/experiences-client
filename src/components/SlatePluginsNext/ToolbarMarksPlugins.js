import {
  MARK_BOLD,
  MARK_STRIKETHROUGH,
  MARK_ITALIC,
  MARK_UNDERLINE,
  PARAGRAPH,
  ParagraphPlugin,
  BoldPlugin,
  ItalicPlugin,
  UnderlinePlugin,
  StrikethroughPlugin,
} from '@udecode/slate-plugins';

const nodeTypes = {
  typeP: PARAGRAPH,
  typeBold: MARK_BOLD,
  typeItalic: MARK_ITALIC,
  typeUnderline: MARK_UNDERLINE,
  typeStrikethrough: MARK_STRIKETHROUGH,
};

const plugins = [
  ParagraphPlugin(nodeTypes),
  BoldPlugin(nodeTypes),
  ItalicPlugin(nodeTypes),
  UnderlinePlugin(nodeTypes),
  StrikethroughPlugin(nodeTypes),
];

export { plugins, nodeTypes };
