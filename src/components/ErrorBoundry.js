import React from 'react';
import { Flex, Box, Text, List, ListItem } from '@chakra-ui/core';
import Link from "./Link"

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { error: null, errorInfo: null };
  }

  componentDidCatch(error, errorInfo) {
    this.setState({
      error: error,
      errorInfo: errorInfo
    })
  }

  reloadPage() {
    window.location.reload()
  }

  render() {
    if (this.state.errorInfo) {
      return (
        <Box margin="0 auto" width="30rem">
          <Flex
            align="center"
            justify="space-between"
            wrap="wrap"
            px="1rem"
            py="0.3rem"
            bg="teal.500"
            color="white"
            fontWeight="500"
          >
            <Link to="/"><Text fontSize="4xl">Experiences</Text></Link> 
            <Icon name="repeat" size="32px" color="white" onClick={reloadPage}/>
          </Flex>
          <Box bg="green.50" p="2rem">
            <Text fontSize="2xl">Seems something was not right, here...</Text>
            <Text fontSize="xl">Here's what you can do..</Text>
            <List as="ul" ml="1rem" styleType="disc">
              <ListItem>Refresh the page and try again.</ListItem>
              <ListItem>If the issue still persist let us know at team@experiences.guru</ListItem>
            </List>
          </Box>
        </Box>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;