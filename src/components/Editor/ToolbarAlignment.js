import React from 'react';
import {
  FormatAlignCenter,
  FormatAlignLeft,
  FormatAlignRight,
} from '@styled-icons/material';

import { ToolbarAlign } from '@udecode/slate-plugins';

import {
  plugins,
  nodeTypes,
} from '../SlatePluginsNext/ToolbarAlignmentPlugins';

export default () => {
  return (
    <React.Fragment>
      <ToolbarAlign type={nodeTypes.typeAlignLeft} icon={<FormatAlignLeft />} />
      <ToolbarAlign
        type={nodeTypes.typeAlignCenter}
        icon={<FormatAlignCenter />}
      />
      <ToolbarAlign
        type={nodeTypes.typeAlignRight}
        icon={<FormatAlignRight />}
      />
    </React.Fragment>
  );
};

export { plugins, nodeTypes };
