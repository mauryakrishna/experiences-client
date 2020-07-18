/* eslint-disable prettier/prettier */
/* eslint-disable no-shadow */
import React, { useState, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';
import { useQuery } from 'react-apollo-hooks';
import gql from 'graphql-tag';

import Link from '../../components/Link';
import UpdateAuthorDetails from './UpdateAuthorDetails';

const AllOfAuthor = ({ authoruid }) => {
  const [displayname, setDisplayname] = useState('');
  const [shortintro, setShortintro] = useState('');
  const [experiences, setExperiences] = useState([]);
  const [disableButton, setDisableButton] = useState(true);
  const [cursor, setCursor] = useState(null);
  const experienceperpage = 10;
  const updateDebounce = UpdateAuthorDetails();

  const GET_AUTHOR_QUERY = gql`
    query getAuthor($cursor: String, $experienceperpage: Int!, $uid: String!) {
      getAuthor(
        cursor: $cursor
        experienceperpage: $experienceperpage
        uid: $uid
      ) {
        cursor
        author {
          displayname
          shortintro
          experiences {
            title
            slug
            slugkey
            ispublished
          }
        }
      }
    }
  `;

  const { data, loading, fetchMore } = useQuery(GET_AUTHOR_QUERY, {
    variables: {
      experienceperpage,
      uid: authoruid,
    },
  });

  const loadMoreExperiences = () => {
    fetchMore({
      query: GET_AUTHOR_QUERY,
      variables: {
        cursor,
        experienceperpage,
        uid: authoruid,
      },
      updateQuery: (prev, { fetchMoreResult }) => {
        const prevExp = prev.getAuthor.author.experiences;
        const newExp = fetchMoreResult.getAuthor.author.experiences;
        const updatedcursor = fetchMoreResult.getAuthor.cursor;
        const combined = [...prevExp, ...newExp];
        return {
          getAuthor: {
            cursor: updatedcursor,
            author: {
              displayname: fetchMoreResult.getAuthor.author.displayname,
              shortintro: fetchMoreResult.getAuthor.author.shortintro,
              experiences: combined,
            },
          },
        };
      },
    });
  };

  const setData = data => {
    if (data && data.getAuthor) {
      const updatedcursor = data.getAuthor.cursor;
      const { displayname, shortintro, experiences } = data.getAuthor.author;
      setCursor(updatedcursor);
      setDisplayname(displayname);
      setShortintro(shortintro);
      setExperiences(experiences);
    }
  };

  useEffect(() => {
    setData(data);
  }, [data]);

  const handleDisplayNameChange = event => {
    const { value } = event.target;
    setDisplayname(value);

    setDisableButton(false);
  };

  const handleIntroChange = event => {
    const { value } = event.target;

    if (value.length <= 500) {
      setShortintro(value);
    } else {
      // show the charecter limit
    }

    setDisableButton(false);
  };

  const handleSaveAuthorDetails = useCallback(() => {
    // make a mutation call
    updateDebounce({
      displayname,
      shortintro,
      authoruid,
      cb: updated => {
        setDisableButton(updated);
      },
    });
  });

  const handleCancelChanges = () => {
    // reverse changes
    setData(data);

    // disable button
    setDisableButton(true);
  };

  if (loading) {
    return <h4>loading...</h4>;
  }
  return (
    <>
      <input
        type="text"
        onChange={handleDisplayNameChange}
        value={displayname}
      />
      <textarea type="text" onChange={handleIntroChange} value={shortintro} />
      <div>
        <button
          type="button"
          disabled={disableButton}
          onClick={handleSaveAuthorDetails}
        >
          Save
        </button>
      </div>
      <div>
        <button
          type="button"
          disabled={disableButton}
          onClick={handleCancelChanges}
        >
          Cancel
        </button>
      </div>
      {experiences &&
        experiences.map(experience => {
          const { title, slugkey } = experience;
          return (
            <h4 key={slugkey}>
              <span>{title}</span>
              <Link to={`/edit/${slugkey}`}>Edit</Link>
            </h4>
          );
        })}
      <button type="button" onClick={loadMoreExperiences}>
        Load more...
      </button>
    </>
  );
};

AllOfAuthor.propTypes = {
  authoruid: PropTypes.string.isRequired,
};
export default AllOfAuthor;
