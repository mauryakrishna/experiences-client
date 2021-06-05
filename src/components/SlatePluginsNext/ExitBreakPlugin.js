import {
  ELEMENT_H1,
  ELEMENT_H2,
  ELEMENT_H3,
  createExitBreakPlugin,
} from '@udecode/slate-plugins';

export default [
  createExitBreakPlugin({
    rules: [
      {
        hotkey: 'mod+enter',
      },
      {
        hotkey: 'mod+shift+enter',
        before: true,
      },
      {
        hotkey: 'enter',
        query: {
          start: true,
          end: true,
          allow: [ELEMENT_H1, ELEMENT_H2, ELEMENT_H3],
        },
      },
    ],
  }),
];
