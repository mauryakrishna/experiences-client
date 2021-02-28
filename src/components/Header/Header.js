import React from 'react';
import loadable from "@loadable/component";
import history from "../../history";
import { Box, Flex, Text } from '@chakra-ui/core';

import Link from '../Link';
const Authenticate = loadable(()=> import('./Authenticate'))

export default function Header() {
  const takeToEditor = () => {
    history.push("/writeanexperience");
  }

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
      <Flex marginTop="3px" marginRight="auto" onClick={takeToEditor} cursor="pointer">
        <svg 
          stroke="blanchedalmond"
          fill="darkgray"
          width="24"
          height="24"
          viewBox="0 0 24 24" 
          aria-hidden="true"
        >
          <path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34a.9959.9959 0 00-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"></path>
        </svg>
      </Flex>
      <Box>
        <Authenticate />
      </Box>
    </Flex>
  );
}
