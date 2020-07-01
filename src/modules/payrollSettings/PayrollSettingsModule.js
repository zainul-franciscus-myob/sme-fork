import { Provider } from 'react-redux';
import React from 'react';

import {
  SUCCESSFULLY_DELETED_SUPER_FUND,
  SUCCESSFULLY_SAVED_SUPER_FUND,
} from '../../common/types/MessageTypes';
import {
  getCreateSuperUrl,
  getIsPageEdited,
  getModalUrl,
  getTab,
  getTabUrl,
  getURLParams,
} from './selectors/payrollSettingsSelectors';
import { getIsCreating } from './selectors/employmentClassificationDetailSelectors';
import { getNewEmploymentClassificationSortOrder } from './selectors/employmentClassificationListSelectors';
import { getNewSortOrder } from './selectors/superFundListSelectors';
import { tabIds } from './tabItems';
import LoadingState from '../../components/PageView/LoadingState';
import ModalType from './ModalType';
import PayrollSettingsView from './components/PayrollSettingsView';
import Store from '../../store/Store';
import createPayrollSettingsDispatcher from './createPayrollSettingsDispatcher';
import createPayrollSettingsIntegrator from './createPayrollSettingsIntegrator';
import debounce from '../../common/debounce/debounce';
import payrollSettingsReducer from './reducer/payrollSettingsReducer';

const messageTypes = [SUCCESSFULLY_DELETED_SUPER_FUND, SUCCESSFULLY_SAVED_SUPER_FUND];

export default class PayrollSettingsModule {
  constructor({
    integration, setRootView, popMessages, replaceURLParams, globalCallbacks,
  }) {
    this.setRootView = setRootView;
    this.store = new Store(payrollSettingsReducer);
    this.replaceURLParams = replaceURLParams;
    this.popMessages = popMessages;
    this.messageTypes = messageTypes;
    this.dispatcher = createPayrollSettingsDispatcher(this.store);
    this.integrator = createPayrollSettingsIntegrator(this.store, integration);
    this.globalCallbacks = globalCallbacks;
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
    const state = this.store.getState();
    const url = getTabUrl(state, selectedTab);
    if (getIsPageEdited(state)) {
      this.openUnsavedModal(url);
    } else {
      this.dispatcher.setTab(selectedTab);
      this.loadTabContent(selectedTab);
    }
  }

  loadTabContent = (selectedTab) => {
    const loadData = {
      [tabIds.superFundList]: this.loadSuperFundList,
      [tabIds.classification]: this.loadEmploymentClassificationList,
      [tabIds.general]: this.loadGeneralPayrollInformation,
      [tabIds.paySlipEmailDefaults]: this.loadPaySlipEmailDefaults,
    }[selectedTab] || (() => {});

    loadData();
  }

  loadPaySlipEmailDefaults = () => {
    this.dispatcher.setPaySlipEmailDefaultsLoadingState(LoadingState.LOADING);

    const onSuccess = (response) => {
      this.dispatcher.setPaySlipEmailDefaultsLoadingState(LoadingState.LOADING_SUCCESS);
      this.dispatcher.loadPaySlipEmailDefaults(response);
    };

    const onFailure = () => {
      this.dispatcher.setPaySlipEmailDefaultsLoadingState(LoadingState.LOADING_FAIL);
    };

    this.integrator.loadPaySlipEmailDefaults({
      onSuccess,
      onFailure,
    });
  }

  loadSuperFundList = () => {
    this.dispatcher.setSuperFundListLoadingState(LoadingState.LOADING);

    const onSuccess = (response) => {
      this.dispatcher.setSuperFundListLoadingState(LoadingState.LOADING_SUCCESS);
      this.dispatcher.loadSuperFundList(response);
    };

    const onFailure = () => {
      this.dispatcher.setSuperFundListLoadingState(LoadingState.LOADING_FAIL);
    };

    this.integrator.loadSuperFundList({ onSuccess, onFailure });
  }

