import gqloverhttp from '../../gqloverhttp';

export default async function(newpassword, requestkey) {
  const query = `
    mutation resetPassword($input: ResetPasswordInput) {
      resetPassword(input: $input) {
        passwordupdated
        validrequest
      }
    }
  `;

  const variables = { newpassword, resetrequestkey: requestkey };

  const data = await gqloverhttp({ variables, query });

  return data.resetPassword;
}
