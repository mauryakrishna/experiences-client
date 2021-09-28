/* eslint-disable react/prop-types */
import React, { useState, useContext } from 'react';
import PropTypes from 'prop-types';
import isDifferent from '../../utils/IsDifferent';
import WriteEditor from '../PureEditors/WriteEditor';
import UserContext from "../UserContext"
import { useApolloClient } from 'react-apollo-hooks';

import SEOElements from "../../seo"

import {
  GET_EXPERIENCE_EXPERIENCE,
  GET_EXPERIENCE_ISPUBLISHED,
} from '../../queries/experience';

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
        children:[{
          text: ""
        }]
      },
    ],
  );

  return (
    <>
      <SEOElements 
        title={`Pen your experience`}
        description={"Editor to write your experience. It saves the title and experience as you go on writing. Built using slatejs plugins which usage slatjs library inside."}
        canonical={`https://experiences.guru/editor/`}
      />
      <WriteEditor
        id={`experience-editor`}
        initialValue={value}
        onChangeCb={newValue => {
          
          client.writeData({ data: { experience: JSON.stringify(newValue) } });
          // this condition added to avoid unneccessary trigger at onFocus, onBlur
          // https://github.com/ianstormtaylor/slate/issues/2055
          // so now if there is really change in editor content as compared to just previous then only go for saving
          if (userLoggedinContext.loggedin && isDifferent(newValue, value) && !ispublished) {
            saveDebounce();
          }
          setValue(newValue);
        }}
        placeholder="that moment.."
        style={{ fontSize: '1.1rem', fontWeight: '400', lineHeight: "1.5" }}
      />
    </>
  );
};

Editor.propTypes = {
  saveDebounce: PropTypes.func.isRequired,
};
export default React.memo(Editor);
