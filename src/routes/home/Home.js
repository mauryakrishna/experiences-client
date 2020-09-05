import React, { useState } from 'react';
import { useQuery } from 'react-apollo-hooks';
import gql from 'graphql-tag';
import {
  Skeleton,
  Grid,
  Box,
  PseudoBox,
  Button,
  Stack,
  Text,
} from '@chakra-ui/core';

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
              <PseudoBox
                key={slugkey}
                borderColor="gray.50"
                borderWidth={1}
                _hover={{ borderColor: 'gray.200', bg: 'gray.50' }}
              >
                <Link to={link}>
                  <Text
                    fontWeight="800"
                    height="18px"
                    margin={3}
                    color="gray.600"
                  >
                    {title}
                  </Text>
                </Link>
              </PseudoBox>
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
    <Grid templateColumns="repeat(2, 1fr)">
      <Box>
        <Text fontWeight="400" fontSize="24px" verticalAlign="center">
          Experiences makes life. Share it so others can make theirs.
        </Text>
      </Box>

      <Box>
        {!loading && experiences.length === 0 && (
          <h4>Get Started, share your experiences.</h4>
        )}
        {getExperiencesStack(experiences)}
      </Box>
    </Grid>
  );
}
