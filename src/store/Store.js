class Store {
  constructor(reducer) {
    this.reducer = reducer;
    this.subscribers = [];
    this.state = undefined;
  }

  unsubscribeAll = () => {
    this.subscribers = [];
  }

  subscribe = (subscriber) => {
    this.subscribers.push(subscriber);
  };

  publish = (action) => {
    this.state = this.reducer(this.state, action);
    this.subscribers.forEach((subscriber) => {
      subscriber(this.state);
    });
  };
}

export default Store;
