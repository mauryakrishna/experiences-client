import {
  ELEMENT_BLOCKQUOTE,
  ELEMENT_LINK,
  ELEMENT_IMAGE,
  ELEMENT_H1,
  ELEMENT_H2,
  ELEMENT_H3,
  ELEMENT_PARAGRAPH,
  createHeadingPlugin,
  createCodeBlockPlugin,
  createBlockquotePlugin,
  // createImagePlugin,
  createLinkPlugin,
} from '@udecode/slate-plugins';

const nodeTypes = {
  typeH1: ELEMENT_H1,
  typeH2: ELEMENT_H2,
  typeH3: ELEMENT_H3,
  typeBlockquote: ELEMENT_BLOCKQUOTE,
  typeLink: ELEMENT_LINK,
  // typeImg: ELEMENT_IMAGE,
  typeP: ELEMENT_PARAGRAPH,
};

const plugins = [
  createHeadingPlugin(nodeTypes),
  createCodeBlockPlugin(nodeTypes),
  createBlockquotePlugin(nodeTypes),
  createLinkPlugin(nodeTypes),
  // createImagePlugin(nodeTypes),
];

export { plugins, nodeTypes };
