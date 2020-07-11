import {
  ALIGN_LEFT,
  ALIGN_RIGHT,
  ALIGN_CENTER,
  AlignPlugin,
} from '@udecode/slate-plugins';

const nodeTypes = {
  typeAlignLeft: ALIGN_LEFT,
  typeAlignRight: ALIGN_RIGHT,
  typeAlignCenter: ALIGN_CENTER,
};

const plugins = [AlignPlugin(nodeTypes)];

export { plugins, nodeTypes };
