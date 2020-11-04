// for now, will just print the console when in dev
// and nothing will happen on UI
export default error => {
  if (__DEV__) {
    console.log(`GraphQlError: ${error}`);
  }
};

// later -> present a proper page with appropriate message
