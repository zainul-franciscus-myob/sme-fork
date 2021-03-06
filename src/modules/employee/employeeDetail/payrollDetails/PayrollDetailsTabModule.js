import React from 'react';

import {
  getBaseHourlyWagePayItemId,
  getBaseSalaryWagePayItemId,
  getBaseWagePayItemIdByPayBasis,
  getIsBaseWagePayItemId,
  getIsSalaryByPayBasis,
  getIsWageDetailsInputChangedOnBlur,
  getPayPeriodHours,
} from './selectors/PayrollWageSelectors';
import { getBusinessId, getURLParams } from '../EmployeeDetailSelectors';
import {
  getCalculatedWagePayItemAmount,
  getIsAmountRuleApplied,
  getShouldResetPayrollStandardHourlyWagePayItems,
  getStandardPayFormattedAmount,
  getStandardPayItemsToApplyAmountRule,
  getStandardPayWageAmountRuleById,
  getStandardPayWageAmountRuleFromModal,
} from './selectors/PayrollStandardPaySelectors';
import {
  getCarryRemainingLeave,
  getIsActionDisabled as getIsLeavePayItemModalActionDisabled,
  getIsLeavePayItemModalCreating,
} from './selectors/LeavePayItemModalSelectors';
import {
  getFundType,
  getIsActionDisabled as getIsSuperFundModalActionDisabled,
} from './selectors/SuperFundModalSelectors';
import {
  getHasTfn,
  getTaxPayItemModalSubmitting,
  getTaxTableCalculations,
} from './selectors/PayrollTaxSelectors';
import {
  getIsActionDisabled as getIsDeductionPayItemModalActionDisabled,
  getIsDeductionPayItemModalCreating,
} from './selectors/DeductionPayItemModalSelectors';
import {
  getIsActionDisabled as getIsExpensePayItemModalActionDisabled,
  getIsExpensePayItemModalCreating,
} from './selectors/ExpensePayItemModalSelectors';
import {
  getIsActionDisabled as getIsSuperPayItemModalActionDisabled,
  getIsSuperPayItemModalCreating,
  getUpdatedSuperPayItemModal,
  getUpdatedSuperPayItemModalForSave,
} from './selectors/SuperPayItemModalSelectors';
import {
  getIsActionDisabled as getIsWagePayItemModalActionDisabled,
  getIsWagePayItemModalCreating,
} from './selectors/WagePayItemModalSelectors';
import EmployeeDetailPayrollDetails from './components/EmployeeDetailPayrollDetails';
import StsLoginModule from '../../../stsLogin/StsLoginModule';
import TaxTableCalculationModalModule from './taxTableCalculationModalModule/TaxTableCalculationModalModule';
import createPayrollDetailsTabDispatchers from './createPayrollDetailsTabDispatchers';
import createPayrollDetailsTabIntegrator from './createPayrollDetailsTabIntegrator';
import payItemTypes from '../payItemTypes';

export default class PayrollDetailsTabModule {
  constructor({
    integration,
    store,
    pushMessage,
    saveEmployee,
    featureToggles,
    replaceURLParams,
  }) {
    this.integration = integration;
    this.pushMessage = pushMessage;
    this.store = store;
    this.dispatcher = createPayrollDetailsTabDispatchers(store);
    this.integrator = createPayrollDetailsTabIntegrator(store, integration);
    this.subModules = {
      taxTableCalculationModal: new TaxTableCalculationModalModule({
        integration,
      }),
    };
    this.saveEmployee = saveEmployee;
    this.featureToggles = featureToggles;
    this.stsLoginModal = new StsLoginModule({
      integration,
      onLoggedIn: this.onLoggedIn,
      onCancel: this.closeModal,
    });
    this.replaceURLParams = replaceURLParams;
  }

  updatePayrollWagePayBasisAndStandardPayItems = ({ value }) => {
    this.dispatcher.updatePayrollWagePayBasis({ value });

    const state = this.store.getState();
    const payItemIdToAdd = getBaseWagePayItemIdByPayBasis(state, value);
    this.setStandardPayWagePayItem(payItemIdToAdd);

    const originalPayBasis = getIsSalaryByPayBasis(value) ? 'Hourly' : 'Salary';
    const payItemIdToRemove = getBaseWagePayItemIdByPayBasis(originalPayBasis);
    this.dispatcher.removePayrollStandardPayItem(payItemIdToRemove);
  };

