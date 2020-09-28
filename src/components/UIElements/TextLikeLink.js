import React from 'react';
import PropTypes from 'prop-types';
import { Link } from '@chakra-ui/core';

export default function TextLikeLink(props) {
  return (
    <Link
      fontSize={{ base: '0.7rem', sm: '0.7rem', md: '0.9rem' }}
      color="teal.500"
      _hover={{
        textDecoration: 'underline',
      }}
      cursor="pointer"
      {...props}
    >
      {props.children}
    </Link>
  );
}
TextLikeLink.propTypes = {
  children: PropTypes.node.isRequired,
};
