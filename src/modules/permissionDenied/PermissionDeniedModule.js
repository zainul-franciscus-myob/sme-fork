import React from 'react';

import PermissionDeniedView from './components/PermissionDeniedView';

class PermissionDeniedModule {
  constructor({
    setRootView,
  }) {
    this.setRootView = setRootView;
  }

  render = () => {
    const view = (
      <PermissionDeniedView />
    );

    this.setRootView(view);
  };

  run = () => this.render();

  unsubscribeFromStore = () => {}

  resetState = () => {}
}

export default PermissionDeniedModule;
