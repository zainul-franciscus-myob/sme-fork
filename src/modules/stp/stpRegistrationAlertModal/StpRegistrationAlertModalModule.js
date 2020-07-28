import { Provider } from 'react-redux';
import React from 'react';

import Store from '../../../store/Store';
import StpRegistrationAlertModal from './components/StpRegistrationAlertModal';
import StpRegistrationAlertModalReducer from './StpRegistrationAlertModalReducer';
import createStpRegistrationAlertModalDispatcher from './createStpRegistrationAlertDispatcher';

export default class StpRegistrationAlertModalModule {
  constructor({ onContinue }) {
    this.store = new Store(StpRegistrationAlertModalReducer);
    this.onContinue = onContinue || (() => {});
    this.dispatcher = createStpRegistrationAlertModalDispatcher(this.store);
  }

  resetState = () => {
    this.dispatcher.resetState();
  };

  continueAction = () => {
    this.onContinue();
    this.dispatcher.closeModal();
  };

  run = (context, onContinue) => {
    this.dispatcher.setInitialState(context);
    this.dispatcher.openModal();
    this.onContinue = onContinue || this.onContinue;
  };

  getView() {
    return (
      <Provider store={this.store}>
        <StpRegistrationAlertModal
          onCancel={this.dispatcher.closeModal}
          onContinue={this.continueAction}
        />
      </Provider>
    );
  }
}
