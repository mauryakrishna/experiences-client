import React from 'react';
import {
  FormatQuote,
  LooksOne,
  LooksTwo,
  Looks3,
  Link,
  // Image,
} from '@styled-icons/material';

import {
  HeadingToolbar,
  ToolbarElement,
  // ToolbarImage,
  ToolbarLink,
  withToggleType,
  withDeleteStartReset,
  withBreakEmptyReset,
  // withImageUpload,
  withLink,
} from '@udecode/slate-plugins';

import pluginExitBreak from '../SlatePluginsNext/ExitBreakPlugin';
import pluginSoftBreak from '../SlatePluginsNext/SoftBreakPlugin';

import {
  plugins as pluginsHeadingToolbar,
  nodeTypes,
} from '../SlatePluginsNext/HeadingToolbarPlugins';

import ToolbarAlignment, {
  plugins as pluginsToolbarAlignment,
  nodeTypes as nodeTypesAlign,
} from '../Editor/ToolbarAlignment';

import ToolbarMarks, {
  plugins as pluginsToolbarMarks,
  withPlugins as withPluginsToolbarMarks,
} from '../Editor/ToolbarMarks';

import ToolbarList, {
  plugins as pluginsToolbarList,
  withPlugins as withPluginsToolbarList,
} from '../Editor/ToolbarList';

const resetOptions = {
  ...nodeTypes,
  ...nodeTypesAlign,
  types: [nodeTypes.typeBlockquote],
};

const plugins = [
  ...pluginsToolbarMarks,
  ...pluginsToolbarList,
  ...pluginsHeadingToolbar,
  ...pluginsToolbarAlignment,
  ...pluginExitBreak,
  ...pluginSoftBreak,
];

const withPlugins = [
  ...withPluginsToolbarList,
  ...withPluginsToolbarMarks,
  withDeleteStartReset(resetOptions),
  withBreakEmptyReset(resetOptions),
  // withImageUpload(nodeTypes),
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
      <ToolbarElement type={nodeTypes.typeBlockquote} icon={<FormatQuote />} />
      <ToolbarList />
      {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
      <ToolbarLink {...nodeTypes} icon={<Link />} />
      {/* ToolbarImage commented for this release, will be enabled once url adding and uploading both done */}
      {/* <ToolbarImage {...nodeTypes} icon={<Image />} /> */}
    </HeadingToolbar>
  );
};

export { plugins, withPlugins };
