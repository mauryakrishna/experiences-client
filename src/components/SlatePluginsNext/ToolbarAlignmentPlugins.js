import {
  ELEMENT_ALIGN_CENTER,
  ELEMENT_ALIGN_RIGHT,
  ELEMENT_ALIGN_LEFT,
  AlignPlugin,
} from '@udecode/slate-plugins';

const nodeTypes = {
  typeAlignLeft: ELEMENT_ALIGN_LEFT,
  typeAlignRight: ELEMENT_ALIGN_RIGHT,
  typeAlignCenter: ELEMENT_ALIGN_CENTER,
};

const plugins = [AlignPlugin(nodeTypes)];

export { plugins, nodeTypes };
