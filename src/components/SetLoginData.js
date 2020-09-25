import localStorage from 'local-storage';

const SetLoginData = (params, token) => {
  // set it into localstorage
  const { authoruid, displayname, region, languages } = params;
  localStorage.set('username', authoruid);
  localStorage.set('displayname', displayname);
  localStorage.set('region', region);
  localStorage.set('languages', languages);
  localStorage.set('token', token);
  localStorage.set('loggedin', true);
};

const ClearLoginData = () => {
  localStorage.clear();
};

export { SetLoginData, ClearLoginData };
