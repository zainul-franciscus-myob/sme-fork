import { inject } from "@myob/ldal";

const authenticationContext = inject({
  authority: 'https://sit.login.myob.com',
  clientId: 'sme-web',
  loginResource: 'sme-web-bff',
  storageLocation: 'localStorage',
  redirectUri: 'https://localhost:3000',
});

authenticationContext.handleOAuth2Callback();

export const getToken = () => authenticationContext.getToken('sme-web-bff');

const login = () => {
  const isLoggedIn = authenticationContext.getUser();
  if (!isLoggedIn) {
    authenticationContext.logIn();
  }
};

export default login;
