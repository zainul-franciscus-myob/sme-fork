import { Provider } from 'react-redux';
import React from 'react';

import {
  LOAD_BUSINESS_DETAIL,
  SET_ALERT_MESSAGE,
  SET_LOADING_STATE,
  SET_SUBMITTING_STATE,
  UPDATE_BUSINESS_DETAIL,
} from '../BusinessIntents';
import {
  RESET_STATE,
} from '../../SystemIntents';
import { getBusinessForUpdate } from './businessDetailSelectors';
import BusinessDetailsView from './components/BusinessDetailView';
import Store from '../../store/Store';
import businessDetailReducer from './businessDetailReducer';
import keyMap from '../../hotKeys/keyMap';
import setupHotKeys from '../../hotKeys/setupHotKeys';

export default class BusinessDetailModule {
  constructor({
    integration, setRootView,
  }) {
    this.integration = integration;
    this.setRootView = setRootView;
    this.store = new Store(businessDetailReducer);
  }

  loadBusinessDetail = () => {
    this.setLoadingState(true);

    const intent = LOAD_BUSINESS_DETAIL;
    const urlParams = {
      businessId: this.businessId,
    };

    const onSuccess = ({ businessDetails }) => {
      this.setLoadingState(false);

      this.store.dispatch({
        intent,
        businessDetails,
      });
    };

    const onFailure = () => {
      console.log('Failed to load business detail');
    };

    this.integration.read({
      intent,
      urlParams,
      onSuccess,
      onFailure,
    });
  }

  setLoadingState = (isLoading) => {
    const intent = SET_LOADING_STATE;

    this.store.dispatch({
      intent,
      isLoading,
    });
  };

  onChange = ({ key, value }) => {
    const intent = UPDATE_BUSINESS_DETAIL;

    this.store.dispatch({
      intent,
      key,
      value,
    });
  }

  updateBusinessDetail = () => {
    this.setSubmittingState(true);

    const intent = UPDATE_BUSINESS_DETAIL;
    const content = getBusinessForUpdate(this.store.getState());
    const urlParams = {
      businessId: this.businessId,
    };
    const onSuccess = ({ message }) => {
      this.setSubmittingState(false);
      this.displayAlert({ message, type: 'success' });
    };
    const onFailure = (error) => {
      this.setSubmittingState(false);
      this.displayAlert({ message: error.message, type: 'danger' });
    };
    this.integration.write({
      intent,
      urlParams,
      content,
      onSuccess,
      onFailure,
    });
  };

  displayAlert = ({ message, type }) => {
    this.store.dispatch({
      intent: SET_ALERT_MESSAGE,
      alert: {
        message,
        type,
      },
    });
  }

  setSubmittingState = (isSubmitting) => {
    const intent = SET_SUBMITTING_STATE;

    this.store.dispatch({
      intent,
      isSubmitting,
    });
  }

  dismissAlert = () => {
    this.store.dispatch({
      intent: SET_ALERT_MESSAGE,
      alert: undefined,
    });
  };

  unsubscribeFromStore = () => {
    this.store.unsubscribeAll();
  };

  resetState = () => {
    const intent = RESET_STATE;
    this.store.dispatch({
      intent,
    });
  };

  render = () => {
    const businessDetailsView = (
      <BusinessDetailsView
        onChange={this.onChange}
        onSaveButtonClick={this.updateBusinessDetail}
        onDismissAlert={this.dismissAlert}
      />
    );

    const wrappedView = (
      <Provider store={this.store}>
        {businessDetailsView}
      </Provider>
    );
    this.setRootView(wrappedView);
  };

  handlers = {
    SAVE_ACTION: this.updateBusinessDetail,
  };

  run(context) {
    this.businessId = context.businessId;
    this.render();
    setupHotKeys(keyMap, this.handlers);
    this.loadBusinessDetail();
  }
}
