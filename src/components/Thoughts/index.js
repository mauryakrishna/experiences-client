import React, { useState } from "react";
import loadable from "@loadable/component";
import localStorage from "local-storage";
import { Divider, Flex } from "@chakra-ui/core";
import { SectionHeader, TextLikeLink } from "./../UIElements";
import { DetectMobileBrowser } from '../../detectmobilebrowser';
const MobileNotSupported = loadable(()=> import('../UIElements/MobileNotSupported')) ;

const ReadThoughts = loadable(()=> import("./ReadThoughts"));
const ExpressThoughts = loadable(()=> import("./ExpressThoughts"));

const Thoughts = ({slugkey}) => {
  const [expressThoughts, toggleExpressThoughts] = useState(false);
  const handleExpressThoughtClick = () => {
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
          <TextLikeLink onClick={handleExpressThoughtClick}>Express Thoughts</TextLikeLink>
        </Flex>
      </Flex>
      { 
        DetectMobileBrowser() ? <MobileNotSupported /> : 
        expressThoughts && <ExpressThoughts 
        slugkey={slugkey} 
        thoughtauthoruid={localStorage.get("username")} 
        onSaveCb={handleExpressThoughtClick} 
        onCancelCb={handleExpressThoughtClick} /> 
      }
      <ReadThoughts slugkey={slugkey} />
    </>
  )
}

export default Thoughts;