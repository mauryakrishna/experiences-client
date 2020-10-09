import React, { useState } from 'react';
import { useQuery } from 'react-apollo-hooks';
import gql from 'graphql-tag';
import { Box, Flex, Button, Stack, CircularProgress } from '@chakra-ui/core';

import Link from '../../components/Link';
import Inspire from '../../components/Inspire';
import {
  ExperienceTitleInList,
  PublishDate,
  Loading,
} from '../../components/UIElements';

export default function Home() {
  const [experiences, setExperiences] = useState([]);
  const experiencePerPage = 10;
  const [cursor, setCursor] = useState(null);
  const [fetchMoreLoading, setFetchMoreLoading] = useState(false);

  const GET_EXPERIENCES_QUERY = gql`
    query getExperiences($cursor: String, $experienceperpage: Int!) {
      getExperiences(cursor: $cursor, experienceperpage: $experienceperpage) {
        cursor
        experiences {
          title
          slug
          slugkey
          publishdate
          author {
            displayname
          }
        }
      }
    }
  `;

  const { loading, data, fetchMore } = useQuery(GET_EXPERIENCES_QUERY, {
    variables: { experienceperpage: experiencePerPage },
  });

  const loadMoreExperiences = () => {
    setFetchMoreLoading(true);
    fetchMore({
      query: GET_EXPERIENCES_QUERY,
      variables: { cursor, experienceperpage: experiencePerPage },
      updateQuery: (prev, { fetchMoreResult }) => {
        setFetchMoreLoading(false);
        const prevExp = prev.getExperiences.experiences;
        const newExp = fetchMoreResult.getExperiences.experiences;
        const updatedcursor = fetchMoreResult.getExperiences.cursor;
        const combined = [...prevExp, ...newExp];
        return {
          getExperiences: {
            cursor: updatedcursor,
            experiences: combined,
          },
        };
      },
    });
  };

  React.useEffect(() => {
    if (data && data.getExperiences) {
      const updatedexperiences = data.getExperiences.experiences;
      setExperiences(updatedexperiences);
      setCursor(data.getExperiences.cursor);
    }
  }, [data]);

  // eslint-disable-next-line no-shadow
  const getExperiencesStack = experiences => {
    if (experiences.length > 0) {
      return (
        <Stack spacing={3}>
          {experiences.map(({ title, slug, slugkey, author, publishdate }) => {
            const { displayname } = author;
            const link = `${slug}-${slugkey}`;
            return (
              <Flex
                key={slugkey}
                pointer="cursor"
                borderColor="gray.200"
                borderWidth={1}
                borderRadius="8px"
                width="100%"
                _hover={{ borderColor: 'gray.400', bg: 'gray.50' }}
              >
                <ExperienceTitleInList>
                  <Link to={link} width="100%">
                    {title}
                  </Link>

                  <Flex>
                    <PublishDate>
                      {`${publishdate}`} | {displayname}
                    </PublishDate>
                  </Flex>
                </ExperienceTitleInList>
              </Flex>
            );
          })}
          <Button
            onClick={loadMoreExperiences}
            variantColor="teal"
            variant="outline"
          >
            {fetchMoreLoading ? (
              <CircularProgress isIndeterminate size="24px" color="teal" />
            ) : (
              'Load more'
            )}
          </Button>
        </Stack>
      );
    }

    return [];
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <Flex px="5">
      <Box
        display={{ base: 'none', sm: 'none', md: 'block' }}
        w="50%"
        textAlign="center"
      >
        <Inspire />
      </Box>

      <Box w={{ base: '100%', sm: '100%', md: '60%' }}>
        {!loading && experiences.length === 0 && (
          <h4>Get Started, share your experiences.</h4>
        )}
        {getExperiencesStack(experiences)}
      </Box>
    </Flex>
  );
}
