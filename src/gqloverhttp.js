import localStorage from "local-storage";

export default async ({ variables, query }) => {
  const token = localStorage.get('token');
  const response = await fetch(`${window.location.origin}/gql`, {
    method: 'POST',
    headers: { 
      'Content-Type': 'application/json',
      'Accept-Encoding': 'gzip,deflate',
      ...(token && { authorization: token }),
     },
    body: JSON.stringify({
      query,
      variables,
    }),
  }).then(res => res.json());

  return response && response.data;
};
