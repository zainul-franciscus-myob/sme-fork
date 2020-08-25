import React from 'react';

import ErrorView from './components/ErrorView';

class ErrorModule {
  constructor({ setRootView }) {
    this.setRootView = setRootView;
  }

  render = () => {
    const view = <ErrorView />;

    this.setRootView(view);
  };

  run = () => this.render();

  unsubscribeFromStore = () => {};

  resetState = () => {};
}

export default ErrorModule;