  updatePayrollWageDetailsAndStandardPayItems = ({ key, value }) => {
    if (key === 'annualSalary') {
      // Update annualSalary and recalculate hourlyRate
      this.dispatcher.updatePayrollWageAnnualSalary({ value });
    }

    if (key === 'hourlyRate') {
      // Update hourlyRate and recalculate annualSalary
      this.dispatcher.updatePayrollWageHourlyRate({ value });
    }

    if (key === 'selectedPayCycle') {
      // Update selectedPayCycle and recalculate payPeriodHours
      // If Hourly, recalculate annualSalary
      // If Salary, recalculate hourlyRate
      this.dispatcher.updatePayrollWagePayCycle({ value });
    }

    if (key === 'payPeriodHours') {
      // Update payPeriodHours and recalculate based on condition
      // If Hourly, recalculate annualSalary
      // If Salary, recalculate hourlyRate
      this.dispatcher.updatePayrollWageHoursInPayCycle({ value });
    }

    const state = this.store.getState();
    const isInputChanged = getIsWageDetailsInputChangedOnBlur(state, key);

    // Standard pay item 'Base Salary' and 'Base Hourly' wage pay item hours
    // must be updated and have its amount recalculated
    // upon any action that cause payPeriodHours to be updated.
    if (isInputChanged) {
      this.setStandardPayWagePayItem(getBaseSalaryWagePayItemId(state));
      this.setStandardPayWagePayItem(getBaseHourlyWagePayItemId(state));
    }

    // Standard pay item of pay basis type Hourly have its amount recalculated
    // upon any action that cause annualSalary to be updated.
    if (
      isInputChanged &&
      getShouldResetPayrollStandardHourlyWagePayItems(state, key)
    ) {
      this.resetPayrollStandardPayHourlyWagePayItemAmount();
    }

    this.dispatcher.updatePayrollWageAppliedDetails();
  };

  addPayrollWagePayItem = (payItem) => {
    this.dispatcher.addPayrollWagePayItem(payItem);

    const { id } = payItem;
    const state = this.store.getState();
    const isBaseWagePayItemId = getIsBaseWagePayItemId(state, id);
    if (isBaseWagePayItemId) {
      this.setStandardPayWagePayItem(id);
    }
  };

  removePayrollWagePayItemAndStandardPayItem = (id) => {
    this.dispatcher.removePayrollWagePayItem(id);
    this.dispatcher.removePayrollStandardPayItem(id);
  };

  removePayrollDeductionPayItemAndStandardPayItem = (id) => {
    this.dispatcher.removePayrollDeductionPayItem(id);
    this.dispatcher.removePayrollStandardPayItem(id);
  };

  removePayrollSuperPayItemAndStandardPayItem = (id) => {
    this.dispatcher.removePayrollSuperPayItem(id);
    this.dispatcher.removePayrollStandardPayItem(id);
  };

  loadPayrollStandardPayWageAmountRule = (payItemId) => {
    const onSuccess = (response) => {
      this.dispatcher.setSubmittingState(false);
      this.dispatcher.setPayrollStandardPayItemIsLoadingState(payItemId, false);
      this.dispatcher.loadPayrollStandardPayWageAmountRule(payItemId, response);
      this.applyPayrollStandardPayAmountRule(payItemId, response);
    };

    const onFailure = ({ message }) => {
      this.dispatcher.setSubmittingState(false);
      this.dispatcher.setPayrollStandardPayItemIsLoadingState(payItemId, false);
      this.dispatcher.setAlert({ type: 'danger', message });
    };

    this.dispatcher.setSubmittingState(true);
    this.dispatcher.setPayrollStandardPayItemIsLoadingState(payItemId, true);
    this.integrator.loadPayrollStandardPayWageAmountRule({
      payItemId,
      onSuccess,
      onFailure,
    });
  };

