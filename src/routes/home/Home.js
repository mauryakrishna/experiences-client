import React, { useState } from 'react';
import { useQuery } from 'react-apollo-hooks';
import gql from 'graphql-tag';
import { Skeleton, Box, Flex, Button, Stack, Text } from '@chakra-ui/core';

import Link from '../../components/Link';

export default function Home() {
  const [experiences, setExperiences] = useState([]);
  const experiencePerPage = 10;
  const [cursor, setCursor] = useState(null);

  const GET_EXPERIENCES_QUERY = gql`
    query getExperiences($cursor: String, $experienceperpage: Int!) {
      getExperiences(cursor: $cursor, experienceperpage: $experienceperpage) {
        cursor
        experiences {
          title
          slug
          slugkey
          publishdate
        }
      }
    }
  `;

  const { loading, data, fetchMore } = useQuery(GET_EXPERIENCES_QUERY, {
    variables: { experienceperpage: experiencePerPage },
  });

  const loadMoreExperiences = () => {
    fetchMore({
      query: GET_EXPERIENCES_QUERY,
      variables: { cursor, experienceperpage: experiencePerPage },
      updateQuery: (prev, { fetchMoreResult }) => {
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
    if (data) {
      const updatedexperiences = data.getExperiences.experiences;
      setExperiences(updatedexperiences);
      setCursor(data.getExperiences.cursor);
    }
  }, [data]);

  const getSkeleton = count => {
    const allSkeleton = [];
    const numberOfSkeleton = count || experiencePerPage;
    // eslint-disable-next-line no-plusplus
    for (let i = numberOfSkeleton; i >= 0; i--) {
      allSkeleton.push(
        <Skeleton
          isLoaded={!loading}
          color="teal.200"
          height="20px"
          my="5px"
          key={i}
        />,
      );
    }
    return allSkeleton;
  };

  // eslint-disable-next-line no-shadow
  const getExperiencesStack = experiences => {
    if (experiences.length > 0) {
      return (
        <Stack spacing={3}>
          {experiences.map(({ title, slug, slugkey }) => {
            const link = `${slug}-${slugkey}`;
            return (
              <Flex
                key={slugkey}
                pointer="cursor"
                borderColor="gray.200"
                borderWidth={1}
                width="100%"
                _hover={{ borderColor: 'gray.400', bg: 'gray.50' }}
              >
                <Text
                  fontWeight="500"
                  fontSize={{ base: '1rem', md: '1.2rem' }}
                  margin={3}
                  width="100%"
                  color="gray.600"
                >
                  <Link to={link} width="100%">
                    {title}
                  </Link>
                </Text>
              </Flex>
            );
          })}
          <Button
            isLoading={loading}
            onClick={loadMoreExperiences}
            variantColor="teal"
            variant="outline"
          >
            Load more
          </Button>
        </Stack>
      );
    }

    return [];
  };

  if (loading) {
    return getSkeleton();
  }

  return (
    <Flex px="5">
      <Box display={{ base: 'none', sm: 'none', md: 'block' }} w="50%">
        <Text fontWeight="400" fontSize="24px" verticalAlign="center">
          Experiences makes life. Share it so others can make theirs.
        </Text>
      </Box>

      <Box w={{ base: '100%', sm: '100%', md: '50%' }}>
        {!loading && experiences.length === 0 && (
          <h4>Get Started, share your experiences.</h4>
        )}
        {getExperiencesStack(experiences)}
      </Box>
    </Flex>
  );
}
