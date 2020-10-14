import React from 'react';
import PropTypes from 'prop-types';
import { Flex, Text } from '@chakra-ui/core';
import { Divider } from '../UIElements';
import Link from '../Link';

const FooterText = props => {
  return (
    <Text
      fontWeight="300"
      pt={2}
      fontSize={{ base: '0.7rem', sm: '0.7rem', md: '0.8rem' }}
      maxWidth="100%"
      color="black.100"
      {...props}
    >
      {props.children}
    </Text>
  );
};

FooterText.propTypes = {
  children: PropTypes.node.isRequired,
};

export default function Footer() {
  return (
    <Flex bg="green.50">
      <Flex align="flex-end" p={5}>
        <FooterText>
          <Link to="/">Experiences</Link> © {new Date().getFullYear()}
        </FooterText>
        <Divider />
        <FooterText>
          <Link to="/about">About</Link>
        </FooterText>
        <Divider />
        <FooterText>
          <Link to="/privacy">Privacy</Link>
        </FooterText>
        <Divider />
        <FooterText>
          <Link to="/privacy">Terms</Link>
        </FooterText>
        <Divider />
      </Flex>
    </Flex>
  );
}