  formatPayrollStandardPayItemInputAndApplyAmountRule = ({
    payItemId,
    payItemType,
    key,
    value,
  }) => {
    this.dispatcher.setPayrollStandardPayItemInput({ payItemId, key, value });

    if (key === 'hours') {
      const state = this.store.getState();
      const isRuleApplied = getIsAmountRuleApplied(state, {
        payItemId,
        payItemType,
        value,
      });

      if (isRuleApplied) {
        const formattedDefaultHours = getStandardPayFormattedAmount(0);
        if (value === formattedDefaultHours) {
          this.dispatcher.setPayrollStandardPayItemInput({
            payItemId,
            key: 'amount',
            value: formattedDefaultHours,
          });
        } else {
          this.loadAndApplyStandardPayAmountRule(payItemId);
        }
      }

      this.dispatcher.setPayrollStandardPayItemInput({
        payItemId,
        key: 'appliedHours',
        value,
      });
    }
  };

  loadAndApplyStandardPayAmountRule = (payItemId) => {
    const state = this.store.getState();
    const wageAmountRule = getStandardPayWageAmountRuleById(state, payItemId);
    if (wageAmountRule) {
      this.applyPayrollStandardPayAmountRule(payItemId, wageAmountRule);
    } else {
      this.loadPayrollStandardPayWageAmountRule(payItemId);
    }
  };

  applyPayrollStandardPayAmountRule = (payItemId, wageAmountRule) => {
    const state = this.store.getState();
    const amount = getCalculatedWagePayItemAmount(
      state,
      payItemId,
      wageAmountRule
    );
    this.dispatcher.setPayrollStandardPayItemInput({
      payItemId,
      key: 'amount',
      value: amount,
    });
  };

  setStandardPayWagePayItem = (payItemId) => {
    const state = this.store.getState();
    const payPeriodHours = getPayPeriodHours(state);
    this.dispatcher.setPayrollStandardPayItemInput({
      payItemId,
      key: 'hours',
      value: payPeriodHours,
    });
    this.dispatcher.setPayrollStandardPayItemInput({
      payItemId,
      key: 'appliedHours',
      value: payPeriodHours,
    });

    this.loadAndApplyStandardPayAmountRule(payItemId);
  };

  resetPayrollStandardPayHourlyWagePayItemAmount = () => {
    const state = this.store.getState();
    const standardPayItems = getStandardPayItemsToApplyAmountRule(state);
    standardPayItems.forEach(({ payItemId }) => {
      this.loadAndApplyStandardPayAmountRule(payItemId);
    });
  };

  onOpenWagePayItemModal = (id) => {
    this.dispatcher.openWagePayItemModal(id);
    this.dispatcher.setWagePayItemModalLoadingState(true);

    const onSuccess = (response) => {
      this.dispatcher.setWagePayItemModalLoadingState(false);
      this.dispatcher.loadWagePayItemModal(response);

      if (
        !getIsWagePayItemModalCreating(this.store.getState()) &&
        this.featureToggles.isJobKeeperTabEnabled
      ) {
        this.dispatcher.markAsJobKeeper();
      }
    };

    const onFailure = (response) => {
      this.dispatcher.closeWagePayItemModal();
      this.dispatcher.setAlert({ type: 'danger', message: response.message });
    };

    this.integrator.loadWagePayItemModal({ onSuccess, onFailure });
  };

  saveWagePayItemModal = () => {
    if (getIsWagePayItemModalActionDisabled(this.store.getState())) return;

    this.dispatcher.setWagePayItemModalLoadingState(true);
    this.dispatcher.setWagePayItemModalSubmittingState(true);

    const onSuccess = (response) => {
      const state = this.store.getState();
      const isCreating = getIsWagePayItemModalCreating(state);

      if (isCreating) {
        this.dispatcher.createWagePayItemModal(response);
      } else {
        this.dispatcher.updateWagePayItemModal(response);
      }

      const {
        wagePayItem: { id },
      } = response;
      const wageAmountRule = getStandardPayWageAmountRuleFromModal(state);
      this.dispatcher.loadPayrollStandardPayWageAmountRule(id, wageAmountRule);
      this.applyPayrollStandardPayAmountRule(id, wageAmountRule);

      this.dispatcher.closeWagePayItemModal();
      this.dispatcher.setAlert({ type: 'success', message: response.message });
    };

    const onFailure = ({ message }) => {
      this.dispatcher.setWagePayItemModalLoadingState(false);
      this.dispatcher.setWagePayItemModalSubmittingState(false);
      this.dispatcher.setWagePayItemModalAlert({ type: 'danger', message });
    };

    this.integrator.createOrUpdateWagePayItemModal({ onSuccess, onFailure });
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
  };

