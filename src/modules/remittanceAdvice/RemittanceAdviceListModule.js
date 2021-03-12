import { Provider } from 'react-redux';
import React from 'react';

import { getNewSortOrder } from './selectors/remittanceAdviceListSelectors';
import LoadingState from '../../components/PageView/LoadingState';
import RemittanceAdviceListView from './components/RemittanceAdviceListView';
import Store from '../../store/Store';
import createRemittanceAdviceListDispatcher from './createRemittanceAdviceListDispatcher';
import createRemittanceAdviceListIntegrator from './createRemittanceAdviceListIntegrator';
import remittanceAdviceListReducer from './remittanceAdviceListReducer';

export default class RemittanceAdviceListModule {
  constructor({ integration, setRootView }) {
    this.setRootView = setRootView;
    this.store = new Store(remittanceAdviceListReducer);
    this.dispatcher = createRemittanceAdviceListDispatcher(this.store);
    this.integrator = createRemittanceAdviceListIntegrator(
      this.store,
      integration
    );
  }

  loadRemittanceAdviceList = () => {
    const onSuccess = (payload) => {
      this.dispatcher.setLoadingState(LoadingState.LOADING_SUCCESS);
      this.dispatcher.loadRemittanceAdviceList(payload);
    };

    const onFailure = () => {
      this.dispatcher.setLoadingState(LoadingState.LOADING_FAIL);
    };

    this.integrator.loadRemittanceAdviceList({ onSuccess, onFailure });
  };

  sortAndFilterRemittanceAdviceList = () => {
    this.dispatcher.setTableLoadingState(true);

    const onSuccess = (payload) => {
      this.dispatcher.setTableLoadingState(false);
      this.dispatcher.sortAndFilterRemittanceAdviceList(payload);
    };

    const onFailure = ({ message }) => {
      this.dispatcher.setTableLoadingState(false);
      this.dispatcher.setAlert({ type: 'danger', message });
    };

    this.integrator.sortAndFilterRemittanceAdviceList({
      onSuccess,
      onFailure,
    });
  };

  dismissAlert = () => this.dispatcher.setAlert(undefined);

  updateSortOrder = (orderBy) => {
    const state = this.store.getState();
    const newSortOrder = getNewSortOrder(state, orderBy);
    this.dispatcher.setSortOrder(orderBy, newSortOrder);

    this.sortAndFilterRemittanceAdviceList();
  };

  render = () => {
    const view = (
      <RemittanceAdviceListView
        onDismissAlert={this.dismissAlert}
        onSort={this.updateSortOrder}
        onSelectRemittanceAdvice={this.dispatcher.selectRemittanceAdvice}
        onSelectAllRemittanceAdviceList={
          this.dispatcher.selectAllRemittanceAdviceList
        }
      />
    );

    const wrappedView = <Provider store={this.store}>{view}</Provider>;
    this.setRootView(wrappedView);
  };

  run(context) {
    this.dispatcher.setInitialState(context);
    this.render();
    this.dispatcher.setLoadingState(LoadingState.LOADING);
    this.loadRemittanceAdviceList();
  }

  unsubscribeFromStore = () => {
    this.store.unsubscribeAll();
  };

  resetState = () => {
    this.dispatcher.resetState();
  };
}
