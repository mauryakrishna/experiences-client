import { AlignPlugin } from 'slate-plugins-next';

const nodeTypes = {
  typeAlignLeft: 'left',
  typeAlignCenter: 'center',
  typeAlignRight: 'right',
};

const plugins = [AlignPlugin(nodeTypes)];

export { plugins, nodeTypes };
