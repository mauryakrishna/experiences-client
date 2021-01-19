import React, { useState, useMemo, useEffect } from 'react';
import PropTypes from 'prop-types';
import { createEditor } from 'slate';
import { Slate } from 'slate-react';
import { EditablePlugins, pipe } from '@udecode/slate-plugins';
import { useQuery } from 'react-apollo-hooks';
import gql from 'graphql-tag';
import { plugins, renderLeafBold } from '../Experience/SlatePlugins';

import { Flex, Stack, Tooltip, Icon, Divider } from '@chakra-ui/core';
import DeleteAThought from "./DeleteAThought";
import { Loading, TextLikeLink } from '../UIElements';
import history from "../../history";

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

  const goToThoughtAuthor = (uid) => {
    history.push(`/author/${uid}`)
  }

  const displayThoughts = () => {
    return thoughtsdata.map((item)=> {
      const { thought, thoughtid } = item;
      const { displayname, uid } = item.thoughtauthor;
      return (
        <Flex key={thoughtid} p='8px' borderRadius='8px' border="1px" borderColor="teal.100">
          <Flex>
            <Slate editor={editor} value={JSON.parse(thought)}>
              <EditablePlugins
                plugins={plugins}
                readOnly
                style={{ fontSize: '0.9rem', fontWeight: '400' }}
                renderLeaf={[renderLeafBold]}
              />
            </Slate>
          </Flex>
          <Flex>
            <Divider orientation="vertical"/>
          </Flex>
          <Flex px={'5px'} pt="5px">
            <TextLikeLink 
              fontSize={{ base: '0.7rem', sm: '0.7rem', md: '0.7rem' }} 
              onClick={()=> {goToThoughtAuthor(uid)}} to={`/author/${uid}`}
            >
              {displayname}
            </TextLikeLink>
          </Flex>
          <Flex px={'5px'} pt="7px">
            <Tooltip label="Delete this thought">
              <Icon
                size="12px"
                name="delete"
                onClick={() => {
                  deleteThought(slugkey, thoughtid)
                }}
              />
            </Tooltip>
          </Flex>
        </Flex>
      );
    });
  }

  return (
    <Flex justify="left" py={5}>
      <Stack spacing={3} pr="5px">
        {displayThoughts()}
      </Stack>
    </Flex>
  );
}

Thoughts.propTypes = {
  slugkey: PropTypes.string.isRequired
};

export default Thoughts