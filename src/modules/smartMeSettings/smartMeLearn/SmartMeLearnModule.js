import { Provider } from 'react-redux';
import React from 'react';

import SmartMeLearnView from './components/SmartMeLearnView';
import Store from '../../../store/Store';
import createSmartMeDispatcher from './createSmartMeDispatcher';
import smartMeReducer from './smartMeReducer';

export default class SmartMeLearnModule {
  constructor({ setRootView, globalCallbacks }) {
    this.setRootView = setRootView;
    this.store = new Store(smartMeReducer);
    this.dispatcher = createSmartMeDispatcher(this.store);
    this.globalCallbacks = globalCallbacks;
  }

  onClick = () => {
    this.globalCallbacks.smartMEUpdated();
    this.dispatcher.openSmartMeRedirectModal();
  };

  onCloseModal = () => {
    this.dispatcher.closeSmartMeRedirectModal();
  };

  onOpenRedirectToSmartMe = () => {
    // todo implement in PBM-842
  };

  render = () => {
    const view = (
      <Provider store={this.store}>
        <SmartMeLearnView
          onClick={this.onClick}
          onCancel={this.onCloseModal}
          onContinue={this.onOpenRedirectToSmartMe}
        />
      </Provider>
    );

    this.setRootView(view);
  };

  run = (context) => {
    this.dispatcher.setInitialState(context);
    this.render();
  };

  resetState = () => {
    this.dispatcher.resetState();
  };

  unsubscribeFromStore = () => {
    this.store.unsubscribeAll();
  };
}
