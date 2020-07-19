import { ELEMENT_BLOCKQUOTE, SoftBreakPlugin } from '@udecode/slate-plugins';

export default [
  SoftBreakPlugin({
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
