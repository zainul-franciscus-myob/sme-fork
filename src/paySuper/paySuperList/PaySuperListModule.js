import { Provider } from 'react-redux';
import React from 'react';

import {
  LOAD_PAY_SUPER_LIST,
  LOAD_UPDATED_SUPER_PAYMENT_STATUS_LIST,
  SET_ALERT,
  SET_IS_LOADING,
  SET_IS_TABLE_LOADING,
  SET_SORT_ORDER,
} from './paySuperIntents';
import { RESET_STATE, SET_INITIAL_STATE } from '../../SystemIntents';
import { SUCCESSFULLY_CREATED_SUPER_PAYMENT } from '../paySuperMessageTypes';
import {
  getBusinessId,
  getPaySuperCreateUrl,
  getPaySuperUrl,
  getRegion,
  getSortOrder,
} from './paySuperListSelector';
import PaySuperListView from './components/PaySuperListView';
import Store from '../../store/Store';
import paySuperListReducer from './paySuperListReducer';

export default class PayrunListModule {
  constructor({
    integration, setRootView, popMessages,
  }) {
    this.integration = integration;
    this.store = new Store(paySuperListReducer);
    this.setRootView = setRootView;
    this.popMessages = popMessages;
    this.messageTypes = [SUCCESSFULLY_CREATED_SUPER_PAYMENT];
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

  setIsTableLoading = (isTableLoading) => {
    this.store.dispatch({
      intent: SET_IS_TABLE_LOADING,
      isTableLoading,
    });
  }

  popAlert = () => {
    const [alert] = this.popMessages(this.messageTypes);
    if (alert) {
      this.setAlert({
        type: 'success',
        message: alert.content,
      });
    }
  };

  setAlert = (alert) => {
    this.store.dispatch({
      intent: SET_ALERT,
      alert,
    });
  }

  dismissAlert = () => {
    this.store.dispatch({
      intent: SET_ALERT,
      alert: null,
    });
  }

  updateSuperPaymentStatus = () => {
    const intent = LOAD_UPDATED_SUPER_PAYMENT_STATUS_LIST;
    const state = this.store.getState();

    const urlParams = {
      businessId: getBusinessId(state),
    };

    const onSuccess = (response) => {
      this.store.dispatch({
        intent,
        response,
      });
    };

    const onFailure = ({ message }) => this.setAlert({ type: 'danger', message });

    this.integration.read({
      intent,
      urlParams,
      onSuccess,
      onFailure,
    });
  }

  loadPaySuperList = () => {
    const intent = LOAD_PAY_SUPER_LIST;
    const state = this.store.getState();

    const urlParams = {
      businessId: getBusinessId(state),
    };

    const sortOrder = getSortOrder(state);
    const params = {
      orderBy: sortOrder.column,
      sortOrder: sortOrder.descending ? 'desc' : 'asc',
    };

    const onSuccess = (response) => {
      this.store.dispatch({
        intent,
        response,
      });
      this.setIsLoading(false);
      this.setIsTableLoading(false);
      this.updateSuperPaymentStatus();
    };

    const onFailure = ({ message }) => this.setAlert({ type: 'danger', message });

    this.integration.read({
      intent,
      urlParams,
      params,
      onSuccess,
      onFailure,
    });
  }

  redirectToSuperPaymentDetail = (businessEventId) => {
    const state = this.store.getState();
    const businessId = getBusinessId(state);
    const region = getRegion(state);

    window.location.href = `/#/${region}/${businessId}/paySuper/${businessEventId}`;
  }

  setSortOrder = (orderByColumn) => {
    this.store.dispatch({
      intent: SET_SORT_ORDER,
      orderBy: orderByColumn,
    });
  }

  onSort = (sortColumn) => {
    this.setSortOrder(sortColumn);
    this.setIsTableLoading(true);
    this.loadPaySuperList();
  }

  redirectToPaySuper = () => {
    const state = this.store.getState();
    const paySuperUrl = getPaySuperUrl(state);

    window.location.href = paySuperUrl;
  }

  redirectToCreate = () => {
    const state = this.store.getState();
    window.location.href = getPaySuperCreateUrl(state);
  }

  render = () => {
    const paySuperListView = (
      <PaySuperListView
        onReferenceNumberClick={this.redirectToSuperPaymentDetail}
        onCreateButtonClick={this.redirectToCreate}
        onSettingsButtonClick={this.redirectToPaySuper}
        onRegisterButtonClick={this.redirectToPaySuper}
        onSort={this.onSort}
        alertDismiss={this.dismissAlert}
      />
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
    this.popAlert();
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
