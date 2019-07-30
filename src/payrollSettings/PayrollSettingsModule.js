import { Provider } from 'react-redux';
import React from 'react';

import { SUCCESSFULLY_DELETED_SUPER_FUND, SUCCESSFULLY_SAVED_SUPER_FUND } from './PayrollSettingsMessageTypes';
import {
  getBusinessId, getRegion, getTab, getURLParams,
} from './selectors/payrollSettingsSelectors';
import { getIsCreating } from './selectors/employmentClassificationDetailSelectors';
import { getNewEmploymentClassificationSortOrder } from './selectors/employmentClassificationListSelectors';
import { getNewSortOrder } from './selectors/superFundListSelectors';
import { tabIds } from './tabItems';
import ModalType from './ModalType';
import PayrollSettingsView from './components/PayrollSettingsView';
import Store from '../store/Store';
import createPayrollSettingsDispatcher from './createPayrollSettingsDispatcher';
import createPayrollSettingsIntegrator from './createPayrollSettingsIntegrator';
import payrollSettingsReducer from './reducer/payrollSettingsReducer';

const messageTypes = [SUCCESSFULLY_DELETED_SUPER_FUND, SUCCESSFULLY_SAVED_SUPER_FUND];

export default class PayrollSettingsModule {
  constructor({
    integration, setRootView, popMessages, replaceURLParams,
  }) {
    this.setRootView = setRootView;
    this.store = new Store(payrollSettingsReducer);
    this.replaceURLParams = replaceURLParams;
    this.popMessages = popMessages;
    this.messageTypes = messageTypes;
    this.dispatcher = createPayrollSettingsDispatcher(this.store);
    this.integrator = createPayrollSettingsIntegrator(this.store, integration);
  }

  readMessages = () => {
    const [successMessage] = this.popMessages(this.messageTypes);
    if (successMessage) {
      const { content: message } = successMessage;
      this.dispatcher.setAlert({ type: 'success', message });
    }
  }

  dismissAlert = () => {
    this.dispatcher.dismissAlert();
  }

  updateURLFromState = state => this.replaceURLParams(getURLParams(state))

  setTab = (selectedTab) => {
    this.dispatcher.setTab(selectedTab);

    const state = this.store.getState();
    const tab = getTab(state);

    this.loadTabContent(tab);
  }

  loadTabContent = (selectedTab) => {
    const loadData = {
      [tabIds.superFundList]: this.loadSuperFundList,
      [tabIds.classification]: this.loadEmploymentClassificationList,
    }[selectedTab] || (() => {});

    loadData();
  }

  loadSuperFundList = () => {
    this.dispatcher.setSuperFundListLoadingState(true);

    const onSuccess = (response) => {
      this.dispatcher.setSuperFundListLoadingState(false);
      this.dispatcher.loadSuperFundList(response);
    };

    const onFailure = () => {
      console.log('Failed to load super fund entries');
    };

    this.integrator.loadSuperFundList({ onSuccess, onFailure });
  }

  filterSuperFundList = () => {
    this.dispatcher.setSuperFundListTableLoadingState(true);

    const onSuccess = (response) => {
      this.dispatcher.setSuperFundListTableLoadingState(false);
      this.dispatcher.filterSuperFundList(response);
    };

    const onFailure = (error) => {
      this.dispatcher.setSuperFundListTableLoadingState(false);
      this.dispatcher.setAlert({ message: error.message, type: 'danger' });
    };

    this.integrator.filterSuperFundList({ onSuccess, onFailure });
  }

  sortSuperFundList = (orderBy) => {
    this.dispatcher.setSuperFundListTableLoadingState(true);

    const state = this.store.getState();
    const sortOrder = getNewSortOrder(orderBy)(state);
    this.dispatcher.setSuperFundListSortOrder(orderBy, sortOrder);

    const onSuccess = (response) => {
      this.dispatcher.setSuperFundListTableLoadingState(false);
      this.dispatcher.sortSuperFundList(response);
    };

    const onFailure = (error) => {
      this.dispatcher.setSuperFundListTableLoadingState(false);
      this.dispatcher.setAlert({ message: error.message, type: 'danger' });
    };

    this.integrator.sortSuperFundList({
      orderBy, sortOrder, onSuccess, onFailure,
    });
  }

