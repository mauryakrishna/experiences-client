import React, { useState } from 'react';
import loadable from '@loadable/component'
import { useQuery } from 'react-apollo-hooks';
import gql from 'graphql-tag';
import { Box, Flex, Button, Stack, CircularProgress, PseudoBox } from '@chakra-ui/core';
import { DetectMobileBrowser } from '../../detectmobilebrowser';

const Link = loadable(()=> import('../../components/Link'));
const Inspire = loadable(()=> import('../../components/Inspire'));
import SEOElements from "../../seo";

import {
  ExperienceTitleInList,
  PublishDate,
  Loading,
  ExperienceIntroText,
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
          experienceintrotext
          slug
          slugkey
          publishdate
          author {
            displayname
            uid
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
        <Stack spacing={3} pr="5px">
          {experiences.map(({ title, slug, slugkey, author, publishdate, experienceintrotext }) => {
            const { displayname, uid } = author;
            const link = `/${uid}/${slug}-${slugkey}`;
            return (
              <Flex key={slugkey}>
                <PseudoBox 
                  pointer="cursor"
                  borderColor="gray.200"
                  borderWidth={1}
                  borderRadius="8px"
                  width="100%"
                  _hover={{ borderColor: 'teal.400', bg: 'green.50' }} 
                >
                  <Link to={link} width="100%">
                    <ExperienceTitleInList>
                        {title}
                      <ExperienceIntroText>
                        {experienceintrotext}
                      </ExperienceIntroText>
                      <Flex>
                        <PublishDate>
                          {`${publishdate}`} | {displayname}
                        </PublishDate>
                      </Flex>
                    </ExperienceTitleInList>
                  </Link>
                </PseudoBox>
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

  const expCountZero = experiences.length === 0;
  const inspireBoxWidth = expCountZero ? '100%' : '50%';

  const metaDescription = "Write your life's experiences, help others by sharing it with world, learn from the experiences of others, lessons of day to day life, build collection of learnings";
  return (
    <>
      <SEOElements 
        title="World of Experiences" 
        description={metaDescription} 
        canonical={`https://experiences.guru`}
        type="website"
      />
      <Flex px="5">
        { !DetectMobileBrowser() && 
        <Box
          display={{
            base: expCountZero ? 'block' : 'none',
            sm: expCountZero ? 'block' : 'none',
            md: 'block',
          }}
          w={inspireBoxWidth}
          textAlign="center"
        >
          <Inspire />
        </Box>
        }
        {!loading && !expCountZero && (
          <Box
            w={{ base: '100%', sm: '100%', md: '60%' }}
            maxHeight="calc(87vh)"
            overflowY="scroll"
          >
            {getExperiencesStack(experiences)}
          </Box>
        )}
      </Flex>
    </>
  );
}
