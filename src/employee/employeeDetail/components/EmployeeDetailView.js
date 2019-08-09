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
  getMainTab,
  getModalType,
  getPageHeadTitle,
} from '../selectors/EmployeeDetailSelectors';
import { mainTabIds, mainTabItems } from '../tabItems';
import CancelModal from '../../../components/modal/CancelModal';
import DeductionPayItemModal from './DeductionPayItemModal/DeductionPayItemModal';
import DeleteModal from '../../../components/modal/DeleteModal';
import EmployeeDetailActions from './EmployeeDetailActions';
import EmployeeDetailContactDetails from './EmployeeDetailContactDetails';
import EmployeeDetailPaymentDetails from './EmployeeDetailPaymentDetails';
import EmployeeDetailPayrollDetails from './EmployeeDetailPayrollDetails';
import TaxPayItemModal from './PayrollTaxDetails/TaxPayItemModal';
import UnsavedModal from '../../../components/modal/UnsavedModal';

const getModalDialogView = ({
  modalType,
  onCloseModal,
  onCancelModal,
  onDeleteModal,
  onSaveModal,
  onTaxPayItemModalDetailChange,
  onTaxPayItemModalSaveButtonClick,
  onDismissTaxPayItemModalAlertMessage,
  deductionPayItemModalListeners,
}) => {
  switch (modalType) {
    case 'cancel':
      return (
        <CancelModal
          onCancel={onCloseModal}
          onConfirm={onCancelModal}
          title="Cancel employee alterations"
          description="Are you sure you want to cancel the alterations in this employee?"
        />
      );
    case 'delete':
      return (
        <DeleteModal
          onCancel={onCloseModal}
          onConfirm={onDeleteModal}
          title="Delete employee"
          description="Are you sure you want to delete this employee?"
        />
      );
    case 'unsaved':
      return (
        <UnsavedModal
          onConfirmSave={onSaveModal}
          onConfirmUnsave={onCancelModal}
          onCancel={onCloseModal}
        />
      );
    case 'deductionPayItem':
      return (
        <DeductionPayItemModal
          {...deductionPayItemModalListeners}
          onCancel={onCloseModal}
        />
      );
    case 'taxPayItem':
      return (
        <TaxPayItemModal
          onCloseModal={onCloseModal}
          onTaxPayItemModalDetailChange={onTaxPayItemModalDetailChange}
          onTaxPayItemModalSaveButtonClick={onTaxPayItemModalSaveButtonClick}
          onDismissTaxPayItemModalAlertMessage={onDismissTaxPayItemModalAlertMessage}
        />
      );
    default:
      return undefined;
  }
};

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
  modalType,
  onCloseModal,
  onCancelModal,
  onDeleteModal,
  onSaveModal,
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
  onOpenDeductionPayItemModal,
  deductionPayItemModalListeners,
  onTaxPayItemClick,
  onTaxPayItemModalDetailChange,
  onTaxPayItemModalSaveButtonClick,
  onDismissTaxPayItemModalAlertMessage,
  onAddAllocatedLeaveItem,
  onRemoveAllocatedLeaveItem,
  onUpdateAllocatedLeaveItemCarryOver,
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

  const modal = getModalDialogView({
    modalType,
    onCloseModal,
    onCancelModal,
    onDeleteModal,
    onSaveModal,
    onTaxPayItemModalDetailChange,
    onTaxPayItemModalSaveButtonClick,
    onDismissTaxPayItemModalAlertMessage,
    deductionPayItemModalListeners,
  });

  const contentProps = {
    onSubTabSelected,
    onContactDetailsChange,
    onEmploymentDetailsChange,
    onEmploymentPaySlipDeliveryChange,
    onPaymentDetailsChange,
    onBankAccountDetailsChange,
    onAddPayrollDeductionPayItem,
    onRemovePayrollDeductionPayItem,
    onAddAllocatedLeaveItem,
    onRemoveAllocatedLeaveItem,
    onUpdateAllocatedLeaveItemCarryOver,
    onUpdatePayrollDetailSuperannuationDetails,
    onAddPayrollSuperPayItem,
    onRemovePayrollSuperPayItem,
    onOpenDeductionPayItemModal,
    onAddPayrollTaxPayItem,
    onRemovePayrollTaxPayItem,
    onPayrollTaxDetailsChange,
    onPayrollTaxAmountBlur,
    onTaxPayItemClick,
  };

  const view = (
    <StandardTemplate
      alert={alertComponent}
      sticky="none"
      pageHead={pageHeadTitle}
      subHeadChildren={subHeadTabs}
    >
      { modal }

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
  modalType: getModalType(state),
  pageHeadTitle: getPageHeadTitle(state),
});

export default connect(mapStateToProps)(EmployeeDetailView);
