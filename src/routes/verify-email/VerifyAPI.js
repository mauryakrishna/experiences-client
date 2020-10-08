import gqloverhttp from '../../gqloverhttp';

export default async function({ verifykey }) {
  const query = `
    mutation verifyEmail($input: VerifyEmailInput) {
      verifyEmail(input: $input) {
        verifysuccess
        isemailverified
        requestvalid
      }
    }
  `;

  const variables = { input: { verifykey } };

  const data = await gqloverhttp({ variables, query });

  return data.verifyEmail;
}
