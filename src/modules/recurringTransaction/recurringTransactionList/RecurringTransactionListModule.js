import { Provider } from 'react-redux';
import React from 'react';

import CreateRecurringTransactionListDispatcher from './CreateRecurringTransactionListDispatcher';
import RecurringTransactionListView from './components/RecurringTransactionListView';
import Store from '../../../store/Store';
import recurringTransactionListReducer from './recurringTransactionListReducer';

export default class RecurringTransactionModule {
  constructor({ integration, setRootView, popMessages }) {
    this.integration = integration;
    this.store = new Store(recurringTransactionListReducer);
    this.setRootView = setRootView;
    this.popMessages = popMessages;
    this.dispatcher = CreateRecurringTransactionListDispatcher(this.store);
  }

  render = () => {
    const recurringTransactionListView = <RecurringTransactionListView />;

    const wrappedView = (
      <Provider store={this.store}>{recurringTransactionListView}</Provider>
    );
    this.setRootView(wrappedView);
  };

  run(context) {
    this.dispatcher.setInitialState(context);
    this.render();
  }

  unsubscribeFromStore = () => {
    this.store.unsubscribeAll();
  };

  resetState = () => {
    this.dispatcher.resetState();
  };
}
