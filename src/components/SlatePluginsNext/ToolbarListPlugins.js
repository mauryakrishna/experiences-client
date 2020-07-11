import { ListType, ListPlugin } from '@udecode/slate-plugins';

const nodeTypes = {
  typeUl: ListType.UL,
  typeOl: ListType.OL,
  typeLi: ListType.LI,
};

const plugins = [ListPlugin(nodeTypes)];

export { plugins, nodeTypes };
