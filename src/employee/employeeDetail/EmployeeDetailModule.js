import { Provider } from 'react-redux';
import React from 'react';

import {
  SUCCESSFULLY_DELETED_EMPLOYEE,
  SUCCESSFULLY_SAVED_EMPLOYEE,
} from '../EmployeeMessageTypes';
import {
  getBusinessId,
  getIsCreating,
  getRegion,
  getURLParams,
  getUseUnsavedModal,
  isPageEdited,
} from './selectors/EmployeeDetailSelectors';
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
    this.dispatcher.openModal('delete');
  };

  openCancelModal = () => {
    const state = this.store.getState();

    if (isPageEdited(state)) {
      if (getUseUnsavedModal(state)) {
        this.dispatcher.openModal('unsaved');
      } else {
        this.dispatcher.openModal('cancel');
      }
    } else {
      this.redirectToEmployeeList();
    }
  };

  openTaxPayItemModal = () => {
    this.dispatcher.openModal('taxPayItem');
  };

  redirectToEmployeeList = () => {
    const state = this.store.getState();
    const businessId = getBusinessId(state);
    const region = getRegion(state);

    window.location.href = `/#/${region}/${businessId}/employee`;
  };

  redirectToReadEmployee = (employeeId) => {
    const state = this.store.getState();
    const businessId = getBusinessId(state);
    const region = getRegion(state);

    window.location.href = `/#/${region}/${businessId}/employee/${employeeId}`;
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

    const onFailure = (response) => {
      this.dispatcher.setSubmittingState(false);
      this.dispatcher.setAlert({ type: 'danger', message: response.message });
    };

    this.integrator.createOrUpdateEmployee({ onSuccess, onFailure });
  };

  saveEmployee = () => {
    const onSuccess = (response) => {
      this.dispatcher.setSubmittingState(false);

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
    this.dispatcher.closeModal();

    const onSuccess = (response) => {
      this.dispatcher.setSubmittingState(false);
      this.pushMessage({
        type: SUCCESSFULLY_SAVED_EMPLOYEE,
        content: response.message,
      });
      this.redirectToEmployeeList();
    };

    this.createOrUpdateEmployee(onSuccess);
  };

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
      this.dispatcher.closeModal();
      this.dispatcher.setAlert({ type: 'danger', message });
    };

    this.dispatcher.setTaxPayItemModalLoadingState(true);
    this.openTaxPayItemModal();
    this.integrator.loadTaxPayItemModal({ onSuccess, onFailure });
  };

  saveTaxPayItemModal = () => {
    const onSuccess = ({ message }) => {
      this.dispatcher.closeModal();
      this.dispatcher.setTaxPayItemModalSubmitting(false);
      this.dispatcher.setAlert({ type: 'success', message });
    };

    const onFailure = ({ message }) => {
      this.dispatcher.setTaxPayItemModalSubmitting(false);
      this.dispatcher.setTaxPayItemModalAlertMessage(message);
    };

    this.dispatcher.setTaxPayItemModalSubmitting(true);
    this.integrator.saveTaxPayItemModal({ onSuccess, onFailure });
  };

  render = () => {
    const employeeDetailView = (
      <EmployeeDetailView
        onMainTabSelected={this.dispatcher.setMainTab}
        onSubTabSelected={this.dispatcher.setSubTab}
        onContactDetailsChange={this.dispatcher.updateContactDetails}
        onPaymentDetailsChange={this.dispatcher.updatePaymentDetails}
        onBankAccountDetailsChange={this.dispatcher.updateBankAccountDetails}
        onCancelButtonClick={this.openCancelModal}
        onSaveButtonClick={this.saveEmployee}
        onDeleteButtonClick={this.openDeleteModal}
        onDismissAlert={this.dispatcher.dismissAlert}
        onCloseModal={this.dispatcher.closeModal}
        onCancelModal={this.redirectToEmployeeList}
        onSaveModal={this.saveUnsavedChanges}
        onDeleteModal={this.deleteEmployee}
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
        onAddPayrollTaxPayItem={this.dispatcher.addPayrollTaxPayItem}
        onRemovePayrollTaxPayItem={this.dispatcher.removePayrollTaxPayItem}
        onPayrollTaxDetailsChange={this.dispatcher.updatePayrollTaxDetails}
        onPayrollTaxAmountBlur={this.dispatcher.formatAmountInput}
        onTaxPayItemClick={this.loadTaxPayItemModal}
        onTaxPayItemModalDetailChange={this.dispatcher.updateTaxPayItemModalDetails}
        onTaxPayItemModalSaveButtonClick={this.saveTaxPayItemModal}
        onDismissTaxPayItemModalAlertMessage={this.dispatcher.dismissTaxPayItemModalAlertMessage}
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
}
