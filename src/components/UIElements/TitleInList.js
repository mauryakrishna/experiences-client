/**
 * For displaying the experience's title in list.
 * Like on home page, Author details page.
 */

import React from 'react';
import { Text } from '@chakra-ui/core';

const TitleInList = props => {
  return (
    <Text fontWeight="800" height="18px" my={3} mr={1} color="gray.600">
      {props.children}
    </Text>
  );
};

// eslint-disable-next-line import/prefer-default-export
export default TitleInList;
