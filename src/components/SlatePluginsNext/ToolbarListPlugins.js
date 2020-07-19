import {
  ELEMENT_LI,
  ELEMENT_OL,
  ELEMENT_UL,
  ListPlugin,
} from '@udecode/slate-plugins';

const nodeTypes = {
  typeUl: ELEMENT_UL,
  typeOl: ELEMENT_OL,
  typeLi: ELEMENT_LI,
};

const plugins = [ListPlugin(nodeTypes)];

export { plugins, nodeTypes };
