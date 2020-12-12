import React from 'react';
import loadable from '@loadable/component';
import { Box } from '@chakra-ui/core';
const GetStartedButton = loadable(()=> import('./GetStartedButton'));
const InspireText = loadable(()=> import('../UIElements/InspireText'));

const Inspire = () => {
  const inspiringWords = [
    ['Experiences..', 'makes life', 'share it to', 'make new.'],
    ['Be the first', 'to share', 'your experiences.'],
    ['Feel glad,', 'share your experiences.'],
    ['Speak', 'your ideas', 'to the world.'],
    [
      'It really makes',
      'feel lighthearted',
      'when you share',
      'your learnings',
    ],
  ];

  const { length } = inspiringWords;
  const pick = Math.floor(Math.random() * 10) % length;

  const wordsArray = inspiringWords[pick];

  const sentence = wordsArray.map(word => {
    return <InspireText key={word}>{word}</InspireText>;
  });

  return (
    <Box position="relative" top="10%" textAlign="center">
      {sentence}
      <GetStartedButton />
    </Box>
  );
};

export default Inspire;
