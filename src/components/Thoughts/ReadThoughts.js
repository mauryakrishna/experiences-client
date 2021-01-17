import React, { useState, useMemo, useEffect } from 'react';
import PropTypes from 'prop-types';
import { createEditor } from 'slate';
import { Slate } from 'slate-react';
import { EditablePlugins, pipe } from '@udecode/slate-plugins';
import { useQuery } from 'react-apollo-hooks';
import gql from 'graphql-tag';
import { plugins, renderLeafBold } from '../Experience/SlatePlugins';

import { Box, Flex, Button, Stack, CircularProgress, Tooltip, Icon } from '@chakra-ui/core';
import DeleteAThought from "./DeleteAThought";
import Loading from '../UIElements/Loading';

const Thoughts = ({ slugkey }) => {
  const [thoughtsdata, setThoughtsData] = useState([]);
  const [cursor, setCursor] = useState(null);
  const [fetchMoreLoading, setFetchMoreLoading] = useState(false);

  const deleteThought = DeleteAThought();
  const editor = useMemo(() => pipe(createEditor()), []);
  const GET_THOUGHTS_FOR_EXPERIENCE = gql`
    query getThoughtsOfExperience($cursor: String, $experienceslugkey: String!) {
      getThoughtsOfExperience(cursor: $cursor, experienceslugkey: $experienceslugkey) {
        cursor
        thoughts {
          thought
          thoughtid
          created_at
          thoughtauthor {
            displayname
            uid
          }
        }
      }
    }
  `;

  const { loading, data, fetchMore } = useQuery(GET_THOUGHTS_FOR_EXPERIENCE, {
    variables: { experienceslugkey: slugkey },
  });

  const loadMoreThoughts = () => {
    setFetchMoreLoading(true);
    fetchMore({
      query: GET_THOUGHTS_FOR_EXPERIENCE,
      variables: { cursor, experienceslugkey: slugkey },
      updateQuery: (prev, { fetchMoreResult }) => {
        setFetchMoreLoading(false);
        const prevExp = prev.getThoughtsOfExperience.thoughts;
        const newExp = fetchMoreResult.getThoughtsOfExperience.thoughts;
        const updatedcursor = fetchMoreResult.getThoughtsOfExperience.cursor;
        const combined = [...prevExp, ...newExp];
        return {
          getThoughtsOfExperience: {
            cursor: updatedcursor,
            thoughts: combined,
          },
        };
      },
    });
  };

  useEffect(()=> {
    if(data && data.getThoughtsOfExperience) {
      const { cursor, thoughts } = data.getThoughtsOfExperience;
      setCursor(cursor);
      setThoughtsData(thoughts);
    }
  }, [data])
  
  if (loading) {
    return <Loading />;
  }

  const displayThoughts = () => {
    return thoughtsdata.map((item)=> {
      const { thought, thoughtid } = item;
      const { displayname, uid } = item.thoughtauthor;
      return (
        <Box>
          <Box>
            <Slate editor={editor} value={JSON.parse(thought)}>
              <EditablePlugins
                plugins={plugins}
                readOnly
                style={{ fontSize: '1.1rem', fontWeight: '400' }}
                renderLeaf={[renderLeafBold]}
              />
            </Slate>
          </Box>
          <Box>
            <Tooltip label="Delete">
              <Icon
                name="delete"
                onClick={() => {
                  deleteThought(slugkey, thoughtid)
                }}
              />
            </Tooltip>
          </Box>
        </Box>
      );
    });
  }

  return (
    <Flex justify="left" py={5}>
      <Stack spacing={3} pr="5px">
        {displayThoughts()}
        <Button
            onClick={loadMoreThoughts}
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
    </Flex>
  );
}

Thoughts.propTypes = {
  slugkey: PropTypes.string.isRequired
};

export default Thoughts