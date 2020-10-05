/* eslint-disable prettier/prettier */
/* eslint-disable no-shadow */
import React, { useState, useRef, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';
import { useQuery } from 'react-apollo-hooks';
import gql from 'graphql-tag';
import localStorage from 'local-storage';

import {
  Text,
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
  AutoResizeTextarea,
  ExperienceTitleInList,
  PublishDate,
  Loading,
} from '../../components/UIElements';
import AuthorActions from './AuthorActions';
import Link from '../../components/Link';
import UpdateAuthorDetails from './UpdateAuthorDetails';
import { SHORT_INTRO_MAX_CHARACTERS_LIMIT } from '../../ConfigConstants';

const AllOfAuthor = ({ authoruid }) => {
  const [displayname, setDisplayname] = useState('');
  const [shortintro, setShortintro] = useState('');
  const [experiences, setExperiences] = useState([]);
  const [disableButton, setDisableButton] = useState(true);
  const [cursor, setCursor] = useState(null);
  const [showShortIntroLimit, setShowShortIntroLimit] = useState(false);
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
            publishdate
            created_at
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

  // for auto resizing the shortintro textarea
  const ref = useRef();

  useEffect(() => {
    setData(data);
  }, [data]);

  const handleDisplayNameChange = value => {
    setDisplayname(value);
    setDisableButton(false);
  };

  const handleIntroChange = event => {
    const { value } = event.target;
    if (value.length <= SHORT_INTRO_MAX_CHARACTERS_LIMIT) {
      setShortintro(value);
    } else {
      // set allowed characters
      setShortintro(value.substring(SHORT_INTRO_MAX_CHARACTERS_LIMIT, 0));
      // show the charecter limit
      setShowShortIntroLimit(true);
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
    return <Loading />;
  }
  return (
    <PseudoBox px={{ base: '1.5rem', sm: '2rem', md: '6rem' }} py={2}>
      <Flex py={2}>
        <Editable
          fontSize="30px"
          fontWeight="300"
          value={`${displayname}`}
          onChange={handleDisplayNameChange}
        >
          <EditablePreview />
          <EditableInput />
        </Editable>
      </Flex>
      <Flex>
        <Textarea
          placeholder="A short bio about you."
          inputRef={ref}
          p={0}
          minHeight="0"
          fontSize="18px"
          fontWeight="300"
          borderWidth="0"
          resize="none"
          focusBorderColor="white"
          as={AutoResizeTextarea}
          onChange={handleIntroChange}
          onKeyPress={event => {
            if (event.key === 'Enter') {
              event.preventDefault();
            }
          }}
          value={`${shortintro || ''}`}
        />
      </Flex>
      {showShortIntroLimit && (
        <Flex>
          <Text
            fontWeight="100"
            pt={2}
            fontSize={{ base: '0.5rem', sm: '0.7rem', md: '0.8rem' }}
            width="100%"
            color="gray.600"
          >{`Maximum ${SHORT_INTRO_MAX_CHARACTERS_LIMIT} characters allowed.`}</Text>
        </Flex>
      )}
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

      <SectionHeader>Experiences </SectionHeader>

      <Stack spacing={3}>
        {experiences &&
          experiences.map(experience => {
            const {
              title,
              slugkey,
              slug,
              ispublished,
              publishdate,
              // eslint-disable-next-line camelcase
              created_at,
            } = experience;
            return (
              <Flex
                key={slugkey}
                p={2}
                borderWidth="1px"
                borderColor="gray.200"
                borderRadius="8px"
                w="100%"
              >
                <ExperienceTitleInList>
                  <Link to={`/${slug}-${slugkey}`}>{title}</Link>

                  <Flex>
                    <PublishDate>
                      {ispublished
                        ? `Published on ${publishdate}`
                        : // eslint-disable-next-line camelcase
                          `Started ${created_at}`}
                    </PublishDate>
                  </Flex>
                </ExperienceTitleInList>

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
