import localStorage from 'local-storage';
import history from './history';
import gqloverhttp from './gqloverhttp';

const refreshUserToken = async () => {
  
  const REFRESH_USER_TOKEN_MUTATION = `
    mutation refreshUserToken($uid: String!) {
      refreshUserToken(uid: $uid) {
        token
      }
    }
  `;

  const data = await gqloverhttp({variables: { uid: localStorage.get('username') }, query: REFRESH_USER_TOKEN_MUTATION});
  // data will be {} (empty object) if refresh token has expired/invalid
  const {refreshUserToken} = data;

  if(refreshUserToken && refreshUserToken.token) {
    localStorage.set('token', refreshUserToken.token);
    return refreshUserToken.token;
  }
  else {
    // even the refresh token has expired, redirect to login
    // this should never happen as the expiry is very long
    localStorage.clear();
    history.push('/');
  }
}

export default refreshUserToken;