import gqloverhttp from '../../gqloverhttp';

export default async function(email) {
  const query = `
    mutation forgotPassword($input: ForgotPasswordInput) {
      forgotPassword(input: $input) {
        emailsent
        userexist
      }
    }
  `;

  const variables = { input: { email } };

  const data = await gqloverhttp({ variables, query });

  return data.forgotPassword;
}
