import React, { useState, useRef, useContext, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useApolloClient } from 'react-apollo-hooks';
import { Textarea, Flex } from '@chakra-ui/core';
import UserContext from "../UserContext"
import { EXPERIENCE_TITLE_MAX_ALLOWED_CHARACTERS } from '../../ConfigConstants';

import {
  GET_EXPERIENCE_TITLE,
  GET_EXPERIENCE_ISPUBLISHED,
} from '../../queries/experience';

import SaveTitle from './SaveTitle';

import { AutoResizeTextarea } from '../UIElements';

const Title = ({ cb }) => {
  const client = useApolloClient();
  const titleData = client.readQuery({ query: GET_EXPERIENCE_TITLE });
  const { ispublished } = client.readQuery({
    query: GET_EXPERIENCE_ISPUBLISHED,
  });

  const useLoggedInContext = useContext(UserContext);
  let saveTitleDebounceCb = SaveTitle({ cb });

  const [title, setTitle] = useState(titleData.title || '');
  const [showMessage, setShowMessage] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(()=> {
    // added below save step to save the title just after user logs in after providing title
    // because there will not be any change event happening after login, need to save manually
    if(useLoggedInContext.loggedin && title && title.length>0 && title.length<=EXPERIENCE_TITLE_MAX_ALLOWED_CHARACTERS) {
      saveTitleDebounceCb(title)
    }
  }, [useLoggedInContext.loggedin])
  
  const ref = useRef();
  const validateTitle = event => {
    let { value } = event.target;

    // remove more than one space
    value = value.replace(/\s\s+/g, ' ');

    if (value.length <= EXPERIENCE_TITLE_MAX_ALLOWED_CHARACTERS) {
      setTitle(value);

      // do not auto save if experience is already published
      if (ispublished) {
        // keep in cache so that can be taken for savenpublish after comparision
        client.writeData({ data: { title: value } });
      } else if(useLoggedInContext.loggedin && value !== title) {
        // placed here to avoid unneccesaary trigger of change this placed here
        saveTitleDebounceCb(value);
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
          inputRef={ref}
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
  cb: PropTypes.func.isRequired,
};

export default React.memo(Title);
