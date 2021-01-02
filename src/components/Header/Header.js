import React from 'react';
import loadable from "@loadable/component";
import { Box, Flex, Heading, Text } from '@chakra-ui/core';

import Link from '../Link';
const Authenticate = loadable(()=> import('./Authenticate'))

export default function Header() {
  return (
    <Flex
      as="nav"
      align="center"
      justify="space-between"
      wrap="wrap"
      px="1rem"
      py="0.8rem"
      bg="teal.500"
      color="white"
    >
      <Flex align="center" mr={3} fontWeight="500">
        <Link to="/">
          <Text fontSize="1.8rem" color="white">
            Experiences
            </Text>
        </Link>
      </Flex>

      <Box>
        <Authenticate />
      </Box>
    </Flex>
  );
}
