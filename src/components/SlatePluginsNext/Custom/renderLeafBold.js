import React from 'react';
// eslint-disable-next-line import/prefer-default-export
export const renderLeafBold = ({ children, leaf }) => {
  if (leaf.strong && !!leaf.text) {
    return <strong className="slate-strong">{children}</strong>;
  }

  return children;
};