  saveExpensePayItemModal = () => {
    if (getIsExpensePayItemModalActionDisabled(this.store.getState())) return;

    this.dispatcher.setExpensePayItemModalLoadingState(true);
    this.dispatcher.setExpensePayItemModalSubmittingState(true);

    const onSuccess = (response) => {
      const state = this.store.getState();
      const isCreating = getIsExpensePayItemModalCreating(state);

      if (isCreating) {
        this.dispatcher.createExpensePayItemModal(response);
      } else {
        this.dispatcher.updateExpensePayItemModal(response);
      }

      this.dispatcher.closeExpensePayItemModal();
      this.dispatcher.setAlert({ type: 'success', message: response.message });
    };

    const onFailure = ({ message }) => {
      this.dispatcher.setExpensePayItemModalLoadingState(false);
      this.dispatcher.setExpensePayItemModalSubmittingState(false);
      this.dispatcher.setExpensePayItemModalAlert({ type: 'danger', message });
    };

    this.integrator.createOrUpdateExpensePayItemModal({ onSuccess, onFailure });
  };

  openExpensePayItemModal = (id) => {
    this.dispatcher.openExpensePayItemModal(id);
    this.dispatcher.setExpensePayItemModalLoadingState(true);

    const onSuccess = (response) => {
      this.dispatcher.setExpensePayItemModalLoadingState(false);
      this.dispatcher.loadExpensePayItemModal(response);
    };

    const onFailure = (response) => {
      this.dispatcher.closeExpensePayItemModal();
      this.dispatcher.setAlert({ type: 'danger', message: response.message });
    };

    this.integrator.loadExpensePayItemModal({ onSuccess, onFailure });
  };

  saveDeductionPayItemModal = () => {
    if (getIsDeductionPayItemModalActionDisabled(this.store.getState())) return;

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
      this.dispatcher.setDeductionPayItemModalAlert({
        type: 'danger',
        message,
      });
    };

