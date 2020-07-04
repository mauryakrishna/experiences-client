import React from 'react';

import { FormatListBulleted, FormatListNumbered } from '@styled-icons/material';

import { ToolbarList, withList } from 'slate-plugins-next';

import { plugins, nodeTypes } from '../SlatePluginsNext/ToolbarListPlugins';

const withPlugins = [withList(nodeTypes)];

export default () => {
  return (
    <React.Fragment>
      <ToolbarList
        {...nodeTypes}
        typeList={nodeTypes.typeUl}
        icon={<FormatListBulleted />}
      />
      <ToolbarList
        {...nodeTypes}
        typeList={nodeTypes.typeOl}
        icon={<FormatListNumbered />}
      />
    </React.Fragment>
  );
};

export { plugins, withPlugins };
