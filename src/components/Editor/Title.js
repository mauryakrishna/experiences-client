import React, { useState, useRef, useContext } from 'react';
import { useCombobox } from 'downshift'
import useMergedRef from '@react-hook/merged-ref'
import PropTypes from 'prop-types';
import { useApolloClient } from 'react-apollo-hooks';
import { Textarea, Flex } from '@chakra-ui/core';
import UserContext from "../UserContext"
import { EXPERIENCE_TITLE_MAX_ALLOWED_CHARACTERS } from '../../ConfigConstants';
import TitleCombobox from './TitleCombobox';
import {items, menuStyles, comboboxStyles} from './shared'
import calculateNumberOfLines from '../../utils/calculateNumberOfLines';
import getTextAreaCursorXY from 'textarea-caret'

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
  const comboboxRef = useRef()
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


  const [inputItems, setInputItems] = useState(items)
  const {
    isOpen,
    getMenuProps,
    getInputProps,
    getComboboxProps,
    highlightedIndex,
    getItemProps,
    setInputValue,
  } = useCombobox({
    items: inputItems,
    onInputValueChange: (props) => {
      const { inputValue, isOpen } = props
      const word = inputValue.trim().split(" ")
      const filterTerm = word[word.length - 1].toLowerCase()
      isOpen && !!filterTerm && setInputItems(
        items.filter((item) =>
          item.toLowerCase().startsWith(filterTerm),
        ),
      )
    },
    stateReducer: (state, actionAndChanges) => {
      const {type, changes} = actionAndChanges
      switch (type) { 
        case useCombobox.stateChangeTypes.InputKeyDownEnter:
          const titleSplit = title.trim().split(" ")
          titleSplit.splice(titleSplit.length - 1, 1)
          titleSplit.push(changes.inputValue)
          const updatedTitle = titleSplit.join(" ").trim()
          changes.inputValue = updatedTitle
          return {
            ...changes,
          }
        default:
          return changes
      }
    }
  })
  
  const menuProps = getMenuProps()
  const multiRef = useMergedRef(menuProps.ref, comboboxRef)

  const setOptionsPosition = (domRef) => {
    const el = comboboxRef.current
    const coords = getTextAreaCursorXY(domRef.target, domRef.target.selectionEnd)
    const { offsetLeft, offsetTop} = domRef.target
    const numberOfLines = calculateNumberOfLines(domRef.target)
    coords.left = coords.left + offsetLeft
    coords.top = offsetTop
    el.style.top = `${coords.top + window.pageYOffset + coords.height * numberOfLines}px`;
    el.style.left = `${coords.left + window.pageXOffset}px`;
  }

  return (
    <React.Fragment>
      <TitleCombobox 
        inputItems={inputItems}
        menuProps={menuProps} 
        isOpen={isOpen}
        comboboxRef={multiRef} 
        highlightedIndex={highlightedIndex}
        getItemProps={getItemProps}
      />
      <Flex {...getComboboxProps()}>
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
          {...getInputProps({
            onChange: (event) => { 
              validateTitle(event)
              setOptionsPosition(event)
            },
            onKeyPress: (event)=> {
              if (event.key === 'Enter') {
                event.preventDefault();
              }
            }
          })}
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
