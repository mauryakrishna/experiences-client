import React from 'react';
import PropTypes from 'prop-types';
import Link from '../../components/Link';
import { Tooltip, Icon } from '../../components/UIElements';

const AuthorActions = ({ slugkey, ispublished }) => {
  return (
    <>
      <Link to={`/edit/${slugkey}`}>
        <Tooltip label="Edit">
          <Icon name="edit" />
        </Tooltip>
      </Link>

      {!ispublished && (
        <Link to={`/publish/${slugkey}`}>
          <Tooltip label="Publish">
            <Icon name="external-link" />
          </Tooltip>
        </Link>
      )}

      <Link to={`/delete/${slugkey}`}>
        <Tooltip label="Delete">
          <Icon name="delete" />
        </Tooltip>
      </Link>
    </>
  );
};

AuthorActions.propTypes = {
  slugkey: PropTypes.string.isRequired,
  ispublished: PropTypes.bool.isRequired,
};
export default AuthorActions;
