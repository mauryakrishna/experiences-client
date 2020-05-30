import React from 'react';

import { FormatListBulleted, FormatListNumbered } from '@styled-icons/material';

import { ToolbarList, ListPlugin, withList } from 'slate-plugins-next';

const nodeTypes = {
  typeUl: 'ul',
  typeOl: 'ol',
};

const plugins = [ListPlugin(nodeTypes)];

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
