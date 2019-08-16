import {
  Alert,
  Spinner,
  StandardTemplate,
  Tabs,
} from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';

import {
  getAlert,
  getIsLoading,
  getMainTab, getModal,
  getPageHeadTitle,
} from '../selectors/EmployeeDetailSelectors';
import { mainTabIds, mainTabItems } from '../tabItems';
import ConfirmModal from './ConfirmModal';
import EmployeeDetailActions from './EmployeeDetailActions';
import EmployeeDetailContactDetails from './EmployeeDetailContactDetails';
import EmployeeDetailPaymentDetails from './EmployeeDetailPaymentDetails';
import EmployeeDetailPayrollDetails from './EmployeeDetailPayrollDetails';

const EmployeeDetailView = ({
  selectedTab,
  onMainTabSelected,
  onSubTabSelected,
  isLoading,
  onContactDetailsChange,
  onPaymentDetailsChange,
  onBankAccountDetailsChange,
  onCancelButtonClick,
  onSaveButtonClick,
  onDeleteButtonClick,
  alert,
  onDismissAlert,
  modal,
  confirmModalListeners,
  taxPayItemModalListeners,
  deductionPayItemModalListeners,
  pageHeadTitle,
  onEmploymentDetailsChange,
  onEmploymentPaySlipDeliveryChange,
  onAddPayrollDeductionPayItem,
  onRemovePayrollDeductionPayItem,
  onUpdatePayrollDetailSuperannuationDetails,
  onAddPayrollSuperPayItem,
  onRemovePayrollSuperPayItem,
  onAddPayrollTaxPayItem,
  onRemovePayrollTaxPayItem,
  onPayrollTaxDetailsChange,
  onPayrollTaxAmountBlur,
  onPayrollWageDetailsChange,
  onAddPayrollWagePayItem,
  onRemovePayrollWagePayItem,
  onPayrollWagePayBasisChange,
  onPayrollWageAnnualSalaryBlur,
  onPayrollWageHourlyRateBlur,
  onPayrollWageHoursInPayCycleBlur,
  onPayrollWageSelectedPayCycleChange,
  onOpenDeductionPayItemModal,
  wagePayItemModalListeners,
  onOpenWagePayItemModal,
  onTaxPayItemClick,
  onPayrollLeaveListeners,
  onOpenSuperFundModal,
  superFundModalListeners,
  onOpenSuperPayItemModal,
  superPayItemModalListeners,
}) => {
  const Content = {
    [mainTabIds.contactDetails]: EmployeeDetailContactDetails,
    [mainTabIds.paymentDetails]: EmployeeDetailPaymentDetails,
    [mainTabIds.payrollDetails]: EmployeeDetailPayrollDetails,
  }[selectedTab];

  const subHeadTabs = (
    <Tabs
      items={mainTabItems}
      selected={selectedTab}
      onSelected={onMainTabSelected}
    />
  );

  const actions = (
    <EmployeeDetailActions
      onCancelButtonClick={onCancelButtonClick}
      onSaveButtonClick={onSaveButtonClick}
      onDeleteButtonClick={onDeleteButtonClick}
    />
  );

  const alertComponent = alert && (
    <Alert type={alert.type} onDismiss={onDismissAlert}>
      {alert.message}
    </Alert>
  );

  const modalComponent = modal && (
    <ConfirmModal
      modal={modal}
      confirmModalListeners={confirmModalListeners}
    />
  );

  const contentProps = {
    onSubTabSelected,
    onContactDetailsChange,
    onEmploymentDetailsChange,
    onEmploymentPaySlipDeliveryChange,
    onPaymentDetailsChange,
    onBankAccountDetailsChange,
    onAddPayrollDeductionPayItem,
    onRemovePayrollDeductionPayItem,
    onPayrollLeaveListeners,
    onUpdatePayrollDetailSuperannuationDetails,
    onAddPayrollSuperPayItem,
    onRemovePayrollSuperPayItem,
    onOpenDeductionPayItemModal,
    wagePayItemModalListeners,
    onOpenWagePayItemModal,
    deductionPayItemModalListeners,
    onAddPayrollTaxPayItem,
    onRemovePayrollTaxPayItem,
    onPayrollTaxDetailsChange,
    onPayrollTaxAmountBlur,
    onPayrollWageDetailsChange,
    onAddPayrollWagePayItem,
    onRemovePayrollWagePayItem,
    onPayrollWagePayBasisChange,
    onPayrollWageAnnualSalaryBlur,
    onPayrollWageHourlyRateBlur,
    onPayrollWageHoursInPayCycleBlur,
    onPayrollWageSelectedPayCycleChange,
    onTaxPayItemClick,
    taxPayItemModalListeners,
    onOpenSuperFundModal,
    superFundModalListeners,
    onOpenSuperPayItemModal,
    superPayItemModalListeners,
  };

  const view = (
    <StandardTemplate
      alert={alertComponent}
      sticky="none"
      pageHead={pageHeadTitle}
      subHeadChildren={subHeadTabs}
    >
      { modalComponent }

      <Content {...contentProps} />

      { actions }
    </StandardTemplate>
  );

  return isLoading ? <Spinner /> : view;
};

const mapStateToProps = state => ({
  isLoading: getIsLoading(state),
  selectedTab: getMainTab(state),
  alert: getAlert(state),
  modal: getModal(state),
  pageHeadTitle: getPageHeadTitle(state),
});

export default connect(mapStateToProps)(EmployeeDetailView);
