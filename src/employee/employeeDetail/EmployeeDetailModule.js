import { Provider } from 'react-redux';
import React from 'react';

import {
  SUCCESSFULLY_DELETED_EMPLOYEE,
  SUCCESSFULLY_SAVED_EMPLOYEE,
} from '../EmployeeMessageTypes';
import {
  getEmployeeDetailUrl,
  getEmployeeListUrl,
  getIsCreating,
  getModalUrl,
  getURLParams,
  isPageEdited,
} from './selectors/EmployeeDetailSelectors';
import { getIsDeductionPayItemModalCreating } from './selectors/DeductionPayItemModalSelectors';
import {
  getIsSuperPayItemModalCreating,
  getSuperPayItemModalFormattedAmount,
  getSuperPayItemModalFormattedPercentage,
  getUpdatedSuperPayItemModal,
  getUpdatedSuperPayItemModalForSave,
} from './selectors/SuperPayItemModalSelectors';
import EmployeeDetailView from './components/EmployeeDetailView';
import Store from '../../store/Store';
import createEmployeeDetailDispatcher from './createEmployeeDetailDispatcher';
import createEmployeeDetailIntegrator from './createEmployeeDetailIntegrator';
import employeeDetailReducer from './reducer/employeeDetailReducer';
import keyMap from '../../hotKeys/keyMap';
import setupHotKeys from '../../hotKeys/setupHotKeys';

const popMessageTypes = [
  SUCCESSFULLY_SAVED_EMPLOYEE,
];

export default class EmployeeDetailModule {
  constructor({
    integration,
    setRootView,
    popMessages,
    pushMessage,
    replaceURLParams,
  }) {
    this.integration = integration;
    this.setRootView = setRootView;
    this.store = new Store(employeeDetailReducer);
    this.replaceURLParams = replaceURLParams;
    this.popMessages = popMessages;
    this.pushMessage = pushMessage;
    this.popMessageTypes = popMessageTypes;
    this.dispatcher = createEmployeeDetailDispatcher(this.store);
    this.integrator = createEmployeeDetailIntegrator(this.store, integration);
  }

  openDeleteModal = () => {
    const state = this.store.getState();
    const url = getEmployeeListUrl(state);
    this.dispatcher.openModal({ type: 'delete', url });
  };

  openUnsavedModal = (url) => {
    this.dispatcher.openModal({ type: 'unsaved', url });
  };

  cancelEmployee = () => {
    const state = this.store.getState();

    const url = getEmployeeListUrl(state);
    if (isPageEdited(state)) {
      this.openUnsavedModal(url);
    } else {
      this.redirectToUrl(url);
    }
  };

  redirectToUrl = (url) => {
    if (url) {
      window.location.href = url;
    }
  }

  redirectToModalUrl = () => {
    const state = this.store.getState();
    const url = getModalUrl(state);

    this.redirectToUrl(url);
  };

  redirectToEmployeeList = () => {
    const state = this.store.getState();
    const url = getEmployeeListUrl(state);

    this.redirectToUrl(url);
  };

  redirectToReadEmployee = (employeeId) => {
    const state = this.store.getState();
    const url = getEmployeeDetailUrl(state, employeeId);

    this.redirectToUrl(url);
  };

  loadEmployeeDetails = () => {
    const onSuccess = (response) => {
      this.dispatcher.setLoadingState(false);
      this.dispatcher.loadEmployeeDetails(response);
    };

    const onFailure = () => {
      console.log('Failed to load employee detail');
    };

    this.integrator.loadEmployeeDetails({ onSuccess, onFailure });
  };

  createOrUpdateEmployee = (onSuccess) => {
    this.dispatcher.setSubmittingState(true);
    this.dispatcher.setLoadingState(true);

    const onFailure = (response) => {
      this.dispatcher.setSubmittingState(false);
      this.dispatcher.setLoadingState(false);
      this.dispatcher.setAlert({ type: 'danger', message: response.message });
    };

    this.integrator.createOrUpdateEmployee({ onSuccess, onFailure });
  };

