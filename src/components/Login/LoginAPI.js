export default async function(email, password) {
  const QUERY = `
    query signinAuthor($email: String!, $password: String!) {
      signinAuthor(email: $email, password: $password) {
        exist
        author {
          authoruid
          displayname
          region
          languages
        }
        token
        isemailverified
      }
    }
  `;

  const VARIABLES = { email, password };

  const { data } = await fetch(`${window.location.origin}/gql`, {
    method: 'POST',
    Accept: 'application/json',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      query: QUERY,
      variables: VARIABLES,
    }),
  }).then(res => res.json());

  return data.signinAuthor;
}
