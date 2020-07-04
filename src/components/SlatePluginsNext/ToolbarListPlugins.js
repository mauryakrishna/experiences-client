import { ListPlugin } from 'slate-plugins-next';

const nodeTypes = {
  typeUl: 'ul',
  typeOl: 'ol',
};

const plugins = [ListPlugin(nodeTypes)];

export { plugins, nodeTypes };
