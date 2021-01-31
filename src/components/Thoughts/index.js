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

const date = require("date-and-time");

const Thoughts = ({slugkey}) => {
  const [thoughtSavedErr, setThoughtSavedErr] = useState(false);
  const [expressThoughts, toggleExpressThoughts] = useState(false);
  const [refreshCursor, setRefreshCursor] = useState(null); // yyyy-MM-dd HH:mm:ss.SSSSSS

  const getCursor = () => date.format(new Date(), 'YYYY-MM-DD HH:mm:ss');

  const onSaveThought = (saved) => {
    const cursor = getCursor();
    // the .999999 is just the work around to advance 
    // cursor time so as to fetch the just added thought.
    setRefreshCursor(`${cursor}.999999`);
    setThoughtSavedErr(!saved);
    toggleExpressThoughts(!saved);
  }

  const toggleExpressThought = () => {
    setThoughtSavedErr(false);
    toggleExpressThoughts(!expressThoughts);
  }

  return (
    <>
      <Flex>
        <Flex>
          <SectionHeader>Thoughts</SectionHeader> 
        </Flex>
        {
          localStorage.get('loggedin') && 
          <>
            <Flex><Divider orientation="vertical"/></Flex>
            <Flex align="flex-end" align="center">
              <TextLikeLink onClick={toggleExpressThought}>Express Thoughts</TextLikeLink>
            </Flex>
          </>
        }
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
      <ReadThoughts slugkey={slugkey} refreshCursor={refreshCursor} />
    </>
  )
}

export default Thoughts;