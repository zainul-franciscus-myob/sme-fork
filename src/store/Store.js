class Store {
  constructor(reducer) {
    this._reducer = reducer;
    this._subscribers = [];
  }

  subscribe = (subscriber) => {
    this._subscribers.push(subscriber);
  };

  publish = (action) => {
    this._state = this._reducer(this._state, action);
    this._subscribers.forEach((subscriber) => {
      subscriber(this._state);
    });
  };
}

export default Store;