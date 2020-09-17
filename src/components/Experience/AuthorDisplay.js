import React from 'react';
import PropTypes from 'prop-types';
import { Flex, PseudoBox, Avatar } from '@chakra-ui/core';

import { PublishDate } from '../UIElements';
import Link from '../Link';

const AuthorDisplay = ({ uid, displayname, publishdate }) => {
  return (
    <PseudoBox align="left">
      <Flex align="flex-end">
        <Avatar mr={3} />
        <Flex display="block">
          <Link to={`/author/${uid}`}>{displayname}</Link>
          <PublishDate>{publishdate}</PublishDate>
        </Flex>
      </Flex>
    </PseudoBox>
  );
};

AuthorDisplay.propTypes = {
  uid: PropTypes.string.isRequired,
  displayname: PropTypes.string.isRequired,
  publishdate: PropTypes.string.isRequired,
};

export default AuthorDisplay;
