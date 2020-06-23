import React, { useState, useMemo } from 'react';
import PropTypes from 'prop-types';
import { createEditor } from 'slate';
import { Slate } from 'slate-react';
import { EditablePlugins, pipe } from 'slate-plugins-next';
import { useQuery } from 'react-apollo-hooks';
import gql from 'graphql-tag';

import AuthorDisplay from './AuthorDisplay';

const ReadExperience = ({ slug }) => {
  const [value, setValue] = useState([{ children: [{ text: '' }] }]);
  const [author, setAuthor] = useState(null);
  const editor = useMemo(() => pipe(createEditor()), []);

  const slugWords = slug.split('-');
  const slugkey = slugWords[slugWords.length - 1];

  const GET_AN_EXPERIENCE_QUERY = gql`
    query getAnExperience($slugkey: String!) {
      getAnExperience(slugkey: $slugkey) {
        title
        experience
        author {
          id
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
    if (data && data.getAnExperience) {
      const exp = data.getAnExperience;
      setValue(JSON.parse(exp.experience));
      setAuthor(exp.author);
    }
  }, [data]);

  return (
    <>
      {author && <AuthorDisplay {...author} />}
      <Slate
        editor={editor}
        value={value}
        onChange={newValue => {
          setValue(newValue);
        }}
      >
        <EditablePlugins readOnly autoFocus placeholder="Read here." />
      </Slate>
    </>
  );
};

ReadExperience.propTypes = {
  slug: PropTypes.string.isRequired,
};
export default ReadExperience;
