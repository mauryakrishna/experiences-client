const afterauth = async profile => {
  const authIntent = localStorage.getItem('authIntent');

  // eslint-disable-next-line no-underscore-dangle
  const { displayname, email } = profile._json;
  let QUERY;
  let VARIABLES;
  if (authIntent === 'login') {
    QUERY = `
      query signinAuthor($email: String!) {
        signinAuthor(email: $email) {
          exist
          author {
            displayname
            authoruid
          }
        }
      }
    `;
    VARIABLES = { email };
  } else if (authIntent === 'register') {
    console.log('register');
    QUERY = `
      mutation signupAuthor($input: SignupAuthorInput) {
        signupAuthor(input: $input) {
          exist
          author {
            displayname
            authoruid
          }
        }
      }
    `;

    VARIABLES = { input: { displayname, email } };
  }

  await fetch('http://localhost:4000/gql', {
    method: 'POST',
    Accept: 'application/json',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      query: QUERY,
      variables: VARIABLES,
    }),
  })
    .then(res => res.json())
    .then(res => console.log(res.data));
};

export default afterauth;