  saveEmployee = () => {
    const onSuccess = (response) => {
      this.dispatcher.setSubmittingState(false);
      this.dispatcher.setLoadingState(false);

      const state = this.store.getState();
      const isCreating = getIsCreating(state);
      if (isCreating) {
        this.pushMessage({
          type: SUCCESSFULLY_SAVED_EMPLOYEE,
          content: response.message,
        });
        this.redirectToReadEmployee(response.employeeId);
      } else {
        this.dispatcher.setIsPageEdited(false);
        this.dispatcher.setAlert({
          type: 'success',
          message: response.message,
        });
      }
    };

    this.createOrUpdateEmployee(onSuccess);
  };

  deleteEmployee = () => {
    this.dispatcher.setSubmittingState(true);
    this.dispatcher.closeModal();

    const onSuccess = (response) => {
      this.dispatcher.setSubmittingState(false);
      this.pushMessage({
        type: SUCCESSFULLY_DELETED_EMPLOYEE,
        content: response.message,
      });
      this.redirectToEmployeeList();
    };

    const onFailure = (response) => {
      this.dispatcher.setSubmittingState(false);
      this.dispatcher.setAlert({ type: 'danger', message: response.message });
    };

    this.integrator.deleteEmployee({ onSuccess, onFailure });
  };

  saveUnsavedChanges = () => {
    const state = this.store.getState();
    const url = getModalUrl(state);
    this.dispatcher.closeModal();

    const onSuccess = (response) => {
      this.dispatcher.setSubmittingState(false);
      this.dispatcher.setLoadingState(false);
      this.pushMessage({
        type: SUCCESSFULLY_SAVED_EMPLOYEE,
        content: response.message,
      });

      this.redirectToUrl(url);
    };

    this.createOrUpdateEmployee(onSuccess);
  };

  openDeductionPayItemModal = (id) => {
    this.dispatcher.openDeductionPayItemModal(id);
    this.dispatcher.setDeductionPayItemModalLoadingState(true);

    const onSuccess = (response) => {
      this.dispatcher.setDeductionPayItemModalLoadingState(false);
      this.dispatcher.loadDeductionPayItemModal(response);
    };

    const onFailure = (response) => {
      this.dispatcher.closeDeductionPayItemModal();
      this.dispatcher.setAlert({ type: 'danger', message: response.message });
    };

    this.integrator.loadDeductionPayItemModal({ onSuccess, onFailure });
  }

  saveDeductionPayItemModal = () => {
    this.dispatcher.setDeductionPayItemModalLoadingState(true);
    this.dispatcher.setDeductionPayItemModalSubmittingState(true);

    const onSuccess = (response) => {
      const state = this.store.getState();
      const isCreating = getIsDeductionPayItemModalCreating(state);

      if (isCreating) {
        this.dispatcher.createDeductionPayItemModal(response);
      } else {
        this.dispatcher.updateDeductionPayItemModal(response);
      }
      this.dispatcher.closeDeductionPayItemModal();
      this.dispatcher.setAlert({ type: 'success', message: response.message });
    };

    const onFailure = ({ message }) => {
      this.dispatcher.setDeductionPayItemModalLoadingState(false);
      this.dispatcher.setDeductionPayItemModalSubmittingState(false);
      this.dispatcher.setDeductionPayItemModalAlert({ type: 'danger', message });
    };

    this.integrator.createOrUpdateDeductionPayItemModal({ onSuccess, onFailure });
  }

  openSuperPayItemModal = (id) => {
    this.dispatcher.openSuperPayItemModal(id);
    this.dispatcher.setSuperPayItemModalLoadingState(true);

    const onSuccess = (response) => {
      this.dispatcher.setSuperPayItemModalLoadingState(false);
      this.dispatcher.loadSuperPayItemModal(response);
    };

    const onFailure = (response) => {
      this.dispatcher.closeSuperPayItemModal();
      this.dispatcher.setAlert({ type: 'danger', message: response.message });
    };

    this.integrator.loadSuperPayItemModal({ onSuccess, onFailure });
  }

