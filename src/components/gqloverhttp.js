export default async ({ variables, query }) => {
  const { data } = await fetch(`${window.location.origin}/gql`, {
    method: 'POST',
    Accept: 'application/json',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      query,
      variables,
    }),
  }).then(res => res.json());

  return data;
};
