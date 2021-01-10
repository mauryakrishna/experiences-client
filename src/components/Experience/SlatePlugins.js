
import { plugins as pluginsHeadingToolbar } from '../SlatePluginsNext/HeadingToolbarPlugins';
import { plugins as pluginsToolbarList } from '../SlatePluginsNext/ToolbarListPlugins';
import { plugins as pluginsToolbarMarks } from '../SlatePluginsNext/ToolbarMarksPlugins';
import { plugins as pluginsToolbarAlignment } from '../SlatePluginsNext/ToolbarAlignmentPlugins';
import { renderLeafBold } from '../SlatePluginsNext/Custom/renderLeafBold';

const plugins = [
  ...pluginsToolbarAlignment,
  ...pluginsHeadingToolbar,
  ...pluginsToolbarList,
  ...pluginsToolbarMarks,
];

export { plugins, renderLeafBold };