  saveSuperPayItemModal = () => {
    this.dispatcher.setSuperPayItemModalLoadingState(true);
    this.dispatcher.setSuperPayItemModalSubmittingState(true);

    const state = this.store.getState();
    const updatedSuperPayItem = getUpdatedSuperPayItemModalForSave(state);
    this.dispatcher.setSuperPayItemModalSuperPayItem(updatedSuperPayItem);

    const onSuccess = (response) => {
      const isCreating = getIsSuperPayItemModalCreating(state);
      if (isCreating) {
        this.dispatcher.createSuperPayItemModal(response);
      } else {
        this.dispatcher.updateSuperPayItemModal(response);
      }
      this.dispatcher.closeSuperPayItemModal();
      this.dispatcher.setAlert({ type: 'success', message: response.message });
    };

    const onFailure = (response) => {
      this.dispatcher.setSuperPayItemModalLoadingState(false);
      this.dispatcher.setSuperPayItemModalSubmittingState(false);
      this.dispatcher.setSuperPayItemModalAlert({ type: 'danger', message: response.message });
    };

    this.integrator.createOrUpdateSuperPayItemModal({ onSuccess, onFailure });
  }

  setSuperPayItemModalInput = ({ key, value }) => {
    this.dispatcher.setSuperPayItemModalInput({ key, value });

    if (key === 'contributionType') {
      const state = this.store.getState();

      const updatedSuperPayItem = getUpdatedSuperPayItemModal(state);
      this.dispatcher.setSuperPayItemModalSuperPayItem(updatedSuperPayItem);
    }
  }

  formatSuperPayItemDetailModalInput = ({ key, value }) => {
    if (['calculationBasisPercentage', 'limitPercentage'].includes(key)) {
      const formattedValue = getSuperPayItemModalFormattedPercentage(value);
      this.dispatcher.setSuperPayItemModalInput({ key, value: formattedValue });
    }

    if (['calculationBasisAmount', 'limitAmount', 'exclusion', 'threshold'].includes(key)) {
      const formattedValue = getSuperPayItemModalFormattedAmount(value);
      this.dispatcher.setSuperPayItemModalInput({ key, value: formattedValue });
    }
  }

  readMessages = () => {
    const [successMessage] = this.popMessages(this.popMessageTypes);

    if (successMessage) {
      const { content: message } = successMessage;
      this.dispatcher.setAlert({ type: 'success', message });
    }
  };

  loadTaxPayItemModal = () => {
    const onSuccess = (response) => {
      this.dispatcher.setTaxPayItemModalLoadingState(false);
      this.dispatcher.loadTaxPayItemModal(response);
    };

    const onFailure = ({ message }) => {
      this.dispatcher.setTaxPayItemModalLoadingState(false);
      this.dispatcher.closeTaxPayItemModal();
      this.dispatcher.setAlert({ type: 'danger', message });
    };

    this.dispatcher.setTaxPayItemModalLoadingState(true);
    this.dispatcher.openTaxPayItemModal();
    this.integrator.loadTaxPayItemModal({ onSuccess, onFailure });
  };

  saveTaxPayItemModal = () => {
    const onSuccess = ({ message }) => {
      this.dispatcher.closeTaxPayItemModal();
      this.dispatcher.setAlert({ type: 'success', message });
    };

    const onFailure = ({ message }) => {
      this.dispatcher.setTaxPayItemModalSubmitting(false);
      this.dispatcher.setTaxPayItemModalAlertMessage(message);
    };

    this.dispatcher.setTaxPayItemModalSubmitting(true);
    this.integrator.saveTaxPayItemModal({ onSuccess, onFailure });
  };

  loadSuperFundModal = () => {
    this.dispatcher.openSuperFundModal();
    this.dispatcher.setSuperFundModalLoadingState(true);

    const onSuccess = (response) => {
      this.dispatcher.setSuperFundModalLoadingState(false);
      this.dispatcher.loadSuperFundModal(response);
    };

    const onFailure = ({ message }) => {
      this.dispatcher.closeSuperFundModal();
      this.dispatcher.setAlert({ type: 'danger', message });
    };

    this.integrator.loadSuperFundModal({ onSuccess, onFailure });
  };

