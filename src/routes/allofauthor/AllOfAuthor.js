import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useQuery } from 'react-apollo-hooks';
import gql from 'graphql-tag';

import Link from '../../components/Link';

const AllOfAuthor = ({ authoruid }) => {
  const [authordetails, setAuthordetails] = useState({});

  const GET_AUTHOR_QUERY = gql`
    query getAuthor($uid: String!) {
      getAuthor(uid: $uid) {
        displayname
        shortintro
        experiences {
          title
          slugkey
          ispublished
        }
      }
    }
  `;

  const { data, error } = useQuery(GET_AUTHOR_QUERY, {
    variables: {
      uid: authoruid,
    },
  });

  if (error) {
    console.log('error', error);
  }

  useEffect(() => {
    if (data && data.getAuthor) {
      const authordata = data.getAuthor;
      setAuthordetails(authordata);
    }
  }, [data]);

  return (
    <>
      <span>{authordetails.displayname}</span>
      <span>{authordetails.shortintro}</span>
      {authordetails.experiences &&
        authordetails.experiences.map(experience => {
          return (
            <h4>
              {experience.title}
              <Link to={`/edit/${experience.slugkey}`}>Edit</Link>
            </h4>
          );
        })}
    </>
  );
};

AllOfAuthor.propTypes = {
  authoruid: PropTypes.string.isRequired,
};
export default AllOfAuthor;
