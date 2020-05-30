import React from 'react';
import {
  FormatQuote,
  Looks3,
  Looks4,
  Looks5,
  Looks6,
  LooksOne,
  LooksTwo,
  Link,
  Image,
} from '@styled-icons/material';

import {
  HeadingToolbar,
  ToolbarElement,
  HeadingPlugin,
  CodeBlockPlugin,
  BlockquotePlugin,
  ImagePlugin,
  LinkPlugin,
  ToolbarImage,
  ToolbarLink,
  withToggleType,
  withDeleteStartReset,
  withBreakEmptyReset,
  withImageUpload,
  withLink,
} from 'slate-plugins-next';

import ToolbarMarks, {
  plugins as pluginsToolbarMarks,
  withPlugins as withPluginsToolbarMarks,
} from './ToolbarMarks';
import ToolbarList, {
  plugins as pluginsToolbarList,
  withPlugins as withPluginsToolbarList,
} from './ToolbarList';

const nodeTypes = {
  typeH1: 'h1',
  typeH2: 'h2',
  typeH3: 'h3',
  typeH4: 'h4',
  typeH5: 'h5',
  typeH6: 'h6',
  typeBlockquote: 'blockquote',
};

const resetOptions = {
  ...nodeTypes,
  types: [nodeTypes.typeBlockquote],
};

const plugins = [
  ...pluginsToolbarMarks,
  ...pluginsToolbarList,
  HeadingPlugin(nodeTypes),
  CodeBlockPlugin(nodeTypes),
  BlockquotePlugin(nodeTypes),
  withDeleteStartReset(resetOptions),
  withBreakEmptyReset(resetOptions),
  withImageUpload(nodeTypes),
  LinkPlugin(nodeTypes),
  ImagePlugin(nodeTypes),
];

const withPlugins = [
  ...withPluginsToolbarList,
  ...withPluginsToolbarMarks,
  withToggleType(nodeTypes),
  withLink(nodeTypes),
];

export default () => {
  return (
    <HeadingToolbar>
      <ToolbarMarks />
      <ToolbarElement type={nodeTypes.typeH1} icon={<LooksOne />} />
      <ToolbarElement type={nodeTypes.typeH2} icon={<LooksTwo />} />
      <ToolbarElement type={nodeTypes.typeH3} icon={<Looks3 />} />
      <ToolbarElement type={nodeTypes.typeH4} icon={<Looks4 />} />
      <ToolbarElement type={nodeTypes.typeH5} icon={<Looks5 />} />
      <ToolbarElement type={nodeTypes.typeH6} icon={<Looks6 />} />
      <ToolbarElement type={nodeTypes.typeBlockquote} icon={<FormatQuote />} />
      <ToolbarList />
      <ToolbarLink {...nodeTypes} icon={<Link />} />
      <ToolbarImage {...nodeTypes} icon={<Image />} />
    </HeadingToolbar>
  );
};

export { plugins, withPlugins };
