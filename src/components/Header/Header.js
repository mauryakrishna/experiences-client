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
      padding={['0.6rem', '0.7rem', '0.9rem']}
      bg="teal.500"
      color="white"
    >
      <Flex align="center" mr={3}>
        <Heading as="h3">
          <Link to="/">
            <Text
              fontSize={{ xs: '1.5rem', sm: '1.5rem', md: '1.8rem' }}
              color="white"
            >
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