  redirectToCreateSuperFund= () => {
    const state = this.store.getState();
    const businessId = getBusinessId(state);
    const region = getRegion(state);

    window.location.href = `/#/${region}/${businessId}/superFund/new`;
  }

  loadEmploymentClassificationList = () => {
    this.dispatcher.setEmploymentClassificationListLoadingState(true);

    const onSuccess = (response) => {
      this.dispatcher.setEmploymentClassificationListLoadingState(false);
      this.dispatcher.loadEmploymentClassificationList(response);
    };

    const onFailure = () => {};

    this.integrator.loadEmploymentClassificationList({ onSuccess, onFailure });
  }

  filterEmploymentClassificationList = () => {
    this.dispatcher.setEmploymentClassificationListTableLoadingState(true);

    const onSuccess = (response) => {
      this.dispatcher.setEmploymentClassificationListTableLoadingState(false);
      this.dispatcher.filterEmploymentClassificationList(response);
    };

    const onFailure = (error) => {
      this.dispatcher.setEmploymentClassificationListTableLoadingState(false);
      this.dispatcher.setAlert({ message: error.message, type: 'danger' });
    };

    this.integrator.filterEmploymentClassificationList({ onSuccess, onFailure });
  }

  sortEmploymentClassificationList = (orderBy) => {
    this.dispatcher.setEmploymentClassificationListTableLoadingState(true);

    const state = this.store.getState();
    const sortOrder = getNewEmploymentClassificationSortOrder(orderBy)(state);
    this.dispatcher.setEmploymentClassificationListSortOrder(orderBy, sortOrder);

    const onSuccess = (response) => {
      this.dispatcher.setEmploymentClassificationListTableLoadingState(false);
      this.dispatcher.sortEmploymentClassificationList(response);
    };

    const onFailure = (error) => {
      this.dispatcher.setEmploymentClassificationListTableLoadingState(false);
      this.dispatcher.setAlert({ message: error.message, type: 'danger' });
    };

    this.integrator.sortEmploymentClassificationList({
      orderBy, sortOrder, onSuccess, onFailure,
    });
  }

  closeEmploymentClassificationDetailModal = () => {
    this.dispatcher.dismissModal();
  }

  dismissEmploymentClassificationAlert = () => {
    this.dispatcher.dismissEmploymentClassificationDetailAlert();
  }

  openNewEmployeeClassificationDetailModal = () => {
    this.dispatcher.setModalType(ModalType.EMPLOYMENT_CLASSIFICATION_DETAIL);
    this.dispatcher.setNewEmploymentClassificationDetailInitialState();
    this.dispatcher.setEmploymentClassificationDetailIsLoading(true);

    const onSuccess = (employmentClassification) => {
      this.dispatcher.setEmploymentClassificationDetailIsLoading(false);
      this.dispatcher.loadNewEmploymentClassificationDetail(employmentClassification);
    };

    const onFailure = ({ message }) => {
      this.dispatcher.dismissModal();
      this.dispatcher.setAlert({
        type: 'danger',
        message,
      });
    };

    this.integrator.loadNewEmploymentClassificationDetail({ onSuccess, onFailure });
  }

  openEmployeeClassificationDetailModal = (id) => {
    this.dispatcher.setModalType(ModalType.EMPLOYMENT_CLASSIFICATION_DETAIL);
    this.dispatcher.setEmploymentClassificationDetailInitialState({ id });
    this.dispatcher.setEmploymentClassificationDetailIsLoading(true);

    const onSuccess = (employmentClassification) => {
      this.dispatcher.setEmploymentClassificationDetailIsLoading(false);
      this.dispatcher.loadEmploymentClassificationDetail(employmentClassification);
    };

    const onFailure = ({ message }) => {
      this.dispatcher.dismissModal();
      this.dispatcher.setAlert({
        type: 'danger',
        message,
      });
    };

    this.integrator.loadEmploymentClassificationDetail({ onSuccess, onFailure });
  }

