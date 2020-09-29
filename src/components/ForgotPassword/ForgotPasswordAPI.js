import gqloverhttp from '../../gqloverhttp';

export default async function(email) {
  const query = `
    mutation forgotPassword($input: ForgotPasswordInput) {
      forgotPassword(input: $input) {
        emailsent
      }
    }
  `;

  const variables = { email };

  const data = await gqloverhttp({ variables, query });

  return data.forgotPassword;
}
