import React from "react"
import PropTypes from 'prop-types';
import { Heading } from '@chakra-ui/core';

const ExperienceIntroText = props => {
  return (
    <Heading
      as="p"
      fontWeight="400"
      mt={"4px"}
      ml={"1px"}
      fontSize={{ base: '1rem', md: '0.85rem' }}
      width="100%"
      lineHeight="1.5"
      color="gray.900"
      {...props}
    >
      {props.children}
    </Heading>
  );
};

ExperienceIntroText.propTypes = {
  children: PropTypes.node.isRequired,
};

export default ExperienceIntroText;