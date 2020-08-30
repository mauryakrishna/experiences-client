import React, { useState, useMemo } from 'react';
import PropTypes from 'prop-types';
import { createEditor } from 'slate';
import { Slate } from 'slate-react';
import { EditablePlugins, pipe } from '@udecode/slate-plugins';
import { useQuery } from 'react-apollo-hooks';
import gql from 'graphql-tag';

import { Flex, Text, PseudoBox } from '@chakra-ui/core';

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
  const [author, setAuthor] = useState(null);
  const editor = useMemo(() => pipe(createEditor()), []);

  const slugWords = slug.split('-');
  const slugkey = slugWords[slugWords.length - 1];

  const GET_AN_EXPERIENCE_QUERY = gql`
    query getAnExperienceForRead($slugkey: String!) {
      getAnExperienceForRead(slugkey: $slugkey) {
        title
        experience
        author {
          uid
          displayname
          shortintro
        }
      }
    }
  `;

  const { data, error } = useQuery(GET_AN_EXPERIENCE_QUERY, {
    variables: {
      slugkey,
    },
  });

  if (error) {
    console.log('error', error);
  }

  React.useEffect(() => {
    if (data && data.getAnExperienceForRead) {
      // eslint-disable-next-line no-shadow
      const { title, experience, author } = data.getAnExperienceForRead;
      if (title && experience && author) {
        setTitle(title);
        setValue(experience);
        setAuthor(author);
      } else {
        console.log('Could not get data for experience.');
      }
    }
  }, [data]);

  return (
    <PseudoBox px={24} py={2}>
      <Flex align="left" py={5}>
        <Text fontWeight="bold" fontSize="18px">
          {title}
        </Text>
      </Flex>

      <Flex>
        <AuthorDisplay {...author} />
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
