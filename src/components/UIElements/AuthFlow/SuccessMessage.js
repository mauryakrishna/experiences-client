import React from 'react';
import PropTypes from 'prop-types';
import Message from './Message';

export default function SuccessMessage(props) {
  return <Message status="success">{props.children}</Message>;
}

SuccessMessage.propTypes = {
  children: PropTypes.node.isRequired,
};
