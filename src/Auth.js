import { inject } from '@myob/ldal';

import Config from './Config';

let authenticationContext = null;

export const initializeAuth = () => {
  authenticationContext = inject({
    authority: Config.AUTHENTICATION_AUTHORITY,
    clientId: Config.AUTHENTICATION_WEB_CLIENT_ID,
    loginResource: Config.AUTHENTICATION_BFF_CLIENT_ID,
    storageLocation: 'localStorage',
    redirectUri: Config.BASE_URL,
    postLogoutRedirectUri: Config.BASE_URL,
  });

  authenticationContext.handleOAuth2Callback();
};

export const login = () => {
  const isLoggedIn = authenticationContext.getUser();
  if (!isLoggedIn) {
    authenticationContext.logIn();
  }
};

export const logout = () => {
  authenticationContext.logOut();
};

export const isLoggedIn = () => !!authenticationContext.getUser();

export const acquireToken = () => new Promise((resolve, reject) => {
  authenticationContext.acquireToken(
    Config.AUTHENTICATION_BFF_CLIENT_ID,
    (token, error) => {
      if (error) {
        authenticationContext.logIn();
        reject(Error('login didn\'t work'));
      } else {
        resolve(token);
      }
    },
  );
});
