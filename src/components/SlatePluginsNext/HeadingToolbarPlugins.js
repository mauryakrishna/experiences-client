import {
  HeadingPlugin,
  CodeBlockPlugin,
  BlockquotePlugin,
  ImagePlugin,
  LinkPlugin,
} from 'slate-plugins-next';

const nodeTypes = {
  typeH1: 'h1',
  typeH2: 'h2',
  typeH3: 'h3',
  typeH4: 'h4',
  typeH5: 'h5',
  typeH6: 'h6',
  typeBlockquote: 'blockquote',
};

const plugins = [
  HeadingPlugin(nodeTypes),
  CodeBlockPlugin(nodeTypes),
  BlockquotePlugin(nodeTypes),
  LinkPlugin(nodeTypes),
  ImagePlugin(nodeTypes),
];

export { plugins, nodeTypes };
