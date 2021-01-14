import { Provider } from 'react-redux';
import React from 'react';

import {
  SUCCESSFULLY_DELETED_INVOICE,
  SUCCESSFULLY_EMAILED_INVOICE,
  SUCCESSFULLY_SAVED_INVOICE_PAYMENT,
  SUCCESSFULLY_SENT_EINVOICE,
} from '../../../common/types/MessageTypes';
import {
  getBusinessId,
  getFlipSortOrder,
  getOrderBy,
  getRegion,
  getSettings,
} from './invoiceListSelectors';
import { loadSettings, saveSettings } from '../../../store/localStorageDriver';
import InvoiceListView from './components/InvoiceListView';
import LoadingState from '../../../components/PageView/LoadingState';
import RouteName from '../../../router/RouteName';
import Store from '../../../store/Store';
import createInvoiceListDispatcher from './createInvoiceListDispatcher';
import createInvoiceListIntegrator from './createInvoiceListIntegrator';
import debounce from '../../../common/debounce/debounce';
import invoiceListReducer from './invoiceListReducer';

const messageTypes = [
  SUCCESSFULLY_DELETED_INVOICE,
  SUCCESSFULLY_EMAILED_INVOICE,
  SUCCESSFULLY_SAVED_INVOICE_PAYMENT,
  SUCCESSFULLY_SENT_EINVOICE,
];

export default class InvoiceListModule {
  constructor({ integration, setRootView, popMessages, featureToggles }) {
    this.store = new Store(invoiceListReducer);
    this.setRootView = setRootView;
    this.popMessages = popMessages;
    this.messageTypes = messageTypes;
    this.dispatcher = createInvoiceListDispatcher(this.store);
    this.integrator = createInvoiceListIntegrator(this.store, integration);
    this.featureToggles = featureToggles;
  }

  loadInvoiceList = () => {
    const onSuccess = (response) => {
      this.dispatcher.setLoadingState(LoadingState.LOADING_SUCCESS);
      this.dispatcher.loadInvoiceList(response);
    };

    const onFailure = () => {
      this.dispatcher.setLoadingState(LoadingState.LOADING_FAIL);
    };

    this.dispatcher.setLoadingState(LoadingState.LOADING);
    this.integrator.loadInvoiceList({ onSuccess, onFailure });
  };

  sortInvoiceList = (orderBy) => {
    const state = this.store.getState();
    const newSortOrder =
      orderBy === getOrderBy(state) ? getFlipSortOrder(state) : 'asc';
    this.dispatcher.setSortOrder({ orderBy, newSortOrder });

    this.sortAndFilterInvoiceList();
  };

  filterInvoiceList = ({ filterName, value }) => {
    this.dispatcher.updateFilterOptions({
      filterName,
      value,
    });

    if (filterName === 'keywords') {
      this.debounceFilterInvoiceList();
    } else {
      this.sortAndFilterInvoiceList();
    }
  };

  resetInvoiceListFilter = () => {
    this.dispatcher.resetFilterOptions();
    this.sortAndFilterInvoiceList();
  };

  sortAndFilterInvoiceList = () => {
    const onSuccess = ({
      entries,
      total,
      totalDue,
      totalOverdue,
      pagination,
    }) => {
      this.dispatcher.setTableLoadingState(false);
      this.dispatcher.sortAndFilterInvoiceList({
        entries,
        total,
        totalDue,
        totalOverdue,
        pagination,
      });
    };

    const onFailure = ({ message }) => {
      this.dispatcher.setTableLoadingState(false);
      this.dispatcher.setAlert({ message, type: 'danger' });
    };

    this.dispatcher.setTableLoadingState(true);
    this.integrator.sortAndFilterInvoiceList({ onSuccess, onFailure });
  };

  loadNextPage = () => {
    this.dispatcher.setNextPageLoadingState(true);

    const onSuccess = ({ entries, pagination }) => {
      this.dispatcher.setNextPageLoadingState(false);
      this.dispatcher.loadNextPage({ entries, pagination });
    };

    const onFailure = ({ message }) => {
      this.dispatcher.setNextPageLoadingState(false);
      this.dispatcher.setAlert({ message, type: 'danger' });
    };

    this.integrator.loadNextPage({
      onSuccess,
      onFailure,
    });
  };

  readMessages = () => {
    const [successMessage] = this.popMessages(this.messageTypes);

    if (successMessage) {
      const { content: message } = successMessage;
      this.dispatcher.setAlert({
        type: 'success',
        message,
      });
    }
  };

  redirectToCreateNewInvoice = () => {
    const state = this.store.getState();
    const businessId = getBusinessId(state);
    const region = getRegion(state);

    window.location.href = `/#/${region}/${businessId}/invoice/new`;
  };

  render = () => {
    const invoiceListView = (
      <InvoiceListView
        onUpdateFilter={this.filterInvoiceList}
        onResetFilter={this.resetInvoiceListFilter}
        onDismissAlert={this.dispatcher.dismissAlert}
        onSort={this.sortInvoiceList}
        onLoadMoreButtonClick={this.loadNextPage}
        onCreateInvoiceButtonClick={this.redirectToCreateNewInvoice}
        isInvoiceListActivityColumnEnabled={
          this.featureToggles.isInvoiceListActivityColumnEnabled
        }
      />
    );

    const wrappedView = (
      <Provider store={this.store}>{invoiceListView}</Provider>
    );
    this.setRootView(wrappedView);
  };

  debounceFilterInvoiceList = debounce(this.sortAndFilterInvoiceList);

  resetState() {
    this.dispatcher.resetState();
  }

  run(context) {
    const settings = loadSettings(context.businessId, RouteName.INVOICE_LIST);
    this.dispatcher.setInitialState(context, settings);
    this.render();
    this.readMessages();
    this.store.subscribe((state) =>
      saveSettings(
        context.businessId,
        RouteName.INVOICE_LIST,
        getSettings(state)
      )
    );
    this.loadInvoiceList();
  }

  unsubscribeFromStore = () => {
    this.store.unsubscribeAll();
  };
}