  saveEmploymentClassification = () => {
    const state = this.store.getState();
    const isCreating = getIsCreating(state);
    const onSuccess = ({ message }) => {
      this.dispatcher.setEmploymentClassificationDetailIsLoading(false);
      this.dispatcher.dismissModal();
      this.dispatcher.setAlert({
        type: 'success',
        message,
      });

      this.filterEmploymentClassificationList();
    };
    const onFailure = ({ message }) => {
      this.dispatcher.setEmploymentClassificationDetailIsLoading(false);
      this.dispatcher.setEmploymentClassificationDetailAlert({
        type: 'danger',
        message,
      });
    };

    this.dispatcher.setEmploymentClassificationDetailIsLoading(true);
    if (isCreating) {
      this.integrator.createEmploymentClassification({ onSuccess, onFailure });
    } else {
      this.integrator.updateEmploymentClassification({ onSuccess, onFailure });
    }
  }

  deleteEmploymentClassification = () => {
    const onSuccess = ({ message }) => {
      this.dispatcher.setEmploymentClassificationDetailIsLoading(false);
      this.dispatcher.dismissModal();
      this.dispatcher.setAlert({
        type: 'success',
        message,
      });

      this.filterEmploymentClassificationList();
    };
    const onFailure = ({ message }) => {
      this.dispatcher.setEmploymentClassificationDetailIsLoading(false);
      this.dispatcher.setEmploymentClassificationDetailAlert({
        type: 'danger',
        message,
      });
    };

    this.dispatcher.setEmploymentClassificationDetailIsLoading(true);
    this.integrator.deleteEmploymentClassification({ onSuccess, onFailure });
  }

  resetState = () => {
    this.dispatcher.resetState();
  };

  unsubscribeFromStore = () => {
    this.store.unsubscribeAll();
  }

  run(context) {
    this.dispatcher.setInitialState(context);
    this.store.subscribe(this.updateURLFromState);
    this.render();
    this.readMessages();
    this.setTab(context.tab);
  }

  render = () => {
    const view = (
      <PayrollSettingsView
        onDismissAlert={this.dispatcher.dismissAlert}
        onSelectTab={this.setTab}
        superFundListeners={{
          onCreateButtonClick: this.redirectToCreateSuperFund,
          onUpdateFilterOptions: this.dispatcher.setSuperFundListFilterOptions,
          onApplyFilter: this.filterSuperFundList,
          onSort: this.sortSuperFundList,
        }}
        employmentClassificationListeners={{
          onCreateButtonClick: this.openNewEmployeeClassificationDetailModal,
          onUpdateFilterOptions: this.dispatcher.setEmploymentClassificationListFilterOptions,
          onApplyFilter: this.filterEmploymentClassificationList,
          onSort: this.sortEmploymentClassificationList,
          onClickRowButton: this.openEmployeeClassificationDetailModal,
        }}
        employmentClassificationDetailListeners={{
          onChangeEmploymentClassificationDetail:
            this.dispatcher.changeEmploymentClassificationDetail,
          onCancelEmploymentClassificationDetailModal:
            this.closeEmploymentClassificationDetailModal,
          onSaveEmploymentClassificationDetail: this.saveEmploymentClassification,
          onDeleteEmploymentClassificationDetail: this.deleteEmploymentClassification,
          onDismissEmploymentClassificationAlert: this.dismissEmploymentClassificationAlert,
        }}
      />
    );

    const wrappedView = (
      <Provider store={this.store}>
        {view}
      </Provider>
    );
    this.setRootView(wrappedView);
  }
}
