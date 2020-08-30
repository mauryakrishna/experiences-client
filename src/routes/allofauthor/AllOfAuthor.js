/* eslint-disable prettier/prettier */
/* eslint-disable no-shadow */
import React, { useState, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';
import { useQuery } from 'react-apollo-hooks';
import gql from 'graphql-tag';
import localStorage from 'local-storage';

import {
  Flex,
  Stack,
  PseudoBox,
  Textarea,
  Editable,
  EditablePreview,
  EditableInput,
} from '@chakra-ui/core';

import {
  Button,
  SectionHeader,
  TitleInList,
} from '../../components/UIElements';
import AuthorActions from './AuthorActions';
import Link from '../../components/Link';
import UpdateAuthorDetails from './UpdateAuthorDetails';

const AllOfAuthor = ({ authoruid }) => {
  const [displayname, setDisplayname] = useState('');
  const [shortintro, setShortintro] = useState('');
  const [experiences, setExperiences] = useState([]);
  const [disableButton, setDisableButton] = useState(true);
  const [cursor, setCursor] = useState(null);
  const allowActions = authoruid === localStorage.get('username');
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

  const handleDisplayNameChange = value => {
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
    <PseudoBox px={24} py={2}>
      <Flex py={2}>
        <Editable
          fontSize="20px"
          fontWeight="700"
          value={`${displayname}`}
          onChange={handleDisplayNameChange}
        >
          <EditablePreview />
          <EditableInput />
        </Editable>
      </Flex>
      <Flex>
        <Textarea
          p={0}
          fontSize="18px"
          fontWeight="500"
          borderWidth="0"
          resize="none"
          onChange={handleIntroChange}
          value={`${shortintro}`}
        />
      </Flex>
      <Flex>
        {allowActions && (
          <Button isDisabled={disableButton} onClick={handleSaveAuthorDetails}>
            Save
          </Button>
        )}
        {allowActions && (
          <Button disabled={disableButton} onClick={handleCancelChanges}>
            Cancel
          </Button>
        )}
      </Flex>

      <SectionHeader>All Experiences </SectionHeader>

      <Stack spacing={3}>
        {experiences &&
          experiences.map(experience => {
            const { title, slugkey, slug, ispublished } = experience;
            return (
              <Flex
                key={slugkey}
                p={2}
                borderWidth="1px"
                borderColor="gray.100"
                borderRadius="8px"
                w="100%"
              >
                <TitleInList w="100%">
                  <Link to={`/${slug}-${slugkey}`}>{title}</Link>
                </TitleInList>
                <Flex align="center" justify="center">
                  {allowActions && (
                    <AuthorActions {...{ ispublished, slugkey }} />
                  )}
                </Flex>
              </Flex>
            );
          })}
      </Stack>

      <Button onClick={loadMoreExperiences}>Load more...</Button>
    </PseudoBox>
  );
};

AllOfAuthor.propTypes = {
  authoruid: PropTypes.string.isRequired,
};
export default AllOfAuthor;
