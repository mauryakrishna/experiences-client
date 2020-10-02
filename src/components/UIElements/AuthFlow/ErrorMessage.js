import React from 'react';
import PropTypes from 'prop-types';
import Message from './Message';

export default function ErrorMessage(props) {
  return <Message status="error">{props.children}</Message>;
}
ErrorMessage.propTypes = {
  children: PropTypes.node.isRequired,
};
