import React from 'react';
import { Flex } from '@chakra-ui/core';
import { Divider } from '../UIElements';
import Link from '../Link';

export default function Footer() {
  return (
    <Flex bg="green.50">
      <Flex align="flex-end">
        <span>© Your Company</span>
        <Divider />
        <Link to="/">Home</Link>
        <Divider />
        <Link to="/about">About</Link>
        <Divider />
        <Link to="/privacy">Privacy</Link>
      </Flex>
    </Flex>
  );
}
