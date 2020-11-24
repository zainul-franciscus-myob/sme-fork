import { Provider } from 'react-redux';
import React from 'react';

import { SUCCESSFULLY_SAVED_DRAFT_PAY_RUN } from '../../../../common/types/MessageTypes';
import { getCreatePayRunUrl } from './payRunListSelectors';
import PayRunListDispatchers from './PayRunListDispatchers';
import PayRunListIntegrator from './PayRunListIntegrator';
import PayRunListView from './components/PayRunListView';
import Store from '../../../../store/Store';
import payRunListReducer from './payRunListReducer';

const messageTypes = [SUCCESSFULLY_SAVED_DRAFT_PAY_RUN];

export default class PayrunListModule {
  constructor({ integration, setRootView, popMessages, replaceURLParams }) {
    this.store = new Store(payRunListReducer);
    this.integrator = PayRunListIntegrator(this.store, integration);
    this.dispatcher = PayRunListDispatchers(this.store);
    this.setRootView = setRootView;
    this.popMessages = popMessages;
    this.replaceURLParams = replaceURLParams;
    this.messageTypes = messageTypes;
  }

  readMessages = () => {
    const [successMessage] = this.popMessages(this.messageTypes);

    if (successMessage) {
      const { content: message } = successMessage;

      this.setAlert({
        type: 'success',
        message,
      });
    }
  };

  updateFilterBarOptions = ({ filterName, value }) => {
    this.dispatcher.updateFilterOptions(filterName, value);
    this.sortAndFilterPayRunList({ setLoadingFunc: this.setTableLoadingState });
  };

  resetFilterBarOptions = () => {
    this.dispatcher.resetFilterOptions();
    this.sortAndFilterPayRunList({ setLoadingFunc: this.setTableLoadingState });
  };

  loadPayRunList = () => {
    this.sortAndFilterPayRunList({ setLoadingFunc: this.setIsLoading });
  };

  sortPayRunList = () => {
    this.dispatcher.flipSortOrder();
    this.sortAndFilterPayRunList({ setLoadingFunc: this.setTableLoadingState });
  };

  setAlert = (alert) => {
    this.dispatcher.setAlert(alert);
  };

  sortAndFilterPayRunList = ({ setLoadingFunc }) => {
    setLoadingFunc(true);

    this.integrator.sortAndFilterPayRunList({
      onSuccess: ({ entries, sortOrder }) => {
        setLoadingFunc(false);
        this.dispatcher.sortAndFilterPayRunList(entries, sortOrder);
      },
      onFailure: ({ message }) => this.setAlert({ message, type: 'danger' }),
    });
  };

  dismissAlert = () => {
    this.dispatcher.dismissAlert();
  };

  setTableLoadingState = (isTableLoading) => {
    this.dispatcher.setTableLoadingState(isTableLoading);
  };

  redirectToCreatePayrun = () => {
    const state = this.store.getState();
    const url = getCreatePayRunUrl(state);
    this.redirectTo(url);
  };

  redirectTo = (url) => {
    if (url) {
      window.location.href = url;
    }
  };

  unsubscribeFromStore = () => {
    this.store.unsubscribeAll();
  };

  setInitialState = (context) => {
    this.dispatcher.setInitialState(context);
  };

  setIsLoading = (isLoading) => {
    this.dispatcher.setLoadingState(isLoading);
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
        onUpdateFilterBarOptions={this.updateFilterBarOptions}
        onResetFilterBarOptions={this.resetFilterBarOptions}
      />
    );

    const wrappedView = (
      <Provider store={this.store}>{payRunListView}</Provider>
    );
    this.setRootView(wrappedView);
  };

  resetState() {
    this.dispatcher.resetState();
  }
}
