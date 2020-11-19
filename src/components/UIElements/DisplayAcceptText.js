import React from 'react';
import { Text } from '@chakra-ui/core';

import LegalText from './LegalText';
import Link from './../Link';

export default function DisplayAcceptText() {
  return (
    <LegalText mt={4}>
      By registering you agree to {' '}
      <Text color="teal.500" display="inline"><Link to="/@team/privacy-s66ekejmekn" >Privacy Policy</Link></Text>{' '}
                   and {' '}
      <Text color="teal.500" display="inline"><Link to="/@team/terms-of-use-uoirf3l3b2">Terms Of Use</Link></Text> of Experiences.
    </LegalText>
  );
}