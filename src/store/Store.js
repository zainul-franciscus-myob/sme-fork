class Store {
  constructor(reducer) {
    this.reducer = reducer;
    this.subscribers = [];
    this.state = this.reducer(undefined, {});
  }

  unsubscribeAll = () => {
    this.subscribers = [];
  };

  subscribe = (subscriber) => {
    this.subscribers.push(subscriber);
    subscriber(this.state);

    const unsubscribe = () => {
      this.subscribers = this.subscribers.filter((item) => item !== subscriber);
    };

    return unsubscribe;
  };

  dispatch = (action) => {
    this.state = this.reducer(this.state, action);
    this.subscribers.forEach((subscriber) => {
      subscriber(this.state);
    });
  };

  getState = () => this.state;
}

export default Store;
