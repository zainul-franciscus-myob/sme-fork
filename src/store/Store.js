class Store {
  constructor(reducer) {
    this.reducer = reducer;
    this.subscribers = [];
    this.state = this.reducer(undefined, {});
  }

  unsubscribeAll = () => {
    this.subscribers = [];
  }

  subscribe = (subscriber) => {
    const length = this.subscribers.push(subscriber);
    const subscriptionIndex = length - 1;

    const unsubscribe = () => {
      this.subscribers = this.subscribers.filter((item, i) => i !== subscriptionIndex);
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
