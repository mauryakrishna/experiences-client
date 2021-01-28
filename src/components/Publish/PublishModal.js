import React from 'react';
import { Checkbox, Box, Text, Flex } from "@chakra-ui/core";
import TextLikeLink from '../UIElements/TextLikeLink';

const PublishModal = ({ onPublishCb }) => {
  return (
    <>
      <Flex p="15px">
        <Flex align="baseline">
          <Checkbox size="lg" px="5px" py="5px" variantColor="green" defaultIsChecked />
        </Flex>
        <Box>
          <Text>Let reader express their thoughts.</Text>
          <Text fontSize={{ base: '0.5rem', sm: '0.7rem', md: '0.7rem' }}>
            Checking this box, reader will be able to express their
            thoughts which will appear in thoughts at the bottom of experience.
          </Text>
          <br />
          <TextLikeLink cursor="pointer" onClick={onPublishCb}>
            Continue to publish
          </TextLikeLink>
        </Box>
      </Flex>
      
    </>
  );
}

export default PublishModal;