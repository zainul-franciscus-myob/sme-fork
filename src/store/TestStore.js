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

  resetActions = () => { this.actions = []; }

  hasIntent = intent => Boolean(this.actions.find(action => action.intent === intent))

  getArrayOfIntents = () => this.actions.map(action => action.intent)

  getActionForIntent = intent => this.actions.find(action => action.intent === intent);
}
