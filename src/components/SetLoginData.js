import localStorage from 'local-storage';

const SetLoginData = params => {
  // set it into localstorage
  const { authoruid, displayname, region, languages } = params;
  localStorage.set('username', authoruid);
  localStorage.set('displayname', displayname);
  localStorage.set('region', region);
  localStorage.set('languages', languages);
  localStorage.set('loggedin', true);
};

const ClearLoginData = () => {
  localStorage.set('username', null);
  localStorage.set('displayname', null);
  localStorage.set('region', null);
  localStorage.set('languages', null);
  localStorage.set('loggedin', null);
};

export { SetLoginData, ClearLoginData };
