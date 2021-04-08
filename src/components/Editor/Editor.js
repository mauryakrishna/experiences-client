/* eslint-disable react/prop-types */
import React, { useState, useMemo, useContext } from 'react';
import PropTypes from 'prop-types';
import isDifferent from '../../utils/IsDifferent';
import { Slate, withReact } from 'slate-react';
import { createEditor } from 'slate';
import { withHistory } from 'slate-history';
import UserContext from "../UserContext"
import { EditablePlugins, pipe } from '@udecode/slate-plugins';
import { useApolloClient } from 'react-apollo-hooks';
import { Box } from '@chakra-ui/core';

import SEOElements from "../../seo"
import { renderLeafBold } from '../SlatePluginsNext/Custom/renderLeafBold';

import HeadingToolbar, {
  plugins as pluginsHeading,
  withPlugins as withPluginsHeading,
} from '../PureEditors/HeadingToolbar';

import {
  GET_EXPERIENCE_EXPERIENCE,
  GET_EXPERIENCE_ISPUBLISHED,
} from '../../queries/experience';

const plugins = [...pluginsHeading];

const withPlugins = [withReact, withHistory, ...withPluginsHeading];

const Editor = ({ saveDebounce }) => {
  const client = useApolloClient();
  const { experience } = client.readQuery({ query: GET_EXPERIENCE_EXPERIENCE });
  const { ispublished } = client.readQuery({
    query: GET_EXPERIENCE_ISPUBLISHED,
  });

  const userLoggedinContext = useContext(UserContext);

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

  return (
    <>
      <SEOElements 
        title={`Pen your experience`}
        description={"Editor to write your experience. It saves the title and experience as you go on writing. Built using slatejs plugins which usage slatjs library inside."}
        canonical={`https://experiences.guru/editor/`}
      />
      <Slate
        editor={editor}
        value={value}
        onChange={newValue => {
          
          client.writeData({ data: { experience: JSON.stringify(newValue) } });
          // this condition added to avoid unneccessary trigger at onFocus, onBlur
          // https://github.com/ianstormtaylor/slate/issues/2055
          // so now if there is really change in editor content as compared to just previous then only go for saving
          if (userLoggedinContext.loggedin && isDifferent(newValue, value) && !ispublished) {
            saveDebounce();
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
            style={{ fontSize: '1.1rem', fontWeight: '400', lineHeight: "1.5" }}
            renderLeaf={[renderLeafBold]}
          />
        </Box>
      </Slate>
    </>
  );
};

Editor.propTypes = {
  saveDebounce: PropTypes.func.isRequired,
};
export default React.memo(Editor);
