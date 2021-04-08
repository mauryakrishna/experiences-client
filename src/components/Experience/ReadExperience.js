/* eslint-disable no-shadow */
import React, { useState, useMemo } from 'react';
import loadable from "@loadable/component";
import PropTypes from 'prop-types';
import { createEditor } from 'slate';
import { Slate } from 'slate-react';
import { EditablePlugins, pipe } from '@udecode/slate-plugins';
import { useQuery } from 'react-apollo-hooks';
import gql from 'graphql-tag';
import { Flex, Text, PseudoBox, Divider } from '@chakra-ui/core';
import { Loading } from '../UIElements';
import { plugins, renderLeafBold } from './SlatePlugins';
import AuthorDisplay from './AuthorDisplay';
import SEOElements from "../../seo";
import GetExperienceIntroText from "../../utils/getexperienceintrotext";
const Thoughts =  loadable(()=> import("../Thoughts"));

const ReadExperience = ({ slug }) => {
  const [value, setValue] = useState([{ children: [{ text: '' }] }]);
  const [title, setTitle] = useState('');
  const [publishdate, setPublishDate] = useState('');
  const [uid, setUid] = useState('');
  const [displayname, setDisplayname] = useState('');
  const [experienceintrotext, setExperienceIntroText] = useState("");
  const [thoughtsenabled, setThoughtsenabled] = useState(false);

  const [experienceNotFound, setExperienceNotFound] = useState(false);
  const editor = useMemo(() => pipe(createEditor()), []);

  const slugWords = slug.split('-');
  const slugkey = slugWords[slugWords.length - 1];

  const GET_AN_EXPERIENCE_QUERY = gql`
    query getAnExperienceForRead($slugkey: String!) {
      getAnExperienceForRead(slugkey: $slugkey) {
        __typename
        ... on Experience {
          title
          experience
          publishdate
          thoughtsenabled
          author {
            uid
            displayname
            shortintro
          }
        }
        ... on ExperienceNotFound {
          experiencefound
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
        thoughtsenabled,
        author,
        publishdate,
        experiencefound,
      } = data.getAnExperienceForRead;
      if (experiencefound === false) {
        setExperienceNotFound(true);
      } else if (title && experience && author) {
        setTitle(title);
        setValue(experience);
        setThoughtsenabled(thoughtsenabled);
        setPublishDate(publishdate);
        setExperienceIntroText(GetExperienceIntroText(experience));
        const { uid, displayname } = author;
        setUid(uid);
        setDisplayname(displayname);
      }
    }
  }, [data]);

  if (loading) {
    return <Loading />;
  }

  return (
    <>
      <SEOElements 
        title={title} 
        description={experienceintrotext}
        canonical={`https://experiences.guru/${uid}/${slug}`}
        type="article"
      />
      {experienceNotFound ? (
        <Text fontSize="1rem" fontWeight="bold">
          {' '}
          Something went wrong.
        </Text>
      ) : (
          <PseudoBox px={{ base: '1.5rem', sm: '2rem', md: '8rem' }} py={2}>
            <Flex align="left" pb={5}>
              <Text
                as="h1"
                fontWeight="400"
                fontSize={{ base: '2rem', sm: '2rem', md: '2.5rem' }}
              >
                {title}
              </Text>
            </Flex>

            <Flex pb="2rem">
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
                  style={{ fontSize: '1.1rem', fontWeight: '400', lineHeight: '1.5' }}
                  renderLeaf={[renderLeafBold]}
                />
              </Slate>
            </Flex>
            <Divider pt={'2rem'} orientation="horizontal"/>
            { thoughtsenabled && <Thoughts slugkey={slugkey} thoughtauthoruid={uid} /> }
            { !thoughtsenabled && <Text textAlign="center"
              m="15px"
              fontWeight="400"
              color="gray.300"
            >
              Author has turned off thoughts for this experience.
            </Text>}
          </PseudoBox>
        )}
    </>
  );
};

ReadExperience.propTypes = {
  slug: PropTypes.string.isRequired,
};
export default ReadExperience;
