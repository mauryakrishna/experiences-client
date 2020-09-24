import React from 'react';
import { Box } from '@chakra-ui/core';
import GetStartedButton from './GetStartedButton';
import InspireText from '../UIElements/InspireText';

const Inspire = () => {
  const inspiringWords = [
    ['Experiences..', 'makes life', 'share it to', 'make new.'],
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
