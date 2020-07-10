import { logout } from '../../Auth';

export default class LogoutModule {
  unsubscribeFromStore = () => {};

  resetState = () => {};

  run = () => {
    logout(false);
  };
}
