import {
  Alert, LineItemTemplate,
} from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';

import {
  getAlert, getEmailInvoiceDetail, getIsActionsDisabled, getModalAlert, getModalType,
} from '../invoiceServiceSelectors';
import InvoiceDetailModal from '../../components/InvoiceDetailModal';
import InvoiceServiceActions from './InvoiceServiceActions';
import InvoiceServiceHeader from './InvoiceServiceHeader';
import InvoiceServiceOptions from './InvoiceServiceOptions';
import InvoiceServiceTable from './InvoiceServiceTable';

const InvoiceServiceView = ({
  onUpdateHeaderOptions,
  onUpdateRow,
  onAddRow,
  onRowInputBlur,
  onRemoveRow,
  onSaveButtonClick,
  onCancelButtonClick,
  onDeleteButtonClick,
  onSaveAndEmailButtonClick,
  onSaveAndButtonClick,
  alert,
  onDismissAlert,
  modalType,
  emailInvoiceDetail,
  isActionsDisabled,
  modalAlert,
  confirmModalListeners,
  saveAndConfirmModalListeners,
  emailSettingsModalListeners,
  emailInvoiceDetailModalListeners,
  onChangeAmountToPay,
  onPayInvoiceButtonClick,
  applyPaymentUnsavedChangesListeners,
}) => {
  const templateOptions = (
    <InvoiceServiceOptions
      onUpdateHeaderOptions={onUpdateHeaderOptions}
    />
  );

  const alertComponent = alert && (
    <Alert type={alert.type} onDismiss={onDismissAlert}>
      {alert.message}
    </Alert>
  );

  const actions = (
    <InvoiceServiceActions
      onSaveButtonClick={onSaveButtonClick}
      onSaveAndEmailButtonClick={onSaveAndEmailButtonClick}
      onSaveAndButtonClick={onSaveAndButtonClick}
      onCancelButtonClick={onCancelButtonClick}
      onDeleteButtonClick={onDeleteButtonClick}
      onPayInvoiceButtonClick={onPayInvoiceButtonClick}
    />
  );

  const modal = modalType && (
    <InvoiceDetailModal
      modalType={modalType}
      confirmModalListeners={confirmModalListeners}
      saveAndConfirmModalListeners={saveAndConfirmModalListeners}
      emailSettingsModalListeners={emailSettingsModalListeners}
      emailInvoiceDetailModalListeners={emailInvoiceDetailModalListeners}
      emailInvoiceDetail={emailInvoiceDetail}
      isActionsDisabled={isActionsDisabled}
      alert={modalAlert}
      applyPaymentUnsavedChangesListeners={applyPaymentUnsavedChangesListeners}
    />
  );

  const view = (
    <LineItemTemplate
      pageHead={<InvoiceServiceHeader />}
      alert={alertComponent}
      options={templateOptions}
      actions={actions}
    >
      {modal}
      <InvoiceServiceTable
        onUpdateRow={onUpdateRow}
        onAddRow={onAddRow}
        onRemoveRow={onRemoveRow}
        onRowInputBlur={onRowInputBlur}
        onChangeAmountToPay={onChangeAmountToPay}
      />
    </LineItemTemplate>
  );

  return view;
};

const mapStateToProps = state => ({
  alert: getAlert(state),
  modalAlert: getModalAlert(state),
  modalType: getModalType(state),
  emailInvoiceDetail: getEmailInvoiceDetail(state),
  isActionsDisabled: getIsActionsDisabled(state),
});

export default connect(mapStateToProps)(InvoiceServiceView);
