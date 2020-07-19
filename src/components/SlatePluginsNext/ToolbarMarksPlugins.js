import {
  MARK_STRIKETHROUGH,
  MARK_ITALIC,
  MARK_UNDERLINE,
  ELEMENT_PARAGRAPH,
  DEFAULTS_BOLD,
  ParagraphPlugin,
  BoldPlugin,
  ItalicPlugin,
  UnderlinePlugin,
  StrikethroughPlugin,
} from '@udecode/slate-plugins';

const nodeTypes = {
  typeP: ELEMENT_PARAGRAPH,
  typeBold: DEFAULTS_BOLD.bold.type,
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
