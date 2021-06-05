import {
  ELEMENT_ALIGN_CENTER,
  ELEMENT_ALIGN_RIGHT,
  ELEMENT_ALIGN_LEFT,
  createAlignPlugin,
} from '@udecode/slate-plugins';

const nodeTypes = {
  typeAlignLeft: ELEMENT_ALIGN_LEFT,
  typeAlignRight: ELEMENT_ALIGN_RIGHT,
  typeAlignCenter: ELEMENT_ALIGN_CENTER,
};

const plugins = [createAlignPlugin(nodeTypes)];

export { plugins, nodeTypes };
