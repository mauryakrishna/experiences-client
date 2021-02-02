/**
 * token is optional
 * variables required
 * query required
 *  
 * */ 
export default async ({ variables, query, token }) => {
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
