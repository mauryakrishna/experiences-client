import React from 'react';

import { Box, Flex, Heading, Text } from '@chakra-ui/core';

import Link from '../Link';
import Authenticate from './Authenticate';

export default function Header() {
  return (
    <Flex
      as="nav"
      align="center"
      justify="space-between"
      wrap="wrap"
      padding="1rem"
      bg="teal.500"
      color="white"
    >
      <Flex align="center" mr={3}>
        <Heading as="h3" size={['xs', 'sm', 'md', 'lg']} letterSpacing="-.1rem">
          <Link to="/">
            <Text fontSize="30px" color="white">
              Experiences
            </Text>
          </Link>
        </Heading>
      </Flex>

      <Box>
        <Authenticate />
      </Box>
    </Flex>
  );
}
