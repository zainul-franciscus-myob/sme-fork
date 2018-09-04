import { inject } from '@myob/ldal';

const clientId = 'sme-web';
const resourceId = 'sme-web-bff';

const authenticationContext = inject({
  authority: 'https://sit.login.myob.com',
  clientId,
  loginResource: resourceId,
  storageLocation: 'localStorage',
  redirectUri: 'https://localhost:3000',
  postLogoutRedirectUri: 'https://localhost:3000',
});

export const bindOAuth2Callback = () => {
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

export const getToken = () => authenticationContext.getToken(resourceId);
