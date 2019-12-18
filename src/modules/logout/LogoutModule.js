import { logout } from '../../Auth';

export default class LogoutModule {
  run = () => {
    logout();
  }

  unsubscribeFromStore = () => {}

  resetState = () => {}
}
