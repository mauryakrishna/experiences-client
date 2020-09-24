import React from 'react';
import {
  Flex,
  PseudoBox,
  Text,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalBody,
  useDisclosure,
} from '@chakra-ui/core';

import RegisterForm from './RegisterForm';

export default () => {
  const { isOpen, onOpen, onClose, onToggle } = useDisclosure();

  const cb = params => {
    console.log('register', params);

    //
    onToggle();
  };

  return (
    <Flex>
      <PseudoBox cursor="pointer" onClick={onOpen}>
        <Text>Get Started</Text>
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
            <RegisterForm registerCallback={cb} />
          </ModalBody>
        </ModalContent>
      </Modal>
    </Flex>
  );
};