  lookUpAbn = () => {
    const state = this.store.getState();
    if (state.superFundModal.isAbnDirty) {
      this.loadAbnDetail();
    }
  };

  loadAbnDetail = () => {
    this.dispatcher.setAbnLoadingState(true);

    const onSuccess = ({ entityName }) => {
      this.dispatcher.setAbnLoadingState(false);
      this.dispatcher.loadAbnDetail(entityName);
    };

    const onFailure = ({ message }) => {
      this.dispatcher.setAbnLoadingState(false);
      this.dispatcher.setSuperFundModalAlertMessage(message);
      this.dispatcher.setAbnStatus(false);
    };

    this.integrator.loadAbnDetail({ onSuccess, onFailure });
  };

  saveSuperFundModal = () => {
    const onSuccess = (response) => {
      this.dispatcher.closeSuperFundModal();
      this.dispatcher.setAlert({ type: 'success', message: response.message });
      this.dispatcher.saveSuperFundModal(response);
    };

    const onFailure = ({ message }) => {
      this.dispatcher.setSuperFundModalLoadingState(false);
      this.dispatcher.setSuperFundModalSubmittingState(false);
      this.dispatcher.setSuperFundModalAlertMessage(message);
    };

    this.dispatcher.setSuperFundModalLoadingState(true);
    this.dispatcher.setSuperFundModalSubmittingState(true);
    this.integrator.saveSuperFundModal({ onSuccess, onFailure });
  };

