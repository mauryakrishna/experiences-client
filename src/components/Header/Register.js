import React from 'react';
import {
  Flex,
  PseudoBox,
  Text,
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalBody,
  useDisclosure,
} from '@chakra-ui/core';

export default () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const redirect = url => {
    window.location.href = url;
  };

  const facebook = () => {
    redirect(`${window.location.origin}/login/facebook`);
  };

  return (
    <Flex>
      <PseudoBox cursor="pointer" onClick={onOpen}>
        <Text>Register</Text>
      </PseudoBox>
      <Modal
        blockScrollOnMount={false}
        isOpen={isOpen}
        onClose={onClose}
        isCentered
        size="500px"
      >
        <ModalOverlay bg="white" opacity="0.7" />
        <ModalContent>
          <ModalBody p={5}>
            <PseudoBox align="center">
              <Text fontWeight="bold" mb="1rem">
                Choose to...
              </Text>
              <Button
                onClick={facebook}
                bg="#3b5998"
                _hover={{ bg: '#2d4373' }}
              >
                <Text color="white">Register with facebook</Text>
              </Button>
            </PseudoBox>
          </ModalBody>
        </ModalContent>
      </Modal>
    </Flex>
  );
};
