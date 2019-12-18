import { Provider } from 'react-redux';
import React from 'react';

import { SUCCESSFULLY_LINKED_DOCUMENT_TO_BILL } from '../../inTray/inTrayMessageTypes';
import { getInTrayListUrl, getIsAnyBillSelected, getNewSortOrder } from './LinkBillSelectors';
import LinkBillView from './components/LinkBillView';
import Store from '../../store/Store';
import createLinkBillDispatcher from './createLinkBillDispatcher';
import createLinkBillIntegrator from './createLinkBillIntegrator';
import linkBillReducer from './linkBillReducer';

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
    this.dispatcher.setLoadingState(true);

    const onSuccess = (response) => {
      this.dispatcher.setLoadingState(false);
      this.dispatcher.loadLinkBill(response);
    };

    const onFailure = () => {
      console.log('Failed to load');
    };

    this.integrator.loadLinkBill({ onSuccess, onFailure });
  }

  updateFilterOptions = ({ key, value }) => this.dispatcher.updateFilterOptions({ key, value })

  filterLinkBillList = () => {
    this.dispatcher.setTableLoadingState(true);

    const onSuccess = (response) => {
      this.dispatcher.setTableLoadingState(false);
      this.dispatcher.filterLinkBillList(response);
    };

    const onFailure = ({ message }) => {
      this.dispatcher.setTableLoadingState(false);
      this.dispatcher.setAlert({ message, type: 'danger' });
    };

    this.integrator.filterLinkBillList({ onSuccess, onFailure });
  };

  sortLinkBillList = (orderBy) => {
    this.dispatcher.setTableLoadingState(true);

    const state = this.store.getState();
    const sortOrder = getNewSortOrder(orderBy)(state);
    this.dispatcher.setSortOrder(orderBy, sortOrder);

    const onSuccess = (response) => {
      this.dispatcher.setTableLoadingState(false);
      this.dispatcher.sortLinkBillList(response);
    };

    const onFailure = ({ message }) => {
      this.setTableLoadingState(false);
      this.dispatcher.setAlert({ message, type: 'danger' });
    };

    this.integrator.sortLinkBillList({ onSuccess, onFailure });
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
          onApplyFilters={this.filterLinkBillList}
          onSort={this.sortLinkBillList}
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
    this.dispatcher.setLoadingState(true);
    this.render();
    this.loadLinkBill();
  }
}
