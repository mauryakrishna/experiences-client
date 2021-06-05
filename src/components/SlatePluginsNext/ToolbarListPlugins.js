import {
  ELEMENT_LI,
  ELEMENT_OL,
  ELEMENT_UL,
  createListPlugin,
} from '@udecode/slate-plugins';

const nodeTypes = {
  typeUl: ELEMENT_UL,
  typeOl: ELEMENT_OL,
  typeLi: ELEMENT_LI,
};

const plugins = [createListPlugin(nodeTypes)];

export { plugins, nodeTypes };
