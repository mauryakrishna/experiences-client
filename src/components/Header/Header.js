import React from 'react';
import loadable from "@loadable/component";
import history from "../../history";
import { Box, Flex, Text } from '@chakra-ui/core';

import { WRITE_AN_EXPERIENCE_ROUTE } from "../../ConfigConstants"
import Link from '../Link';
import { DetectMobileBrowser } from '../../detectmobilebrowser';
const Authenticate = loadable(()=> import('./Authenticate'))

export default function Header() {
  const { pathname } = history && history.location;
  const takeToEditor = () => {
    history.push(`${WRITE_AN_EXPERIENCE_ROUTE}`);
  }

  return (
    <Flex
      as="nav"
      align="center"
      justify="space-between"
      wrap="wrap"
      px="1rem"
      py="0.8rem"
      bg="teal.500"
      color="white"
    >
      <Flex align="center" mr={3} fontWeight="500">
        <Link to="/">
          <Text fontSize="1.8rem" color="white">
            Experiences
            </Text>
        </Link>
      </Flex>
      {
        !DetectMobileBrowser() && pathname && (pathname !== `${WRITE_AN_EXPERIENCE_ROUTE}`) &&
        (
          <Flex 
            marginTop="3px" 
            marginRight="auto" 
            onClick={takeToEditor} 
            cursor="pointer"
            border="1px solid white"
            padding="3px"
            borderRadius="4px"
            boxShadow="0px 1px 1px rgb(0 0 0 / 50%), inset 1px 2px 0px rgb(255 255 255 / 40%)"
          >
            <>
              <svg 
                stroke="blanchedalmond"
                fill="white"
                width="24"
                height="24"
                viewBox="0 0 24 24" 
                aria-hidden="true"
              >
                <path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34a.9959.9959 0 00-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"></path>
              </svg>
            </>
          </Flex>
        )
      }
      
      <Box>
        <Authenticate />
      </Box>
    </Flex>
  );
}
