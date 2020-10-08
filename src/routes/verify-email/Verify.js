import React from 'react';
import PropTypes from 'prop-types';
import { Box, Heading } from '@chakra-ui/core';

import history from '../../history';
import VerifyAPI from './VerifyAPI';
import Loading from '../../components/UIElements/Loading';

const Text = props => {
  return <Heading as="h3">{props.children}</Heading>;
};

class Verify extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showLoader: true,
      showInvalidRequest: false,
      showEmailAlreadyVerified: false,
      showVerifySuccess: false,
    };
  }

  componentDidMount() {
    VerifyAPI({
      verifykey: this.props.verifykey,
    }).then(data => {
      if (data) {
        const { verifysuccess, requestvalid, isemailverified } = data;
        if (verifysuccess) {
          this.setState({ showVerifySuccess: true });

          history.push('/');
        } else if (isemailverified) {
          this.setState({ showEmailAlreadyVerified: true });
        } else if (!requestvalid) {
          this.setState({ showInvalidRequest: true });
        }
      }
      this.setState({ showLoader: false });
    });
  }

  render() {
    return (
      <Box>
        {this.state.showLoader && <Loading />}{' '}
        {this.state.showInvalidRequest && <Text>Invalid request.</Text>}
        {this.state.showEmailAlreadyVerified && (
          <Text>Email address is already verified.</Text>
        )}
        {this.state.showVerifySuccess && (
          <Text>
            Email verification successful. Kindly use your credential to login
            and start sharing your life&apos;s experiences.
          </Text>
        )}
      </Box>
    );
  }
}

Verify.propTypes = {
  verifykey: PropTypes.string.isRequired,
};

export default Verify;
