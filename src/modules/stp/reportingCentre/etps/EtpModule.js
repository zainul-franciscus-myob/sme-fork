import { Provider } from 'react-redux';
import React from 'react';

import { getStpDeclarationContext, getStpTerminationsLink } from './EtpSelector';
import EtpView from './components/EtpView';
import LoadingState from '../../../../components/PageView/LoadingState';
import Store from '../../../../store/Store';
import StpDeclarationModalModule from '../../stpDeclarationModal/StpDeclarationModalModule';
import createEtpDispatcher from './createEtpDispatcher';
import createEtpIntegrator from './createEtpIntegrator';
import etpReducer from './EtpReducer';

export default class EtpModule {
  constructor({ integration, setRootView }) {
    this.setRootView = setRootView;
    this.integration = integration;
    this.store = new Store(etpReducer);
    this.dispatcher = createEtpDispatcher(this.store);
    this.integrator = createEtpIntegrator(this.store, integration);
    this.stpDeclarationModule = new StpDeclarationModalModule({
      integration,
      onDeclared: this.removeEmployeeEtps,
    });
  }

  loadEmployeeEtps = () => {
    this.dispatcher.setLoadingState(LoadingState.LOADING);

    const onSuccess = (response) => {
      this.dispatcher.setLoadingState(LoadingState.LOADING_SUCCESS);
      this.dispatcher.setEmployeeEtps(response);
    };

    const onFailure = () => {
      this.dispatcher.setLoadingState(LoadingState.LOADING_FAIL);
    };

    this.integrator.loadEmployeeEtps({ onSuccess, onFailure });
  };

  removeEmployeeEtps = () => {
    this.dispatcher.setLoadingState(LoadingState.LOADING);

    const onSuccess = ({ message }) => {
      this.dispatcher.setLoadingState(LoadingState.LOADING_SUCCESS);
      this.dispatcher.setAlert({ type: 'success', message });
      this.dispatcher.setNewEventId();
      this.loadEmployeeEtps();
    };

    const onFailure = ({ message }) => {
      this.dispatcher.setLoadingState(LoadingState.LOADING_SUCCESS);
      this.dispatcher.setAlert({ type: 'danger', message });
    };

    this.integrator.deleteEmployeeEtps({ onSuccess, onFailure });
  };

  redirectToTermination = () => {
    window.location.href = getStpTerminationsLink(this.store.getState());
  };

  onRemoveEtps = () => {
    const context = getStpDeclarationContext(this.store.getState());
    this.stpDeclarationModule.run(context);
  };

  resetState = () => {
    this.dispatcher.resetState();
  };

  unsubscribeFromStore = () => {
    this.store.unsubscribeAll();
  };

  run(context) {
    this.dispatcher.setInitialState(context);
    this.render();
    this.loadEmployeeEtps();
  }

  render = () => {
    const declarationModal = this.stpDeclarationModule.getView();

    const wrappedView = (
      <Provider store={this.store}>
        {declarationModal}
        <EtpView
          onDismissAlert={this.dispatcher.dismissAlert}
          onSelectAll={this.dispatcher.selectAllPays}
          onRowSelect={this.dispatcher.setSelectedPay}
          onCancelClick={this.redirectToTermination}
          onRemoveClick={this.onRemoveEtps}
        />
      </Provider>
    );

    this.setRootView(wrappedView);
  }
}
