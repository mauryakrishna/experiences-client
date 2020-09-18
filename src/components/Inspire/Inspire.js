import React from 'react';
import { Flex, Box, Stack } from '@chakra-ui/core';
import GetStartedButton from './GetStartedButton';
import InspireText from '../UIElements/InspireText';

const Inspire = () => {
  const inspiringWords = [
    ['Experiences....', 'makes life', 'share it to', 'make new.'],
  ];

  const { length } = inspiringWords;
  const pick = Math.floor(Math.random() * 10) % length;

  const wordsArray = inspiringWords[pick];

  const sentence = wordsArray.map(word => {
    return (
      <Flex>
        <InspireText>{word}</InspireText>
      </Flex>
    );
  });

  return (
    <Flex position="relative" top="10%" textAlign="center">
      {sentence}
      <GetStartedButton />
    </Flex>
  );
};

export default Inspire;
