/* eslint-disable react/prop-types */
import React, { useState, useMemo, useContext, useEffect } from 'react';
import PropTypes from 'prop-types';
import isDifferent from '../../utils/IsDifferent';
import { Slate, withReact } from 'slate-react';
import { createEditor } from 'slate';
import { withHistory } from 'slate-history';
import { Helmet } from 'react-helmet';
import UserContext from "../UserContext"
import { EditablePlugins, pipe } from '@udecode/slate-plugins';

import { useApolloClient } from 'react-apollo-hooks';
import { Box } from '@chakra-ui/core';

import { renderLeafBold } from '../SlatePluginsNext/Custom/renderLeafBold';

import HeadingToolbar, {
  plugins as pluginsHeading,
  withPlugins as withPluginsHeading,
} from '../PureEditors/HeadingToolbar';

import SaveExperience from './SaveExperiance';
import {
  GET_EXPERIENCE_EXPERIENCE,
  GET_EXPERIENCE_ISPUBLISHED,
} from '../../queries/experience';

const plugins = [...pluginsHeading];

const withPlugins = [withReact, withHistory, ...withPluginsHeading];

const Editor = ({ cb }) => {
  const client = useApolloClient();
  const { experience } = client.readQuery({ query: GET_EXPERIENCE_EXPERIENCE });
  const { ispublished } = client.readQuery({
    query: GET_EXPERIENCE_ISPUBLISHED,
  });

  const userLoggedinContext = useContext(UserContext);
  const saveExperienceDebounceCb = SaveExperience({ cb });

  const [value, setValue] = useState(
    JSON.parse(experience) || [
      {
        children: [
          {
            type: 'paragraph',
            children: [{ text: '' }],
          },
        ],
      },
    ],
  );

  const editor = useMemo(() => pipe(createEditor(), ...withPlugins), []);

  useEffect(()=> {
    // added below save step to save the title just after user logs in after providing title
    // because there will not be any change event happening after login, need to save manually
    // TODO - get the length of string in value, currently its slatejs JSON
    if(userLoggedinContext.loggedin) {
      saveExperienceDebounceCb(value)
    }
  }, [userLoggedinContext.loggedin])

  return (
    <>
      <Helmet>
        <meta name="Description" content={"Editor to write your experience. It saves the title and experience as you go on writing. Built using slatejs plugins which usage slatjs library inside."} />
      </Helmet>
      <Slate
        editor={editor}
        value={value}
        onChange={newValue => {
          // Do not go for auto save if the experience is already published ie ispublished true
          if (ispublished) {
            // update in cache so that while savenpublish can be taken from cache for saving
            client.writeData({ data: { experience: JSON.stringify(newValue) } });
          }
          // this condition added to avoid unneccessary trigger at onFocus, onBlur
          // https://github.com/ianstormtaylor/slate/issues/2055
          // so now if there is really change in editor content as compared to just previous then only go for saving
          else if (userLoggedinContext.loggedin && isDifferent(newValue, value)) {
            saveExperienceDebounceCb(newValue);
          }
          setValue(newValue);
        }}
      >
        <HeadingToolbar />
        <Box w="100%" px={2} mb={8}>
          <EditablePlugins
            plugins={plugins}
            placeholder="that moment.."
            spellCheck
            style={{ fontSize: '1.1rem', fontWeight: '400' }}
            renderLeaf={[renderLeafBold]}
          />
        </Box>
      </Slate>
    </>
  );
};

Editor.propTypes = {
  cb: PropTypes.func.isRequired,
};
export default React.memo(Editor);
