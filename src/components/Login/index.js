import React from 'react';
import {
  PseudoBox,
  Text,
  Flex,
  useDisclosure,
  Modal,
  ModalBody,
  ModalOverlay,
  ModalContent,
} from '@chakra-ui/core';

import LoginForm from './LoginForm';
import { SetLoginData } from '../SetLoginData';

// eslint-disable-next-line react/prop-types
export default ({ whenLoginSuccess }) => {
  const { isOpen, onOpen, onClose, onToggle } = useDisclosure();

  const LoginCallback = (author, token) => {
    SetLoginData(author, token);
    whenLoginSuccess();
    // and close the login modal
    onToggle();
  };

  return (
    <Flex>
      <PseudoBox cursor="pointer" onClick={onOpen}>
        <Text>Login</Text>
      </PseudoBox>

      <Modal
        blockScrollOnMount={false}
        isOpen={isOpen}
        onClose={onClose}
        isCentered
      >
        <ModalOverlay bg="white" opacity="0.7" />
        <ModalContent borderWidth={1} borderRadius={8}>
          <ModalBody>
            <LoginForm loginCallback={LoginCallback} />
          </ModalBody>
        </ModalContent>
      </Modal>
    </Flex>
  );
};
