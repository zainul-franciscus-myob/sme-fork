import { Provider } from 'react-redux';
import React from 'react';

import { LOAD_PAY_SUPER_LIST, SET_IS_LOADING } from './paySuperIntents';
import { RESET_STATE, SET_INITIAL_STATE } from '../../SystemIntents';
import { getBusinessId } from './paySuperListSelector';
import PaySuperListView from './components/PaySuperListView';
import Store from '../../store/Store';
import paySuperListReducer from './paySuperListReducer';

export default class PayrunListModule {
  constructor({
    integration, setRootView,
  }) {
    this.integration = integration;
    this.store = new Store(paySuperListReducer);
    this.setRootView = setRootView;
  }

  setInitialState = (context) => {
    const intent = SET_INITIAL_STATE;
    this.store.dispatch({
      intent,
      context,
    });
  }

  setIsLoading = (isLoading) => {
    this.store.dispatch({
      intent: SET_IS_LOADING,
      isLoading,
    });
  }

  loadPaySuperList = () => {
    const intent = LOAD_PAY_SUPER_LIST;
    const state = this.store.getState();

    const urlParams = {
      businessId: getBusinessId(state),
    };

    const onSuccess = (response) => {
      this.store.dispatch({
        intent,
        response,
      });
      this.setIsLoading(false);
    };

    const onFailure = ({ message }) => console.log(message);

    this.integration.read({
      intent,
      urlParams,
      onSuccess,
      onFailure,
    });
  }

  redirectToBatchDetail = (batchPaymentId) => {
    const state = this.store.getState();
    const businessId = getBusinessId(state);

    window.location.href = `/#/${businessId}/paySuper/${batchPaymentId}`;
  }

  render = () => {
    const paySuperListView = (
      <PaySuperListView onReferenceNumberClick={this.redirectToBatchDetail} />
    );

    const wrappedView = (
      <Provider store={this.store}>
        {paySuperListView}
      </Provider>
    );

    this.setRootView(wrappedView);
  }

  run = (context) => {
    this.setInitialState(context);
    this.render();
    this.loadPaySuperList();
  }

  unsubscribeFromStore = () => {
    this.store.unsubscribeAll();
  }

  resetState = () => {
    const intent = RESET_STATE;
    this.store.dispatch({
      intent,
    });
  };
}
