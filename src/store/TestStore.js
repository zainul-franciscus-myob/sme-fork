import Store from './Store';
import createReducer from './createReducer';

export default class TestStore extends Store {
  constructor(reducer = undefined, initialState = undefined) {
    const actualReducer = !(typeof reducer === 'function')
      ? createReducer(initialState, {})
      : reducer;
    super(actualReducer);
    this.actions = [];
    this.subscribers = this.subscribers ?? [];
    this.state = initialState ?? this.state;
  }

  // arrow class methods cannot be overriden with `super`
  superDispatch = this.dispatch;

  dispatch = (action) => {
    this.superDispatch(action);
    this.actions.push(action);
  };

  getActions = () => this.actions;

  resetActions = () => {
    this.actions = [];
  };

  setState = (state) => {
    this.state = state;
  };
}
