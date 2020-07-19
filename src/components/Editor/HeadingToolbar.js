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
  withTrailingNode,
  withResetBlockType,
  withTransforms,
} from '@udecode/slate-plugins';

import pluginExitBreak from '../SlatePluginsNext/ExitBreakPlugin';

import {
  plugins as pluginsHeadingToolbar,
  nodeTypes,
} from '../SlatePluginsNext/HeadingToolbarPlugins';

import ToolbarAlignment, {
  plugins as pluginsToolbarAlignment,
  nodeTypes as nodeTypesAlign,
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
  ...nodeTypesAlign,
  types: [nodeTypes.typeBlockquote],
};

const plugins = [
  ...pluginsToolbarMarks,
  ...pluginsToolbarList,
  ...pluginsHeadingToolbar,
  ...pluginsToolbarAlignment,
  ...pluginExitBreak,
];

const withPlugins = [
  ...withPluginsToolbarList,
  ...withPluginsToolbarMarks,
  withDeleteStartReset(resetOptions),
  withBreakEmptyReset(resetOptions),
  withImageUpload(nodeTypes),
  withToggleType(nodeTypes),
  withLink(nodeTypes),
  withTrailingNode({ type: nodeTypes.typeP }),
  withResetBlockType({
    types: [nodeTypes.typeBlockquote],
    defaultType: nodeTypes.typeP,
  }),
  withTransforms(),
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
      <ToolbarImage {...nodeTypes} icon={<Image />} />
    </HeadingToolbar>
  );
};

export { plugins, withPlugins };
