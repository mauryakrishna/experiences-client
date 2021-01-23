import React, { useState, useMemo, useEffect } from 'react';
import PropTypes from 'prop-types';
import { createEditor } from 'slate';
import { Slate } from 'slate-react';
import { EditablePlugins, pipe } from '@udecode/slate-plugins';
import { useQuery } from 'react-apollo-hooks';
import gql from 'graphql-tag';
import { plugins, renderLeafBold } from '../Experience/SlatePlugins';

import { Box, Flex, Stack, CircularProgress } from '@chakra-ui/core';
import DeleteAThought from "./DeleteAThought";
import { Button, Loading, TextLikeLink } from '../UIElements';
import history from "../../history";

const Thoughts = ({ slugkey }) => {
  const [thoughtsdata, setThoughtsData] = useState([]);
  const [cursor, setCursor] = useState(null);
  const [fetchMoreLoading, setFetchMoreLoading] = useState(false);

  const editor = useMemo(() => pipe(createEditor()), []);
  const GET_THOUGHTS_FOR_EXPERIENCE = gql`
    query getThoughtsOfExperience($cursor: String, $experienceslugkey: String!) {
      getThoughtsOfExperience(cursor: $cursor, experienceslugkey: $experienceslugkey) {
        cursor
        thoughts {
          thought
          isauthor
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

  /**
   * delete thoughts from the server and remove that particular entry from
   * client side thoughts list and update the UI
   * downside: we do not make a call to get the latest 10 record to display
   * upside: did not affect much, will give good experience
   */
  const deletedCb = (thoughtid) => { 
    for (var i = thoughtsdata.length; i--;) {
      if (thoughtsdata[i].thoughtid === thoughtid) {
        thoughtsdata.splice(i, 1);
        break;
      }
    }
    setThoughtsData(thoughtsdata);
  }


  const goToThoughtAuthor = (uid) => {
    history.push(`/author/${uid}`)
  }

  const displayThoughts = () => {
    return thoughtsdata.map((item)=> {
      const { thought, thoughtid, isauthor } = item;
      const { displayname, uid } = item.thoughtauthor;
      return (
        <Box key={thoughtid} py={'8px'} px={'16px'} pt="5px" borderRadius='5px' border="1px" borderColor="teal.100">
          <Box pb="10px">
            <TextLikeLink 
              fontSize={{ base: '0.7rem', sm: '0.7rem', md: '0.7rem' }} 
              onClick={()=> {goToThoughtAuthor(uid)}}
            >
              {displayname}
            </TextLikeLink>
            {
              isauthor && <DeleteAThought {...{ slugkey, thoughtid, isauthor, deletedCb }} />
            }
            
          </Box>
          <Slate editor={editor} value={JSON.parse(thought)}>
            <EditablePlugins
              plugins={plugins}
              readOnly
              style={{ fontSize: '0.9rem', fontWeight: '400' }}
              renderLeaf={[renderLeafBold]}
            />
          </Slate>
        </Box>
      );
    });
  }

  return (
    <Box justify="left" py={5}>
      <Stack spacing={3} pr="5px" width="100%">
        {displayThoughts()}
      </Stack>
      <Button onClick={loadMoreThoughts}>
        {fetchMoreLoading ? (
          <CircularProgress isIndeterminate size="24px" color="teal" />
        ) : (
            'Load more'
          )}
      </Button>
    </Box>
  );
}

Thoughts.propTypes = {
  slugkey: PropTypes.string.isRequired
};

export default Thoughts