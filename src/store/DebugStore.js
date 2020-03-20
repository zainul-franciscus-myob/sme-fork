import Store from './Store';

export default class DebugStore extends Store {
  // arrow class methods cannot be overriden with `super`
  superDispatch = this.dispatch;

  dispatch = (action) => {
    this.superDispatch(action);
    // eslint-disable-next-line no-console
    console.log('Action:', action, '\n', 'State:', this.getState());
  }
}
