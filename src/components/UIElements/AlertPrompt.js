import React from 'react';
import PropTypes from 'prop-types';
import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
} from '@chakra-ui/core';

import Button from './Button';

const AlertPrompt = React.forwardRef((props, ref) => {
  const {
    header,
    body,
    cancelBtnText,
    onCancel,
    yesBtnText,
    onYes,
    isOpen,
  } = props;
  const cancelRef = ref;

  const onCancelClick = () => {
    onCancel();
  };

  const onYesClick = () => {
    onYes();
  };

  return (
    <AlertDialog
      isOpen={isOpen}
      leastDestructiveRef={cancelRef}
      blockScrollOnMount={false}
      onClose={() => {}}
    >
      <AlertDialogOverlay bg="white" opacity="0.7" />
      <AlertDialogContent>
        <AlertDialogHeader fontSize="lg" fontWeight="bold">
          {header}
        </AlertDialogHeader>

        <AlertDialogBody>{body}</AlertDialogBody>

        <AlertDialogFooter>
          <Button ref={cancelRef} onClick={onCancelClick}>
            {cancelBtnText}
          </Button>
          <Button variantColor="red" onClick={onYesClick} ml={3}>
            {yesBtnText}
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
});

AlertPrompt.propTypes = {
  header: PropTypes.string,
  body: PropTypes.string.isRequired,
  cancelBtnText: PropTypes.string,
  onCancel: PropTypes.func,
  yesBtnText: PropTypes.string,
  onYes: PropTypes.func,
  isOpen: PropTypes.bool.isRequired,
};

AlertPrompt.defaultProps = {
  header: null,
  cancelBtnText: 'No',
  onCancel: () => {},
  yesBtnText: 'Yes',
  onYes: () => {},
};

export default AlertPrompt;
