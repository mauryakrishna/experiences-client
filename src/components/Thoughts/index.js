import React, { useState } from "react";
import loadable from "@loadable/component";
import localStorage from "local-storage";
import { Divider } from "@chakra-ui/core";
import { SectionHeader, TextLikeLink, Button } from "./../UIElements";
import DeleteAThought from "./DeleteAThought";

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
      <SectionHeader>Thoughts</SectionHeader>
      <TextLikeLink onClick={handleExpressThoughtClick}>Express Thoughts</TextLikeLink>
      { 
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