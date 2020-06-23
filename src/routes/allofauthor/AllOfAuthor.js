import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useQuery } from 'react-apollo-hooks';
import gql from 'graphql-tag';

const AllOfAuthor = ({ authorid }) => {
  const [authordetails, setAuthordetails] = useState({});

  const GET_AUTHOR_QUERY = gql`
    query getAuthor($authorid: String!) {
      getAuthor(authorid: $authorid) {
        displayname
        shortintro
        experiences {
          title
          ispublished
        }
      }
    }
  `;

  const { data, error } = useQuery(GET_AUTHOR_QUERY, {
    variables: {
      authorid,
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
          return <h4>{experience.title}</h4>;
        })}
    </>
  );
};

AllOfAuthor.propTypes = {
  authorid: PropTypes.string.isRequired,
};
export default AllOfAuthor;