  sortAndFilterSuperFundList = () => {
    this.dispatcher.setSuperFundListTableLoadingState(true);

    const onSuccess = (response) => {
      this.dispatcher.setSuperFundListTableLoadingState(false);
      this.dispatcher.sortAndFilterSuperFundList(response);
    };

    const onFailure = (error) => {
      this.dispatcher.setSuperFundListTableLoadingState(false);
      this.dispatcher.setAlert({ message: error.message, type: 'danger' });
    };

    this.integrator.sortAndFilterSuperFundList({ onSuccess, onFailure });
  }

  sortSuperFundList = (orderBy) => {
    const state = this.store.getState();
    const sortOrder = getNewSortOrder(orderBy)(state);
    this.dispatcher.setSuperFundListSortOrder(orderBy, sortOrder);

    this.sortAndFilterSuperFundList();
  }

  setSuperFundListFilterOptions = ({ key, value }) => {
    this.dispatcher.setSuperFundListFilterOptions({ key, value });

    debounce(this.sortAndFilterSuperFundList)();
  }

  redirectSuperannuationFundToCreateSuperFund= () => {
    const state = this.store.getState();

    window.location.href = getCreateSuperUrl(state);
  }

  redirectGeneralSettingsToCreateSuperFund = () => {
    const state = this.store.getState();
    const url = getCreateSuperUrl(state);
    this.handlePageTransition(url);
  }

  loadEmploymentClassificationList = () => {
    this.dispatcher.setEmploymentClassificationListLoadingState(LoadingState.LOADING);

    const onSuccess = (response) => {
      this.dispatcher.setEmploymentClassificationListLoadingState(LoadingState.LOADING_SUCCESS);
      this.dispatcher.loadEmploymentClassificationList(response);
    };

    const onFailure = () => {
      this.dispatcher.setEmploymentClassificationListLoadingState(LoadingState.LOADING_FAIL);
    };

    this.integrator.loadEmploymentClassificationList({ onSuccess, onFailure });
  }

  sortAndFilterEmploymentClassificationList = () => {
    this.dispatcher.setEmploymentClassificationListTableLoadingState(true);

    const onSuccess = (response) => {
      this.dispatcher.setEmploymentClassificationListTableLoadingState(false);
      this.dispatcher.sortAndFilterEmploymentClassificationList(response);
    };

    const onFailure = (error) => {
      this.dispatcher.setEmploymentClassificationListTableLoadingState(false);
      this.dispatcher.setAlert({ message: error.message, type: 'danger' });
    };

    this.integrator.sortAndFilterEmploymentClassificationList({ onSuccess, onFailure });
  }

  sortEmploymentClassificationList = (orderBy) => {
    const state = this.store.getState();
    const sortOrder = getNewEmploymentClassificationSortOrder(orderBy)(state);
    this.dispatcher.setEmploymentClassificationListSortOrder(orderBy, sortOrder);

    this.sortAndFilterEmploymentClassificationList();
  }

