import { Provider } from 'react-redux';
import React from 'react';

import { getIsFinished, getSucceeded } from './EmailPaySlipModalSelectors';
import EmailPaySlipModalView from './components/EmailPaySlipModalView';
import Store from '../../../store/Store';
import contactModalReducer from './emailPaySlipModalReducer';
import createEmailPaySlipDispatcher from './createEmailPaySlipDispatcher';
import createEmailPaySlipModalIntegrator from './createEmailPaySlipModalIntegrator';

export default class EmailPaySlipModalModule {
  constructor({ integration }) {
    this.onCloseCallBack = () => {};
    this.integration = integration;

    this.store = new Store(contactModalReducer);
    this.integrator = createEmailPaySlipModalIntegrator(
      this.store,
      this.integration
    );
    this.dispatcher = createEmailPaySlipDispatcher(this.store);
  }

  resetState = () => this.dispatcher.resetState();

  sendEmails = () => {
    const nextEmployee = () => {
      if (!getIsFinished(this.store.getState())) {
        this.dispatcher.setNextEmployee();
        this.sendEmails();
      } else {
        this.dispatcher.setLoadingState(false);
      }
    };

    const onSuccess = () => {
      this.dispatcher.setEmployeeSucceeded();
      nextEmployee();
    };

    const onFailure = () => {
      this.dispatcher.setEmployeeErrored();
      nextEmployee();
    };

    this.integrator.sendPaySlipEmail({ onSuccess, onFailure });
  };

  onClose = () => {
    this.onCloseCallBack(getSucceeded(this.store.getState()));
    this.resetState();
  };

  run = ({ context, onClose = () => {} }) => {
    this.onCloseCallBack = onClose;
    this.dispatcher.setInitialState(context);
    this.sendEmails();
  };

  render() {
    return (
      <Provider store={this.store}>
        <EmailPaySlipModalView onClose={this.onClose} />
      </Provider>
    );
  }
}
