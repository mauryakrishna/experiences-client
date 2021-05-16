import React from "react";
import Button from "./Button";

const BackButton = () => {
  const onBackClick = ()=> {
    console.log("Back cliked");
  }

  return (
    <Button 
      size="xs"
      leftIcon="arrow-back" 
      variantColor="teal" 
      variant="outline"
      onClick={onBackClick}
    >
      Back
    </Button>
  )
};

export default BackButton;