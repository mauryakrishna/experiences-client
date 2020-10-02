import gqloverhttp from '../../gqloverhttp';

export default async function(email) {
  const query = `
    mutation resendVerificationLink($email: String!) {
      resendVerificationLink(email: $email) {
        resendsuccess
      }
    }
  `;

  const variables = { email };

  const data = await gqloverhttp({ variables, query });

  return data.resendVerificationLink;
}
