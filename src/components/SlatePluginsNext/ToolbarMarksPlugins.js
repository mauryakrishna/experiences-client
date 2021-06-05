import {
  MARK_STRIKETHROUGH,
  MARK_ITALIC,
  MARK_UNDERLINE,
  ELEMENT_PARAGRAPH,
  DEFAULTS_BOLD,
  createParagraphPlugin,
  createBoldPlugin,
  createItalicPlugin,
  createUnderlinePlugin,
  createStrikethroughPlugin,
} from '@udecode/slate-plugins';

const nodeTypes = {
  typeP: ELEMENT_PARAGRAPH,
  typeBold: DEFAULTS_BOLD,
  typeItalic: MARK_ITALIC,
  typeUnderline: MARK_UNDERLINE,
  typeStrikethrough: MARK_STRIKETHROUGH,
};

const plugins = [
  createParagraphPlugin(),
  createBoldPlugin(),
  createItalicPlugin(),
  createUnderlinePlugin(),
  createStrikethroughPlugin(),
];

export { plugins, nodeTypes };
