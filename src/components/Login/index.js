import React, { useState } from 'react';
import {
  PseudoBox,
  Text,
  Flex,
  useDisclosure,
  Modal,
  ModalBody,
  ModalOverlay,
  ModalContent,
  ModalCloseButton,
} from '@chakra-ui/core';

import LoginForm from './LoginForm';
import ForgotPasswordForm from '../ForgotPassword';


// eslint-disable-next-line react/prop-types
export default () => {
  const [toggleForm, setToggleForm] = useState(true);
  const { isOpen, onOpen, onClose, onToggle } = useDisclosure();

  const handleLoginClick = () => {
    onOpen()
    plausible('LoginButton', {props: { method: 'Header'}})
  }
  const LoginCallback = () => {
    // and close the login modal
    onToggle();
  };

  return (
    <Flex>
      <PseudoBox cursor="pointer" onClick={handleLoginClick}>
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
          <ModalCloseButton />
          <ModalBody>
            {toggleForm ? (
              <LoginForm loginCallback={LoginCallback} toggle={setToggleForm} />
            ) : (
              <ForgotPasswordForm toggle={setToggleForm} />
            )}
          </ModalBody>
        </ModalContent>
      </Modal>
    </Flex>
  );
};
