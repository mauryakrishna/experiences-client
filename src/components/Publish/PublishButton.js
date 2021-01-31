import React, { useState, useCallback } from 'react';
import { useApolloClient } from 'react-apollo-hooks';
import localStorage from 'local-storage';
import {
  PseudoBox,
  Text,
  Flex,
  Box,
  Code,
  useDisclosure,
  Modal,
  ModalBody,
  ModalOverlay,
  ModalContent,
  ModalCloseButton,
} from '@chakra-ui/core';

import FirstPublish from './FirstPublish';
import SaveNPublish from './SaveNPublish';
import history from '../../history';
import { Button } from '../UIElements';
import PublishModal from './PublishModal';
import ShowSaveState from './ShowSaveState';
import {
  GET_EXPERIENCE_TITLE,
  GET_EXPERIENCE_EXPERIENCE,
  GET_EXPERIENCE_ISPUBLISHED,
} from '../../queries/experience';

const PublishExperience = ({ saveState }) => {
  const client = useApolloClient();
  const { isOpen, onOpen, onClose, onToggle } = useDisclosure();
  const { ispublished } = client.readQuery({
    query: GET_EXPERIENCE_ISPUBLISHED,
  });

  const [disableButton] = useState(false);
  const [buttonText, setButtonText] = useState(
    ispublished ? 'Save & Publish' : 'Publish',
  );

  const cb = ({ slug, slugkey }) => {
    if (slug && slugkey) {
      history.push(`/${localStorage.get('username')}/${slug}-${slugkey}`);
    }
  };

  let publishDebounce = null;
  if (ispublished) {
    publishDebounce = SaveNPublish({ cb });
  } else {
    publishDebounce = FirstPublish({ cb });
  }

  const [errMessage, setErrMessage] = useState('');

  const handlePublish = useCallback(() => {
    const { title } = client.readQuery({ query: GET_EXPERIENCE_TITLE });
    const { experience } = client.readQuery({
      query: GET_EXPERIENCE_EXPERIENCE,
    });

    if (!title) {
      setErrMessage('Kindly give a title.');
    } else if (!experience) {
      setErrMessage('Kindly add an experience.');
    } else {
      ispublished ? continuePublishing() : onOpen();
    }
  });

  const continuePublish = (enableThoughts) => {
    setButtonText('Publishing....');
    // hit api for publish
    publishDebounce(enableThoughts);
    onToggle();
  }

  return (
    <Flex>
      <Flex>
        <Button disabled={disableButton} cursor="pointer" onClick={handlePublish}>
          <Text>{buttonText}</Text>
        </Button>

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
              <PublishModal onPublishCb={continuePublish}/>
            </ModalBody>
          </ModalContent>
        </Modal>
      </Flex>
      <Flex>
        <Text display="flex" alignItems="center">{errMessage}</Text>
      </Flex>
      <Flex ml="auto" mr="0">
        <ShowSaveState state={saveState} />
      </Flex>
    </Flex>
  );
};

export default PublishExperience;
