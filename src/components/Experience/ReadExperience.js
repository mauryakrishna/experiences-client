/* eslint-disable no-shadow */
import React, { useState, useMemo } from 'react';
import PropTypes from 'prop-types';
import { createEditor } from 'slate';
import { Slate } from 'slate-react';
import { EditablePlugins, pipe } from '@udecode/slate-plugins';
import { useQuery } from 'react-apollo-hooks';
import gql from 'graphql-tag';

import { Flex, Text, PseudoBox } from '@chakra-ui/core';
import { Loading } from '../UIElements';

import { plugins as pluginsHeadingToolbar } from '../SlatePluginsNext/HeadingToolbarPlugins';
import { plugins as pluginsToolbarList } from '../SlatePluginsNext/ToolbarListPlugins';
import { plugins as pluginsToolbarMarks } from '../SlatePluginsNext/ToolbarMarksPlugins';
import { plugins as pluginsToolbarAlignment } from '../SlatePluginsNext/ToolbarAlignmentPlugins';
import { renderLeafBold } from '../SlatePluginsNext/Custom/renderLeafBold';
import AuthorDisplay from './AuthorDisplay';

const ReadExperience = ({ slug }) => {
  const plugins = [
    ...pluginsToolbarAlignment,
    ...pluginsHeadingToolbar,
    ...pluginsToolbarList,
    ...pluginsToolbarMarks,
  ];

  const [value, setValue] = useState([{ children: [{ text: '' }] }]);
  const [title, setTitle] = useState('');
  const [publishdate, setPublishDate] = useState('');
  const [uid, setUid] = useState('');
  const [displayname, setDisplayname] = useState('');
  const editor = useMemo(() => pipe(createEditor()), []);

  const slugWords = slug.split('-');
  const slugkey = slugWords[slugWords.length - 1];

  const GET_AN_EXPERIENCE_QUERY = gql`
    query getAnExperienceForRead($slugkey: String!) {
      getAnExperienceForRead(slugkey: $slugkey) {
        title
        experience
        publishdate
        author {
          uid
          displayname
          shortintro
        }
      }
    }
  `;

  const { data, error, loading } = useQuery(GET_AN_EXPERIENCE_QUERY, {
    variables: {
      slugkey,
    },
  });

  if (error) {
    console.log('error', error);
  }

  React.useEffect(() => {
    if (data && data.getAnExperienceForRead) {
      const {
        title,
        experience,
        author,
        publishdate,
      } = data.getAnExperienceForRead;
      if (title && experience && author) {
        setTitle(title);
        setValue(experience);
        setPublishDate(publishdate);
        const { uid, displayname } = author;
        setUid(uid);
        setDisplayname(displayname);
      } else {
        console.log('Could not get data for experience.');
      }
    }
  }, [data]);

  if (loading) {
    return <Loading />;
  }

  return (
    <PseudoBox px={{ base: '1.5rem', sm: '2rem', md: '8rem' }} py={2}>
      <Flex align="left" pb={5}>
        <Text fontWeight="400" fontSize={{ sm: '1.5rem', md: '2.2rem' }}>
          {title}
        </Text>
      </Flex>

      <Flex>
        <AuthorDisplay
          uid={uid}
          displayname={displayname}
          publishdate={publishdate}
        />
      </Flex>
      <Flex justify="left" py={5}>
        <Slate editor={editor} value={value}>
          <EditablePlugins
            plugins={plugins}
            readOnly
            autoFocus
            placeholder="Read here."
            renderLeaf={[renderLeafBold]}
          />
        </Slate>
      </Flex>
    </PseudoBox>
  );
};

ReadExperience.propTypes = {
  slug: PropTypes.string.isRequired,
};
export default ReadExperience;
