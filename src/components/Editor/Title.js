import React, { useState, useRef, useContext } from 'react';
import PropTypes from 'prop-types';
import { useApolloClient } from 'react-apollo-hooks';
import { Textarea, Flex } from '@chakra-ui/core';
import UserContext from "../UserContext"
import { EXPERIENCE_TITLE_MAX_ALLOWED_CHARACTERS } from '../../ConfigConstants';

import {
  GET_EXPERIENCE_TITLE,
  GET_EXPERIENCE_ISPUBLISHED,
} from '../../queries/experience';

import { AutoResizeTextarea } from '../UIElements';

const Title = ({ saveDebounce }) => {
  const client = useApolloClient();
  const titleData = client.readQuery({ query: GET_EXPERIENCE_TITLE });
  const { ispublished } = client.readQuery({
    query: GET_EXPERIENCE_ISPUBLISHED,
  });

  const useLoggedInContext = useContext(UserContext);

  const [title, setTitle] = useState(titleData.title || '');
  const [showMessage, setShowMessage] = useState(false);
  const [message, setMessage] = useState('');
  
  const ref = useRef();
  const validateTitle = event => {
    let { value } = event.target;

    // remove more than one space
    value = value.replace(/\s\s+/g, ' ');

    if (value.length <= EXPERIENCE_TITLE_MAX_ALLOWED_CHARACTERS) {
      setTitle(value);

      client.writeData({ data: { title: value } });
      if(useLoggedInContext.loggedin && value !== title && !ispublished) {
        // placed here to avoid unneccesaary trigger of change this placed here
        saveDebounce();
      }
    } else {
      setMessage(`Max Allowed ${EXPERIENCE_TITLE_MAX_ALLOWED_CHARACTERS} characters`);
      setShowMessage(true);
    }
  };

  return (
    <React.Fragment>
      <Flex>
        <Textarea
          // eslint-disable-next-line jsx-a11y/no-autofocus
          ref={ref}
          px={0}
          autoFocus
          w="100%"
          minHeight="0"
          borderWidth="0"
          focusBorderColor="white"
          resize="none"
          fontWeight="400"
          fontSize={{ base: '2rem', sm: '2rem', md: '2.5rem' }}
          bg="transparent"
          placeholder="Start with the title..."
          value={title}
          as={AutoResizeTextarea}
          onChange={validateTitle}
          onKeyPress={event => {
            if (event.key === 'Enter') {
              event.preventDefault();
            }
          }}
          maxLength={`${EXPERIENCE_TITLE_MAX_ALLOWED_CHARACTERS}`}
          transition="height none"
        />
      </Flex>
      {showMessage && <span>{message}</span>}
    </React.Fragment>
  );
};

Title.propTypes = {
  saveDebounce: PropTypes.func.isRequired,
};

export default React.memo(Title);
