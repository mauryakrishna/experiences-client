import { ELEMENT_BLOCKQUOTE, createSoftBreakPlugin } from '@udecode/slate-plugins';

export default [
  createSoftBreakPlugin({
    rules: [
      { hotkey: 'shift+enter' },
      {
        hotkey: 'enter',
        query: {
          allow: [ELEMENT_BLOCKQUOTE],
        },
      },
    ],
  }),
];
