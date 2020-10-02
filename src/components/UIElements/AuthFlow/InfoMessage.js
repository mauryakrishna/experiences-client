import React from 'react';
import PropTypes from 'prop-types';
import Message from './Message';

export default function InfoMessage(props) {
  return <Message status="info">{props.children}</Message>;
}
InfoMessage.propTypes = {
  children: PropTypes.node.isRequired,
};
