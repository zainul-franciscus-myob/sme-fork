import { Provider } from 'react-redux';
import React from 'react';

import {
  RESET_STATE,
  SET_INITIAL_STATE,
} from '../../SystemIntents';
import {
  SET_ALERT,
  SET_LOADING_STATE,
  SET_TABLE_LOADING_STATE,
  SORT_AND_FILTER_PAY_RUN_LIST,
  UPDATE_APPLIED_FILTER_OPTIONS,
  UPDATE_FILTER_OPTIONS,
} from './PayRunListIntents';
import { SUCCESSFULLY_SAVED_DRAFT_PAY_RUN } from '../../payRun/payRunMessageTypes';
import {
  getAppliedFilterOptions,
  getBusinessId,
  getCreatePayRunUrl,
  getFilterOptions,
  getSortOrder,
  getStpRegistrationUrl,
} from './payRunListSelectors';
import PayRunListView from './components/PayRunListView';
import Store from '../../store/Store';
import payRunListReducer from './payRunListReducer';

const messageTypes = [
  SUCCESSFULLY_SAVED_DRAFT_PAY_RUN,
];

export default class PayrunListModule {
  constructor({
    integration, setRootView, popMessages, replaceURLParams,
  }) {
    this.integration = integration;
    this.store = new Store(payRunListReducer);
    this.setRootView = setRootView;
    this.popMessages = popMessages;
    this.replaceURLParams = replaceURLParams;
    this.messageTypes = messageTypes;
  }

  readMessages = () => {
    const [successMessage] = this.popMessages(this.messageTypes);

    if (successMessage) {
      const {
        content: message,
      } = successMessage;

      this.setAlert({
        type: 'success',
        message,
      });
    }
  }

  applyFilter = () => {
    this.filterPayRunList();
  }

  updateFilterBarOptions = ({ filterName, value }) => {
    this.store.dispatch({
      intent: UPDATE_FILTER_OPTIONS,
      filterName,
      value,
    });
  }

  loadPayRunList = () => {
    const state = this.store.getState();
    const filterOptions = getFilterOptions(state);

    this.fetchPayRunList({
      filterOptions,
      isSort: false,
      setLoadingFunc: isLoading => this.setIsLoading(isLoading),
    });
  }

  filterPayRunList = () => {
    const state = this.store.getState();
    const filterOptions = getFilterOptions(state);

    this.fetchPayRunList({
      filterOptions,
      isSort: false,
      setLoadingFunc: isLoading => this.setTableLoadingState(isLoading),
    });
    this.updateAppliedFilterOptions(filterOptions);
  }

  sortPayRunList = () => {
    const state = this.store.getState();
    const filterOptions = getAppliedFilterOptions(state);

    this.fetchPayRunList({
      filterOptions,
      isSort: true,
      setLoadingFunc: isLoading => this.setTableLoadingState(isLoading),
    });
  }

  setAlert = (alert) => {
    this.store.dispatch({
      intent: SET_ALERT,
      alert,
    });
  }

  fetchPayRunList = ({ filterOptions, isSort, setLoadingFunc }) => {
    const state = this.store.getState();
    setLoadingFunc(true);
    const intent = SORT_AND_FILTER_PAY_RUN_LIST;

    const urlParams = {
      businessId: getBusinessId(state),
    };

    const onSuccess = ({ entries, sortOrder, stpRegistrationStatus }) => {
      setLoadingFunc(false);
      this.store.dispatch({
        intent,
        entries,
        isSort,
        sortOrder,
        stpRegistrationStatus,
      });
    };

    const onFailure = ({ message }) => this.setAlert({ message, type: 'danger' });

    let sortOrder;
    if (isSort) {
      sortOrder = getSortOrder(state) === 'desc' ? 'asc' : 'desc';
    } else {
      sortOrder = getSortOrder(state);
    }

    this.integration.read({
      intent,
      urlParams,
      params: {
        ...filterOptions,
        sortOrder,
        orderBy: 'PaymentDate',
      },
      onSuccess,
      onFailure,
    });
  }

  updateAppliedFilterOptions = (filterOptions) => {
    const intent = UPDATE_APPLIED_FILTER_OPTIONS;
    this.store.dispatch({
      intent,
      filterOptions,
    });
  }

  dismissAlert = () => {
    const intent = SET_ALERT;
    this.store.dispatch({
      intent,
      alert: undefined,
    });
  };

  setTableLoadingState = (isTableLoading) => {
    const intent = SET_TABLE_LOADING_STATE;
    this.store.dispatch({
      intent,
      isTableLoading,
    });
  };

  redirectToCreatePayrun = () => {
    const state = this.store.getState();
    const url = getCreatePayRunUrl(state);
    this.redirectTo(url);
  }

  redirectTo = (url) => {
    if (url) {
      window.location.href = url;
    }
  }

  unsubscribeFromStore = () => {
    this.store.unsubscribeAll();
  }

  setInitialState = (context) => {
    const intent = SET_INITIAL_STATE;
    this.store.dispatch({
      intent,
      context,
    });
  }

  setIsLoading(isLoading) {
    this.store.dispatch({
      intent: SET_LOADING_STATE,
      isLoading,
    });
  }

  goToStpReporting = () => {
    const state = this.store.getState();
    window.location.href = getStpRegistrationUrl(state);
  };

  run(context) {
    this.setInitialState(context);
    this.render();
    this.readMessages();
    this.loadPayRunList();
  }

  render = () => {
    const payRunListView = (
      <PayRunListView
        onCreatePayRun={this.redirectToCreatePayrun}
        onDismissAlert={this.dismissAlert}
        onSort={this.sortPayRunList}
        onApplyFilter={this.applyFilter}
        onUpdateFilterBarOptions={this.updateFilterBarOptions}
        onStpSignUpClick={this.goToStpReporting}
      />
    );

    const wrappedView = (
      <Provider store={this.store}>
        {payRunListView}
      </Provider>
    );
    this.setRootView(wrappedView);
  };

  resetState() {
    const intent = RESET_STATE;
    this.store.dispatch({
      intent,
    });
  }
}
