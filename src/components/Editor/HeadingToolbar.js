import React from 'react';
import {
  FormatQuote,
  LooksOne,
  LooksTwo,
  Looks3,
  Link,
  Image,
} from '@styled-icons/material';

import {
  HeadingToolbar,
  ToolbarElement,
  ToolbarImage,
  ToolbarLink,
  withToggleType,
  withDeleteStartReset,
  withBreakEmptyReset,
  withImageUpload,
  withLink,
} from 'slate-plugins-next';

import {
  plugins as pluginsHeadingToolbar,
  nodeTypes,
} from '../SlatePluginsNext/HeadingToolbarPlugins';

import ToolbarAlignment, {
  plugins as pluginsToolbarAlignment,
} from './ToolbarAlignment';

import ToolbarMarks, {
  plugins as pluginsToolbarMarks,
  withPlugins as withPluginsToolbarMarks,
} from './ToolbarMarks';

import ToolbarList, {
  plugins as pluginsToolbarList,
  withPlugins as withPluginsToolbarList,
} from './ToolbarList';

const resetOptions = {
  ...nodeTypes,
  types: [nodeTypes.typeBlockquote],
};

const plugins = [
  ...pluginsToolbarMarks,
  ...pluginsToolbarList,
  ...pluginsHeadingToolbar,
  ...pluginsToolbarAlignment,
  withDeleteStartReset(resetOptions),
  withBreakEmptyReset(resetOptions),
  withImageUpload(nodeTypes),
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
      <ToolbarAlignment />
      {/* <ToolbarElement type={nodeTypes.typeH4} icon={<Looks4 />} />
      <ToolbarElement type={nodeTypes.typeH5} icon={<Looks5 />} />
      <ToolbarElement type={nodeTypes.typeH6} icon={<Looks6 />} /> */}

      <ToolbarElement type={nodeTypes.typeBlockquote} icon={<FormatQuote />} />
      <ToolbarList />
      <ToolbarLink {...nodeTypes} icon={<Link />} />
      <ToolbarImage {...nodeTypes} icon={<Image />} />
    </HeadingToolbar>
  );
};

export { plugins, withPlugins };