  setEmploymentClassificationListFilterOptions = ({ key, value }) => {
    this.dispatcher.setEmploymentClassificationListFilterOptions({ key, value });

    debounce(this.sortAndFilterEmploymentClassificationList)();
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

  loadGeneralPayrollInformation = () => {
    this.dispatcher.setGeneralPayrollInformationLoadingState(LoadingState.LOADING);

    const onSuccess = (generalPayrollInformation) => {
      this.dispatcher.loadGeneralPayrollInformation(generalPayrollInformation);
      this.dispatcher.setGeneralPayrollInformationLoadingState(LoadingState.LOADING_SUCCESS);
    };

    const onFailure = ({ message }) => {
      this.dispatcher.dismissModal();
      this.dispatcher.setAlert({
        type: 'danger',
        message,
      });

      this.dispatcher.setGeneralPayrollInformationLoadingState(LoadingState.LOADING_SUCCESS);
    };

    this.integrator.loadGeneralPayrollInformation({ onSuccess, onFailure });
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

      this.sortAndFilterEmploymentClassificationList();
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

      this.sortAndFilterEmploymentClassificationList();
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

  submitGeneralPayrollInformation = () => {
    this.dispatcher.setGeneralPayrollInformationLoadingState(LoadingState.LOADING);

    const onSuccess = ({ message }) => {
      this.dispatcher.setGeneralPayrollInformationLoadingState(LoadingState.LOADING_SUCCESS);
      const state = this.store.getState();
      const url = getModalUrl(state);
      this.globalCallbacks.payrollGeneralSettingsSaved();

      if (url) {
        this.redirectToModalUrl();
      } else {
        this.dispatcher.closeModal();
        this.dispatcher.setAlert({
          type: 'success',
          message,
        });
      }

      this.dispatcher.setIsPageEdited(false);
    };
    const onFailure = ({ message }) => {
      this.dispatcher.setGeneralPayrollInformationLoadingState(LoadingState.LOADING_SUCCESS);
      this.dispatcher.closeModal();
      this.dispatcher.setAlert({
        type: 'danger',
        message,
      });
    };

    this.integrator.submitGeneralPayrollInformation({ onSuccess, onFailure });
  }

  saveGeneralPayrollInformation = () => {
    this.submitGeneralPayrollInformation();
  }

  submitPaySlipEmailDefaults = () => {
    this.dispatcher.setPaySlipEmailDefaultsLoadingState(LoadingState.LOADING);

    const onSuccess = ({ message }) => {
      this.dispatcher.setPaySlipEmailDefaultsLoadingState(LoadingState.LOADING_SUCCESS);
      this.dispatcher.setAlert({
        message,
        type: 'success',
      });
    };
    const onFailure = ({ message }) => {
      this.dispatcher.setPaySlipEmailDefaultsLoadingState(LoadingState.LOADING_SUCCESS);
      this.dispatcher.setAlert({
        message,
        type: 'danger',
      });
    };

    this.integrator.submitPaySlipEmailDefaults({
      onSuccess,
      onFailure,
    });
  }

  resetState = () => {
    this.dispatcher.resetState();
  };

  redirectToModalUrl = () => {
    const state = this.store.getState();
    const url = getModalUrl(state);
    this.redirectToUrl(url);
    this.dispatcher.setIsPageEdited(false);
  }

  unsubscribeFromStore = () => {
    this.store.unsubscribeAll();
  }

  redirectToUrl = (url) => {
    if (url) {
      window.location.href = url;
    }
  }

  run(context) {
    this.dispatcher.setInitialState(context);
    this.store.subscribe(this.updateURLFromState);
    this.render();
    this.readMessages();

    this.setTab(getTab(this.store.getState()));
  }

  openUnsavedModal = (url) => {
    this.dispatcher.openModal({ type: ModalType.UNSAVED, url });
  }

  render = () => {
    const view = (
      <PayrollSettingsView
        onDismissAlert={this.dispatcher.dismissAlert}
        onSelectTab={this.setTab}
        superFundListeners={{
          onCreateButtonClick: this.redirectSuperannuationFundToCreateSuperFund,
          onUpdateFilterOptions: this.setSuperFundListFilterOptions,
          onSort: this.sortSuperFundList,
        }}
        generalPayrollInformationListeners={{
          onGeneralPayrollInformationChange: this.dispatcher.changeGeneralPayrollInformation,
          onUseTimesheetsChange: this.dispatcher.changeUseTimesheets,
          onGeneralPayrollInformationSave: this.saveGeneralPayrollInformation,
          onDismissModal: this.dispatcher.closeModal,
          onConfirmCancelButtonClick: this.redirectToModalUrl,
          onConfirmSave: this.saveGeneralPayrollInformation,
          onWarningConfirmSave: this.submitGeneralPayrollInformation,
          onCreateSuperFundClick: this.redirectGeneralSettingsToCreateSuperFund,
        }}
        employmentClassificationListeners={{
          onCreateButtonClick: this.openNewEmployeeClassificationDetailModal,
          onUpdateFilterOptions: this.setEmploymentClassificationListFilterOptions,
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
        paySlipEmailDefaultsListeners={{
          onPaySlipEmailDefaultsFieldChange: this.dispatcher.changePaySlipEmailDefaultsField,
          onPaySlipEmailDefaultsSave: this.submitPaySlipEmailDefaults,
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

  handlePageTransition = (url) => {
    const state = this.store.getState();
    if (getIsPageEdited(state)) {
      this.openUnsavedModal(url);
    } else {
      this.redirectToUrl(url);
    }
  }
}