  render = () => {
    const employeeDetailView = (
      <EmployeeDetailView
        onMainTabSelected={this.dispatcher.setMainTab}
        onSubTabSelected={this.dispatcher.setSubTab}
        onContactDetailsChange={this.dispatcher.updateContactDetails}
        onPaymentDetailsChange={this.dispatcher.updatePaymentDetails}
        onBankAccountDetailsChange={this.dispatcher.updateBankAccountDetails}
        onCancelButtonClick={this.cancelEmployee}
        onSaveButtonClick={this.saveEmployee}
        onDeleteButtonClick={this.openDeleteModal}
        onDismissAlert={this.dispatcher.dismissAlert}
        confirmModalListeners={{
          onConfirmClose: this.dispatcher.closeModal,
          onConfirmCancel: this.redirectToModalUrl,
          onConfirmSave: this.saveUnsavedChanges,
          onConfirmDelete: this.deleteEmployee,
        }}
        onEmploymentDetailsChange={this.dispatcher.updatePayrollEmploymentDetails}
        onEmploymentPaySlipDeliveryChange={this.dispatcher.updatePayrollEmploymentPaySlipDelivery}
        onAddPayrollDeductionPayItem={this.dispatcher.addPayrollDeductionPayItem}
        onRemovePayrollDeductionPayItem={this.dispatcher.removePayrollDeductionPayItem}
        onAddAllocatedLeaveItem={this.dispatcher.addAllocatedLeaveItem}
        onRemoveAllocatedLeaveItem={this.dispatcher.removeAllocatedLeaveItem}
        onUpdateAllocatedLeaveItemCarryOver={this.dispatcher.updateAllocatedLeaveItemCarryOver}
        onUpdatePayrollDetailSuperannuationDetails={
          this.dispatcher.updatePayrollDetailSuperannuationDetails
        }
        onAddPayrollSuperPayItem={this.dispatcher.addPayrollSuperPayItem}
        onRemovePayrollSuperPayItem={this.dispatcher.removePayrollSuperPayItem}
        onOpenDeductionPayItemModal={this.openDeductionPayItemModal}
        deductionPayItemModalListeners={{
          onDismissAlert: this.dispatcher.dismissDeductionPayItemModalAlert,
          onChange: this.dispatcher.setDeductionPayItemModalInput,
          onBlur: this.dispatcher.formatDeductionPayItemModalAmountInput,
          onAddItem: this.dispatcher.addDeductionPayItemModalItem,
          onRemoveItem: this.dispatcher.removeDeductionPayItemModalItem,
          onSave: this.saveDeductionPayItemModal,
          onCancel: this.dispatcher.closeDeductionPayItemModal,
        }}
        onOpenSuperFundModal={this.loadSuperFundModal}
        superFundModalListeners={{
          onUpdateSuperFundDetail: this.dispatcher.updateSuperFundDetail,
          onAbnLookUp: this.lookUpAbn,
          onUpdateSelfManagedFundAbn: this.dispatcher.updateSelfManagedFundAbn,
          onSelectSuperFund: this.dispatcher.selectSuperFund,
          onShowContactDetails: this.dispatcher.showContactDetails,
          onDismissAlert: this.dispatcher.dismissSuperFundModalAlertMessage,
          onSave: this.saveSuperFundModal,
          onCancel: this.dispatcher.closeSuperFundModal,
        }}
        onOpenSuperPayItemModal={this.openSuperPayItemModal}
        superPayItemModalListeners={{
          onDismissAlert: this.dispatcher.dismissSuperPayItemModalAlert,
          onChange: this.setSuperPayItemModalInput,
          onBlur: this.formatSuperPayItemDetailModalInput,
          onAddItem: this.dispatcher.addSuperPayItemModalItem,
          onRemoveItem: this.dispatcher.removeSuperPayItemModalItem,
          onSave: this.saveSuperPayItemModal,
          onCancel: this.dispatcher.closeSuperPayItemModal,
        }}
        onAddPayrollTaxPayItem={this.dispatcher.addPayrollTaxPayItem}
        onRemovePayrollTaxPayItem={this.dispatcher.removePayrollTaxPayItem}
        onPayrollTaxDetailsChange={this.dispatcher.updatePayrollTaxDetails}
        onPayrollTaxAmountBlur={this.dispatcher.formatAmountInput}
        onAddPayrollWagePayItem={this.dispatcher.addPayrollWagePayItem}
        onRemovePayrollWagePayItem={this.dispatcher.removePayrollWagePayItem}
        onPayrollWageDetailsChange={this.dispatcher.updatePayrollWageDetails}
        onPayrollWagePayBasisChange={this.dispatcher.updatePayrollWagePayBasis}
        onPayrollWageAnnualSalaryBlur={this.dispatcher.updatePayrollWageAnnualSalary}
        onPayrollWageHourlyRateBlur={this.dispatcher.updatePayrollWageHourlyRate}
        onPayrollWageHoursInPayCycleBlur={this.dispatcher.updatePayrollWageHoursInPayCycle}
        onPayrollWageSelectedPayCycleChange={this.dispatcher.updatePayrollWagePayCycle}
        onTaxPayItemClick={this.loadTaxPayItemModal}
        taxPayItemModalListeners={{
          onTaxPayItemModalDetailChange: this.dispatcher.updateTaxPayItemModalDetails,
          onTaxPayItemModalSaveButtonClick: this.saveTaxPayItemModal,
          onDismissTaxPayItemModalAlertMessage: this.dispatcher.dismissTaxPayItemModalAlertMessage,
          onCloseModal: this.dispatcher.closeTaxPayItemModal,
        }}
      />
    );

    const wrappedView = (
      <Provider store={this.store}>
        {employeeDetailView}
      </Provider>
    );
    this.setRootView(wrappedView);
  };

  unsubscribeFromStore = () => {
    this.store.unsubscribeAll();
  };

  updateURLFromState = state => this.replaceURLParams(getURLParams(state));

  handlers = {
    SAVE_ACTION: this.saveEmployee,
  };

  run(context) {
    this.dispatcher.setInitialState(context);
    this.store.subscribe(this.updateURLFromState);
    setupHotKeys(keyMap, this.handlers);
    this.render();
    this.readMessages();
    this.loadEmployeeDetails();
  }

  resetState = () => {
    this.dispatcher.resetState();
  };

  handlePageTransition = (url) => {
    const state = this.store.getState();
    if (isPageEdited(state)) {
      this.openUnsavedModal(url);
    } else {
      this.redirectToUrl(url);
    }
  }
}
