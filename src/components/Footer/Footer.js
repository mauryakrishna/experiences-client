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
          <Link to="/@team/about-ru97dtbga1e">About</Link>
        </FooterText>
        <Divider />
        <FooterText>
          <Link to="/@team/privacy-s66ekejmekn">Privacy</Link>
        </FooterText>
        <Divider />
        <FooterText>
          <Link to="/@team/terms-of-use-uoirf3l3b2">Terms of Use</Link>
        </FooterText>
        <Divider />
      </Flex>
    </Flex>
  );
}
