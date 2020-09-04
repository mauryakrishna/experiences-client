import React from 'react';
import PropTypes from 'prop-types';

import { Flex, Text, PseudoBox, Avatar } from '@chakra-ui/core';

import Link from '../Link';

const AuthorDisplay = ({ uid, displayname, shortintro }) => {
  return (
    <PseudoBox align="left">
      <Flex align="flex-end">
        <Avatar name={`${displayname}`} mr={3} />
        <Flex display="block">
          <Link to={`/author/${uid}`}>{displayname}</Link>
          <Text>{shortintro}</Text>
        </Flex>
      </Flex>
    </PseudoBox>
  );
};

AuthorDisplay.propTypes = {
  uid: PropTypes.string.isRequired,
  displayname: PropTypes.string.isRequired,
  shortintro: PropTypes.string,
};

AuthorDisplay.defaultProps = {
  shortintro: null,
};
export default AuthorDisplay;
