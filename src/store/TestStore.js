import Store from './Store';

export default class TestStore extends Store {
  constructor(reducer) {
    super(reducer);
    this.actions = [];
  }

  // arrow class methods cannot be overriden with `super`
  superDispatch = this.dispatch;

  dispatch = (action) => {
    this.superDispatch(action);
    this.actions.push(action);
  }

  getActions = () => this.actions

  resetActions = () => { this.actions = []; }
}
