import { Provider } from 'react-redux';
import React from 'react';

import {
  LOAD_SERVICE_QUOTE_DETAIL,
  SET_LOADING_STATE, UPDATE_SERVICE_QUOTE_HEADER_OPTIONS,
} from '../QuoteIntents';
import {
  RESET_STATE,
  SET_INITIAL_STATE,
} from '../../SystemIntents';
import { getBusinessId, getQuoteId } from './ServiceQuoteSelectors';
import ServiceQuoteView from './components/ServiceQuoteView';
import Store from '../../store/Store';
import serviceQuoteReducer from './serviceQuoteReducer';

export default class ServiceQuoteModule {
  constructor({
    integration, setRootView,
  }) {
    this.integration = integration;
    this.setRootView = setRootView;
    this.store = new Store(serviceQuoteReducer);
  }

  loadServiceQuoteDetail = () => {
    const intent = LOAD_SERVICE_QUOTE_DETAIL;
    const state = this.store.getState();
    const urlParams = {
      businessId: getBusinessId(state),
      quoteId: getQuoteId(state),
    };

    const onSuccess = (response) => {
      this.setLoadingState(false);
      this.store.dispatch({
        intent,
        ...response,
      });
    };

    const onFailure = () => {
      console.log('Failed to load service quote');
    };

    this.integration.read({
      intent,
      urlParams,
      onSuccess,
      onFailure,
    });
  }

  updateHeaderOptions = ({ key, value }) => {
    this.store.dispatch({
      intent: UPDATE_SERVICE_QUOTE_HEADER_OPTIONS,
      key,
      value,
    });
  }

  render = () => {
    const serviceQuoteView = (
      <ServiceQuoteView
        onUpdateHeaderOptions={this.updateHeaderOptions}
      />
    );

    const wrappedView = (
      <Provider store={this.store}>
        {serviceQuoteView}
      </Provider>
    );
    this.setRootView(wrappedView);
  }

  unsubscribeFromStore = () => {
    this.store.unsubscribeAll();
  }

  setLoadingState = (isLoading) => {
    const intent = SET_LOADING_STATE;
    this.store.dispatch({
      intent,
      isLoading,
    });
  }

  setInitialState = (context) => {
    const intent = SET_INITIAL_STATE;

    this.store.dispatch({
      intent,
      context,
    });
  }

  run(context) {
    this.setInitialState(context);
    this.render();
    this.setLoadingState(true);
    this.loadServiceQuoteDetail();
  }

  resetState = () => {
    const intent = RESET_STATE;
    this.store.dispatch({
      intent,
    });
  };
}
