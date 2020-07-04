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

  const updateDebounce = UpdateAuthorDetails();

  const GET_AUTHOR_QUERY = gql`
    query getAuthor($uid: String!) {
      getAuthor(uid: $uid) {
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
  `;

  const { data, error, loading } = useQuery(GET_AUTHOR_QUERY, {
    variables: {
      uid: authoruid,
    },
  });

  if (error) {
    console.log('error', error);
  }

  const setData = data => {
    if (data && data.getAuthor) {
      const { displayname, shortintro, experiences } = data.getAuthor;
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
          const { slug, slugkey } = experience;
          const link = `${slug}-${slugkey}`;
          return (
            <h4 key={experience.slugkey}>
              <Link to={link}>{experience.title}</Link>
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
