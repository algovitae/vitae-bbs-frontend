/* eslint-disable node/prefer-global/process */

export const apiEndpoint: string = (() => {
  if (process.env.REACT_APP_API) {
    return process.env.REACT_APP_API;
  }

  if (location.host.includes('localhost')) {
    return 'http://localhost:4000';
  }

  return 'https://api.' + location.host;
})();

