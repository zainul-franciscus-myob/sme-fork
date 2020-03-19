import { Provider } from 'react-redux';
import React from 'react';

import { SUCCESSFULLY_LINKED_DOCUMENT_TO_BILL } from '../inTray/inTrayMessageTypes';
import {
  getAreActionButtonsDisabled,
  getInTrayListUrl,
  getIsAnyBillSelected,
  getNewSortOrder,
} from './LinkBillSelectors';
import LinkBillView from './components/LinkBillView';
import LoadingState from '../../components/PageView/LoadingState';
import Store from '../../store/Store';
import createLinkBillDispatcher from './createLinkBillDispatcher';
import createLinkBillIntegrator from './createLinkBillIntegrator';
import keyMap from '../../hotKeys/keyMap';
import linkBillReducer from './linkBillReducer';
import setupHotKeys from '../../hotKeys/setupHotKeys';

export default class LinkBillModule {
  constructor({
    integration, setRootView, pushMessage,
  }) {
    this.integration = integration;
    this.setRootView = setRootView;
    this.pushMessage = pushMessage;
    this.store = new Store(linkBillReducer);
    this.dispatcher = createLinkBillDispatcher(this.store);
    this.integrator = createLinkBillIntegrator(this.store, integration);
  }

  loadLinkBill = () => {
    this.dispatcher.setLoadingState(LoadingState.LOADING);

    const onSuccess = (response) => {
      this.dispatcher.setLoadingState(LoadingState.LOADING_SUCCESS);
      this.dispatcher.loadLinkBill(response);
    };

    const onFailure = () => {
      this.dispatcher.setLoadingState(LoadingState.LOADING_FAIL);
    };

    this.integrator.loadLinkBill({ onSuccess, onFailure });
  }

  updateFilterOptions = ({ key, value }) => {
    this.dispatcher.updateFilterOptions({ key, value });
    this.sortAndFilterLinkBillList();
  }

  updateSortOption = (orderBy) => {
    const state = this.store.getState();
    const sortOrder = getNewSortOrder(orderBy)(state);
    this.dispatcher.setSortOrder(orderBy, sortOrder);

    this.sortAndFilterLinkBillList();
  }

  sortAndFilterLinkBillList = () => {
    this.dispatcher.setTableLoadingState(true);

    const onSuccess = (response) => {
      this.dispatcher.setTableLoadingState(false);
      this.dispatcher.sortAndFilterLinkBillList(response);
    };

    const onFailure = ({ message }) => {
      this.dispatcher.setTableLoadingState(false);
      this.dispatcher.setAlert({ message, type: 'danger' });
    };

    this.integrator.sortAndFilterLinkBillList({ onSuccess, onFailure });
  }

  linkDocumentToBill = () => {
    const state = this.store.getState();

    if (getIsAnyBillSelected(state)) {
      this.createDocumentLink();
    } else {
      this.dispatcher.setAlert({
        type: 'danger',
        message: 'Please select a bill to link to the document.',
      });
    }
  }

  createDocumentLink = () => {
    if (getAreActionButtonsDisabled(this.store.getState())) return;

    this.dispatcher.setSubmittingState(true);

    const onSuccess = ({ message }) => {
      this.pushMessage({
        type: SUCCESSFULLY_LINKED_DOCUMENT_TO_BILL,
        content: message,
      });
      this.redirectToInTrayListPage();
    };

    const onFailure = ({ message }) => {
      this.dispatcher.setSubmittingState(false);
      this.dispatcher.setAlert({
        type: 'danger',
        message,
      });
    };

    this.integrator.linkDocumentToBill({ onSuccess, onFailure });
  }

  redirectToInTrayListPage = () => {
    window.location.href = getInTrayListUrl(this.store.getState());
  }

  handlers = {
    SAVE_ACTION: this.linkDocumentToBill,
  };

  setInitialState = context => this.dispatcher.setInitialState(context);

  resetState = () => this.dispatcher.resetState();

  unsubscribeFromStore = () => {
    this.store.unsubscribeAll();
  };

  render = () => {
    const wrappedView = (
      <Provider store={this.store}>
        <LinkBillView
          onUpdateFilterOptions={this.updateFilterOptions}
          onSort={this.updateSortOption}
          onBillSelect={this.dispatcher.updateBillSelection}
          onCancelButtonClick={this.redirectToInTrayListPage}
          onLinkButtonClick={this.linkDocumentToBill}
          onDismissAlert={this.dispatcher.dismissAlert}
        />
      </Provider>
    );

    this.setRootView(wrappedView);
  };

  run(context) {
    this.dispatcher.setInitialState(context);
    setupHotKeys(keyMap, this.handlers);
    this.render();
    this.loadLinkBill();
  }
}
