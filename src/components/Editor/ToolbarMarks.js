import React from 'react';
import {
  FormatBold,
  FormatItalic,
  FormatStrikethrough,
  FormatUnderlined,
} from '@styled-icons/material';

import {
  MARK_ITALIC,
  MARK_STRIKETHROUGH,
  MARK_UNDERLINE,
  ToolbarMark,
  // withToggleType,
} from '@udecode/slate-plugins';

import { plugins, nodeTypes } from '../SlatePluginsNext/ToolbarMarksPlugins';

const withPlugins = []; // [withToggleType(nodeTypes)];

const MARK_BOLD = 'strong';

export default () => {
  return (
    <React.Fragment>
      <ToolbarMark type={MARK_BOLD} icon={<FormatBold />} />
      <ToolbarMark type={MARK_ITALIC} icon={<FormatItalic />} />
      <ToolbarMark type={MARK_UNDERLINE} icon={<FormatUnderlined />} />
      <ToolbarMark type={MARK_STRIKETHROUGH} icon={<FormatStrikethrough />} />
    </React.Fragment>
  );
};

export { plugins, withPlugins };
