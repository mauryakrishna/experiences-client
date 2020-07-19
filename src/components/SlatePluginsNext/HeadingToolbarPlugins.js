import {
  ELEMENT_BLOCKQUOTE,
  ELEMENT_LINK,
  ELEMENT_IMAGE,
  ELEMENT_H1,
  ELEMENT_H2,
  ELEMENT_H3,
  ELEMENT_PARAGRAPH,
  HeadingPlugin,
  CodeBlockPlugin,
  BlockquotePlugin,
  ImagePlugin,
  LinkPlugin,
} from '@udecode/slate-plugins';

const nodeTypes = {
  typeH1: ELEMENT_H1,
  typeH2: ELEMENT_H2,
  typeH3: ELEMENT_H3,
  typeBlockquote: ELEMENT_BLOCKQUOTE,
  typeLink: ELEMENT_LINK,
  typeImg: ELEMENT_IMAGE,
  typeP: ELEMENT_PARAGRAPH,
};

const plugins = [
  HeadingPlugin(nodeTypes),
  CodeBlockPlugin(nodeTypes),
  BlockquotePlugin(nodeTypes),
  LinkPlugin(nodeTypes),
  ImagePlugin(nodeTypes),
];

export { plugins, nodeTypes };
