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
  ModalCloseButton,
} from '@chakra-ui/core';

import RegisterForm from './RegisterForm';
import { SetLoginData } from '../SetLoginData';

export default () => {
  const { isOpen, onOpen, onClose, onToggle } = useDisclosure();

  const handleClick = () => {
    plausible('Get Started', {props: { mtehod: 'Landing Page - Not LoggedIn'}})
    onOpen()
  }
  const cb = (author, token) => {
    SetLoginData(author, token);
    // and close the login modal
    onToggle();
  };

  return (
    <Flex>
      <PseudoBox cursor="pointer" onClick={handleClick}>
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
        <ModalContent borderWidth={1} borderRadius={8}>
          <ModalCloseButton />
          <ModalBody p={5}>
            <RegisterForm registerCallback={cb} />
          </ModalBody>
        </ModalContent>
      </Modal>
    </Flex>
  );
};