    this.integrator.createOrUpdateDeductionPayItemModal({
      onSuccess,
      onFailure,
    });
  };

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
  };

  saveSuperPayItemModal = () => {
    if (getIsSuperPayItemModalActionDisabled(this.store.getState())) return;

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
      this.dispatcher.setSuperPayItemModalAlert({
        type: 'danger',
        message: response.message,
      });
    };

    this.integrator.createOrUpdateSuperPayItemModal({ onSuccess, onFailure });
  };

  openPayItemModal = ({ payItemId, payItemType }) => {
    switch (payItemType) {
      case payItemTypes.tax:
        this.loadTaxPayItemModal();
        break;
      case payItemTypes.deduction:
        this.openDeductionPayItemModal(payItemId);
        break;
      case payItemTypes.expense:
        this.openExpensePayItemModal(payItemId);
        break;
      case payItemTypes.superDeductionBeforeTax:
      case payItemTypes.superDeductionAfterTax:
      case payItemTypes.superExpense:
        this.openSuperPayItemModal(payItemId);
        break;
      case payItemTypes.entitlement:
        this.openLeavePayItemModal(payItemId);
        break;
      case payItemTypes.wages:
        this.onOpenWagePayItemModal(payItemId);
        break;
      default:
        break;
    }
  };

  openTerminationConfirmModal = () => {
    this.dispatcher.setTerminationConfirmModal(true);
  };

  setSuperPayItemModalInput = ({ key, value }) => {
    this.dispatcher.setSuperPayItemModalInput({ key, value });

    if (key === 'contributionType') {
      const state = this.store.getState();

      const updatedSuperPayItem = getUpdatedSuperPayItemModal(state);
      this.dispatcher.setSuperPayItemModalSuperPayItem(updatedSuperPayItem);
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
    if (getTaxPayItemModalSubmitting(this.store.getState())) return;

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

  onLoggedIn = (accessToken) => {
    this.dispatcher.setAccessToken(accessToken);
    this.saveSuperFundModal();
  };

  validateAcessTokenAndSave = () => {
    const state = this.store.getState();

    if (getFundType(state) === 'SelfManagedSuperFund') {
      this.stsLoginModal.run({ businessId: state.businessId });
    } else {
      this.saveSuperFundModal();
    }
  };

  saveSuperFundModal = () => {
    if (getIsSuperFundModalActionDisabled(this.store.getState())) return;

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

  removeAllocatedLeaveItem = (payItemId) => {
    this.dispatcher.removeAllocatedLeaveItem(payItemId);
    this.dispatcher.closeAllocatedLeaveItemModal();
    this.dispatcher.removePayrollStandardPayItem(payItemId);
  };

  openLeavePayItemModal = (id) => {
    this.dispatcher.openLeavePayItemModal(id);
    this.dispatcher.setLeavePayItemModalLoadingState(true);

    const onSuccess = (response) => {
      this.dispatcher.setLeavePayItemModalLoadingState(false);
      this.dispatcher.loadLeavePayItem(response);
    };

    const onFailure = ({ message }) => {
      this.dispatcher.closeLeavePayItemModal();
      this.dispatcher.setAlert({ type: 'danger', message });
    };

    this.integrator.loadLeavePayItem({ onSuccess, onFailure });
  };

  saveLeavePayItem = () => {
    if (getIsLeavePayItemModalActionDisabled(this.store.getState())) return;

    this.dispatcher.setLeavePayItemModalLoadingState(true);
    this.dispatcher.setLeavePayItemModalSubmittingState(true);

    const onSuccess = (response) => {
      const state = this.store.getState();
      const isCreating = getIsLeavePayItemModalCreating(state);
      const carryLeaveOverToNextYear = getCarryRemainingLeave(state);
      const leavePayItem = response
        ? { ...response.leavePayItem, carryLeaveOverToNextYear }
        : { carryLeaveOverToNextYear };
      const integratedResponse = { ...response, leavePayItem };
      if (isCreating) {
        this.dispatcher.createLeavePayItem(integratedResponse);
      } else {
        this.dispatcher.updateLeavePayItem(integratedResponse);
      }
      this.dispatcher.closeLeavePayItemModal();
      this.dispatcher.setAlert({ type: 'success', message: response.message });
    };

    const onFailure = ({ message }) => {
      this.dispatcher.setLeavePayItemModalLoadingState(false);
      this.dispatcher.setLeavePayItemModalSubmittingState(false);
      this.dispatcher.setLeavePayItemModalAlert({ type: 'danger', message });
    };

    this.integrator.saveLeavePayItem({ onSuccess, onFailure });
  };

  onTfnModalLinkClick = () => {
    const state = this.store.getState();
    const context = {
      businessId: getBusinessId(state),
      hasTFN: getHasTfn(state),
      ...getTaxTableCalculations(state),
    };

    const onModalSave = ({ taxTableId, withholdingVariation }) => {
      this.dispatcher.updatePayrollTaxDetails({
        key: 'taxTableId',
        value: taxTableId,
      });
      if (withholdingVariation) {
        this.dispatcher.updatePayrollTaxDetails({
          key: 'withholdingVariationRate',
          value: withholdingVariation,
        });
      }
    };

    this.subModules.taxTableCalculationModal.open(context, onModalSave);
  };

  closeTerminationConfirmModal = () => {
    this.dispatcher.setTerminationConfirmModal(false);
  };

  onTerminationConfirmModalSave = () => {
    this.closeTerminationConfirmModal();
    this.saveEmployee();
  };

  selectSubTab = (selectedTab) => {
    this.dispatcher.setSubTab(selectedTab);
    const state = this.store.getState();
    this.replaceURLParams(getURLParams(state));
  };

  getView() {
    const stsLoginModal = this.stsLoginModal.getView();
    const taxTableCalculationModal = this.subModules.taxTableCalculationModal.render();
    return (
      <>
        {stsLoginModal}
        {taxTableCalculationModal}
        <EmployeeDetailPayrollDetails
          onSubTabSelected={this.selectSubTab}
          onEmploymentDetailsChange={
            this.dispatcher.updatePayrollEmploymentDetails
          }
          onEmploymentPaySlipDeliveryChange={
            this.dispatcher.updatePayrollEmploymentPaySlipDelivery
          }
          onRemovePayrollExpensePayItem={
            this.dispatcher.removePayrollExpensePayItem
          }
          onAddPayrollExpensePayItem={this.dispatcher.addPayrollExpensePayItem}
          onOpenExpensePayItemModal={this.openExpensePayItemModal}
          onAddPayrollDeductionPayItem={
            this.dispatcher.addPayrollDeductionPayItem
          }
          onAddPayItemComboBlur={this.dispatcher.showAddPayItemButton}
          onAddPayItemComboClick={this.dispatcher.showAddPayItemDropdown}
          onRemovePayrollDeductionPayItem={
            this.removePayrollDeductionPayItemAndStandardPayItem
          }
          onPayrollLeaveListeners={{
            onAddAllocatedLeaveItem: this.dispatcher.addAllocatedLeaveItem,
            onRemoveAllocatedLeaveItem: this.dispatcher
              .openAllocatedLeaveItemModal,
            onConfirmRemoveAllocatedLeaveItem: this.removeAllocatedLeaveItem,
            onConfirmCancelAllocatedLeaveItem: this.dispatcher
              .closeAllocatedLeaveItemModal,
            onUpdateBalanceItemAdjustment: this.dispatcher
              .updateBalanceItemAdjustment,
            onOpenLeavePayItemModal: this.openLeavePayItemModal,
          }}
          onPayrollStandardPayListeners={{
            onDetailChange: this.dispatcher
              .setPayrollStandardPayDetailsItemInput,
            onPayItemChange: this.dispatcher.setPayrollStandardPayItemInput,
            onPayItemBlur: this
              .formatPayrollStandardPayItemInputAndApplyAmountRule,
            onPayItemClick: this.openPayItemModal,
          }}
          onPayrollPayHistoryListeners={{
            onFilterChange: this.dispatcher.setPayrollPayHistoryFilterOptions,
            onPayItemChange: this.dispatcher.setPayrollPayHistoryItemInput,
            onPayItemClick: this.openPayItemModal,
          }}
          onUpdatePayrollDetailSuperannuationDetails={
            this.dispatcher.updatePayrollDetailSuperannuationDetails
          }
          onAddPayrollSuperPayItem={this.dispatcher.addPayrollSuperPayItem}
          onRemovePayrollSuperPayItem={
            this.removePayrollSuperPayItemAndStandardPayItem
          }
          onOpenDeductionPayItemModal={this.openDeductionPayItemModal}
          wagePayItemModalListeners={{
            onDetailsChange: this.dispatcher.updateWagePayItemModalDetails,
            onOverrideAccountChange: this.dispatcher
              .updateWagePayItemModalOverrideAccount,
            onEmployeeSelected: this.dispatcher
              .addWagePayItemModalEmployeeToSelectedList,
            onRemoveEmployee: this.dispatcher
              .removeWagePayItemModalEmployeeFromSelectedList,
            onExemptionSelected: this.dispatcher
              .addWagePayItemModalExemptionToSelectedList,
            onRemoveExemption: this.dispatcher
              .removeWagePayItemModalExemptionFromSelectedList,
            onSave: this.saveWagePayItemModal,
            onCancel: this.dispatcher.closeWagePayItemModal,
            onDismissAlert: this.dispatcher.dismissWagePayItemModalAlert,
            featureToggles: this.featureToggles,
            onJobKeeperChange: this.dispatcher.toggleJobKeeper,
          }}
          expensePayItemModalListeners={{
            onDismissAlert: this.dispatcher.dismissExpensePayItemModalAlert,
            onSave: this.saveExpensePayItemModal,
            onCancel: this.dispatcher.closeExpensePayItemModal,
            onChangeExpensePayItemInput: this.dispatcher
              .changeExpensePayItemModalAlert,
            onAddAllocatedEmployee: this.dispatcher
              .addExpensePayItemModalAllocatedEmployee,
            onRemoveAllocatedEmployee: this.dispatcher
              .removeExpensePayItemModalAllocatedEmployee,
            onAddExemptionPayItem: this.dispatcher
              .addExpensePayItemModalExemptionPayItem,
            onRemoveExemptionPayItem: this.dispatcher
              .removeExpensePayItemModalExemptionPayItem,
          }}
          onOpenWagePayItemModal={this.onOpenWagePayItemModal}
          deductionPayItemModalListeners={{
            onDismissAlert: this.dispatcher.dismissDeductionPayItemModalAlert,
            onChange: this.dispatcher.setDeductionPayItemModalInput,
            onAddItem: this.dispatcher.addDeductionPayItemModalItem,
            onRemoveItem: this.dispatcher.removeDeductionPayItemModalItem,
            onSave: this.saveDeductionPayItemModal,
            onCancel: this.dispatcher.closeDeductionPayItemModal,
          }}
          onOpenSuperFundModal={this.loadSuperFundModal}
          superFundModalListeners={{
            onUpdateSuperFundDetail: this.dispatcher.updateSuperFundDetail,
            onAbnLookUp: this.lookUpAbn,
            onUpdateSelfManagedFundAbn: this.dispatcher
              .updateSelfManagedFundAbn,
            onSelectSuperFund: this.dispatcher.selectSuperFund,
            onShowContactDetails: this.dispatcher.showContactDetails,
            onDismissAlert: this.dispatcher.dismissSuperFundModalAlertMessage,
            onSave: this.validateAcessTokenAndSave,
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
          leavePayItemModalListeners={{
            onDismissAlert: this.dispatcher.dismissLeavePayItemModalAlert,
            onSave: this.saveLeavePayItem,
            onCancel: this.dispatcher.closeLeavePayItemModal,
            onAddEmployee: this.dispatcher.addLeavePayItemModalEmployee,
            onRemoveEmployee: this.dispatcher.removeLeavePayItemModalEmployee,
            onAddExemption: this.dispatcher.addLeavePayItemModalExemption,
            onRemoveExemption: this.dispatcher.removeLeavePayItemModalExemption,
            onAddLinkedWage: this.dispatcher.addLeavePayItemModalLinkedWage,
            onRemoveLinkedWage: this.dispatcher
              .removeLeavePayItemModalLinkedWage,
            onNameChange: this.dispatcher.updateLeavePayItemModalName,
            onCalculationBasisChange: this.dispatcher
              .updateLeavePayItemModalCalculationBasis,
          }}
          onAddPayrollTaxPayItem={this.dispatcher.addPayrollTaxPayItem}
          onRemovePayrollTaxPayItem={this.dispatcher.removePayrollTaxPayItem}
          onPayrollTaxDetailsChange={this.dispatcher.updatePayrollTaxDetails}
          onTaxFileNumberStatusChange={
            this.dispatcher.updateTaxFileNumberStatus
          }
          onAddPayrollWagePayItem={this.addPayrollWagePayItem}
          onRemovePayrollWagePayItem={
            this.removePayrollWagePayItemAndStandardPayItem
          }
          onPayrollWageDetailsChange={this.dispatcher.updatePayrollWageDetails}
          onPayrollWagePayBasisChange={
            this.updatePayrollWagePayBasisAndStandardPayItems
          }
          onPayrollWageAnnualSalaryBlur={
            this.updatePayrollWageDetailsAndStandardPayItems
          }
          onPayrollWageHourlyRateBlur={
            this.updatePayrollWageDetailsAndStandardPayItems
          }
          onPayrollWageHoursInPayCycleBlur={
            this.updatePayrollWageDetailsAndStandardPayItems
          }
          onPayrollWageSelectedPayCycleChange={
            this.updatePayrollWageDetailsAndStandardPayItems
          }
          onTaxPayItemClick={this.loadTaxPayItemModal}
          taxPayItemModalListeners={{
            onTaxPayItemModalDetailChange: this.dispatcher
              .updateTaxPayItemModalDetails,
            onTaxPayItemModalSaveButtonClick: this.saveTaxPayItemModal,
            onDismissTaxPayItemModalAlertMessage: this.dispatcher
              .dismissTaxPayItemModalAlertMessage,
            onCloseModal: this.dispatcher.closeTaxPayItemModal,
          }}
          onTfnModalLinkClick={this.onTfnModalLinkClick}
          terminationConfirmModalListeners={{
            onCancel: this.closeTerminationConfirmModal,
            onSave: this.onTerminationConfirmModalSave,
          }}
        />
      </>
    );
  }
}
