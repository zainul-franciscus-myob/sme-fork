import { Provider } from 'react-redux';
import React from 'react';

import { RESET_STATE } from '../../../../SystemIntents';
import { getPayRunListUrl } from './payRunDetailNzSelector';
import LoadingState from '../../../../components/PageView/LoadingState';
import PayRunDetailNzDispatcher from './PayRunDetailNzDispatcher';
import PayRunDetailNzIntegrator from './PayRunDetailNzIntegrator';
import PayRunDetailView from './components/PayRunDetailView';
import Store from '../../../../store/Store';
import payRunDetailNzReducer from './payRunDetailNzReducer';

export default class PayRunDetailNzModule {
  constructor({ integration, setRootView }) {
    this.store = new Store(payRunDetailNzReducer);
    this.integrator = PayRunDetailNzIntegrator({
      store: this.store,
      integration,
    });
    this.dispatcher = PayRunDetailNzDispatcher({ store: this.store });
    this.setRootView = setRootView;
  }

  run(context) {
    this.dispatcher.setInitialState(context);
    this.render();
    this.loadPayRunDetails();
  }

  render = () => {
    const wrappedView = (
      <Provider store={this.store}>
        <PayRunDetailView onBack={this.redirectToPayRunList} />
      </Provider>
    );

    this.setRootView(wrappedView);
  };

  resetState = () => {
    this.store.dispatch({ intent: RESET_STATE });
  };

  unsubscribeFromStore = () => {
    this.store.unsubscribeAll();
  };

  redirectToPayRunList = () => {
    const url = getPayRunListUrl(this.store.getState());
    this.redirectToUrl(url);
  };

  redirectToUrl = (url) => {
    if (url) {
      window.location.href = url;
    }
  };

  loadPayRunDetails = () => {
    const onSuccess = (response) => {
      this.dispatcher.loadPayRunDetail(response);
      this.dispatcher.setLoadingState(LoadingState.LOADING_SUCCESS);
    };

    const onFailure = () => {
      this.dispatcher.setLoadingState(LoadingState.LOADING_FAIL);
    };

    this.dispatcher.setLoadingState(LoadingState.LOADING);
    this.integrator.loadPayRunDetail({ onSuccess, onFailure });
  };
}
