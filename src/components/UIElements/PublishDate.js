import React from 'react';
import PropTypes from 'prop-types';
import { Text } from '@chakra-ui/core';

const PublishDate = React.forwardRef((props, ref) => {
  return (
    <Text
      ref={ref}
      fontWeight="400"
      pt={2}
      fontSize={{ base: '0.75rem', md: '0.8rem' }}
      maxWidth="100%"
      color="gray.600"
      {...props}
    >
      {props.children}
    </Text>
  );
});

PublishDate.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
};

PublishDate.defaultProps = {
  children: {},
};
export default PublishDate;
