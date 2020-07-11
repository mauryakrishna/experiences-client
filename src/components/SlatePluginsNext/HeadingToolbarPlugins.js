import {
  BLOCKQUOTE,
  LINK,
  IMAGE,
  HeadingType,
  HeadingPlugin,
  CodeBlockPlugin,
  BlockquotePlugin,
  ImagePlugin,
  LinkPlugin,
} from '@udecode/slate-plugins';

const nodeTypes = {
  typeH1: HeadingType.H1,
  typeH2: HeadingType.H2,
  typeH3: HeadingType.H3,
  typeBlockquote: BLOCKQUOTE,
  typeLink: LINK,
  typeImg: IMAGE,
};

const plugins = [
  HeadingPlugin(nodeTypes),
  CodeBlockPlugin(nodeTypes),
  BlockquotePlugin(nodeTypes),
  LinkPlugin(nodeTypes),
  ImagePlugin(nodeTypes),
];

export { plugins, nodeTypes };
