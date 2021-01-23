import React, { useState } from "react";
import loadable from "@loadable/component";
import localStorage from "local-storage";
import { Divider, Flex } from "@chakra-ui/core";
import { SectionHeader, TextLikeLink } from "./../UIElements";
import { DetectMobileBrowser } from '../../detectmobilebrowser';
const MobileNotSupported = loadable(()=> import('../UIElements/MobileNotSupported')) ;
const ErrorMessage = loadable(()=> import('../UIElements/AuthFlow/ErrorMessage'));

const ReadThoughts = loadable(()=> import("./ReadThoughts"));
const ExpressThoughts = loadable(()=> import("./ExpressThoughts"));

const Thoughts = ({slugkey}) => {
  const [thoughtSavedErr, setThoughtSavedErr] = useState(false);
  const [expressThoughts, toggleExpressThoughts] = useState(false);
  const onSaveThought = (saved) => {
    setThoughtSavedErr(!saved);
    toggleExpressThoughts(saved && !expressThoughts);
  }

  const toggleExpressThought = () => {
    toggleExpressThoughts(!expressThoughts);
  }

  return (
    <>
      <Divider pt={'2rem'} orientation="horizontal"/>
      <Flex>
        <Flex>
          <SectionHeader>Thoughts</SectionHeader> 
        </Flex>
        <Flex><Divider orientation="vertical"/></Flex>
        <Flex align="flex-end" align="center">
          <TextLikeLink onClick={toggleExpressThought}>Express Thoughts</TextLikeLink>
        </Flex>
      </Flex>
      { 
        DetectMobileBrowser() ? <MobileNotSupported /> : 
        expressThoughts && <>
          {thoughtSavedErr && <ErrorMessage>{'Could not save thoughts. Keep a backup of your thoughts, refresh and try again.'}</ErrorMessage>}
          <ExpressThoughts 
            slugkey={slugkey} 
            thoughtauthoruid={localStorage.get("username")} 
            onSaveCb={onSaveThought} 
            onCancelCb={toggleExpressThought} 
          />
        </>
      }
      <ReadThoughts slugkey={slugkey} />
    </>
  )
}

export default Thoughts;