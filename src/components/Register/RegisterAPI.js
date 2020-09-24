export default async function(email, password, displayname, timezone) {
  const QUERY = `
  mutation signupAuthor($input: SignupAuthorInput) {
    signupAuthor(input: $input) {
      exist
      author {
        authoruid
        displayname
        region
        languages
      }
      token
      message
    }
  }
  `;

  const VARIABLES = {
    input: {
      email,
      password,
      displayname,
      region: timezone,
      languages: 'en-GB',
    },
  };

  const { data } = await fetch(`${window.location.origin}/gql`, {
    method: 'POST',
    Accept: 'application/json',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      query: QUERY,
      variables: VARIABLES,
    }),
  }).then(res => res.json());

  return data.signupAuthor;
}
