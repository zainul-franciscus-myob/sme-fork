import { Provider } from 'react-redux';
import React from 'react';

import Store from '../../../store/Store';
import StpDeclarationModal from './components/StpDeclarationModal';
import StpDeclarationModalReducer from './StpDeclarationModalReducer';
import createStpDeclarationModalDispatcher from './createStpDeclarationDispatcher';
import createStpDeclarationModalIntegrator from './createStpDeclarationIntegrator';

export default class StpDeclarationModalModule {
  constructor({ integration, onDeclared }) {
    this.store = new Store(StpDeclarationModalReducer);
    this.onDeclared = onDeclared;
    this.dispatcher = createStpDeclarationModalDispatcher(this.store);
    this.integrator = createStpDeclarationModalIntegrator(this.store, integration);
  }

  resetState = () => {
    this.dispatcher.resetState();
  };

  recordDeclaration = () => {
    this.dispatcher.setLoadingState(true);

    const onSuccess = () => {
      this.dispatcher.setLoadingState(false);
      this.onDeclared();
      this.dispatcher.closeModal();
    };

    const onFailure = ({ message }) => {
      this.dispatcher.setLoadingState(false);
      this.dispatcher.setAlertMessage(message);
    };

    this.integrator.recordStpDeclaration({ onSuccess, onFailure });
  };

  run = (context) => {
    this.dispatcher.setInitialState(context);
    this.dispatcher.openModal();
  };

  getView() {
    return (
      <Provider store={this.store}>
        <StpDeclarationModal
          onChangeStpDeclaration={this.dispatcher.setName}
          onCancelStpDeclaration={this.dispatcher.closeModal}
          onSaveStpDeclaration={this.recordDeclaration}
          onDismissStpDeclarationAlert={this.dispatcher.dismissAlert}
        />
      </Provider>
    );
  }
}
