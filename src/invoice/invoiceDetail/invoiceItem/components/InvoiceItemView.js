import { Alert, LineItemTemplate } from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';

import {
  getAlert, getAreModalActionButtonsDisabled, getEmailInvoiceDetail, getModalAlert, getModalType,
} from '../invoiceItemSelectors';
import InvoiceDetailModal from '../../components/InvoiceDetailModal';
import InvoiceItemActions from './InvoiceItemActions';
import InvoiceItemHeader from './InvoiceItemHeader';
import InvoiceItemOptions from './InvoiceItemOptions';
import InvoiceItemTable from './InvoiceItemTable';

const InvoiceItemView = ({
  onUpdateInvoiceOption,
  onUpdateTaxInclusive,
  onSaveButtonClick,
  onSaveAndButtonClick,
  onSaveAndEmailButtonClick,
  onCancelButtonClick,
  onDeleteButtonClick,
  onDismissAlert,
  onAddTableLine,
  onChangeTableRow,
  onRemoveTableRow,
  onLineInputBlur,
  alert,
  modalAlert,
  modalType,
  emailInvoiceDetail,
  isActionsDisabled,
  confirmModalListeners,
  saveAndConfirmModalListeners,
  emailSettingsModalListeners,
  emailInvoiceDetailModalListeners,
  onChangeAmountToPay,
  onPayInvoiceButtonClick,
  applyPaymentUnsavedChangesListeners,
}) => {
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

  const templateOptions = (
    <InvoiceItemOptions
      onUpdateInvoiceOption={onUpdateInvoiceOption}
      onUpdateTaxInclusive={onUpdateTaxInclusive}
    />
  );

  const actions = (
    <InvoiceItemActions
      onSaveButtonClick={onSaveButtonClick}
      onSaveAndButtonClick={onSaveAndButtonClick}
      onSaveAndEmailButtonClick={onSaveAndEmailButtonClick}
      onCancelButtonClick={onCancelButtonClick}
      onDeleteButtonClick={onDeleteButtonClick}
      onPayInvoiceButtonClick={onPayInvoiceButtonClick}
    />
  );

  const alertComponent = alert && (
    <Alert type={alert.type} onDismiss={onDismissAlert}>
      {alert.message}
    </Alert>
  );

  const invoiceItemTable = (
    <InvoiceItemTable
      onAddTableLine={onAddTableLine}
      onChangeTableRow={onChangeTableRow}
      onRemoveTableRow={onRemoveTableRow}
      onLineInputBlur={onLineInputBlur}
      onChangeAmountToPay={onChangeAmountToPay}
      onPayInvoiceButtonClick={onPayInvoiceButtonClick}
    />
  );

  return (
    <LineItemTemplate
      pageHead={<InvoiceItemHeader />}
      alert={alertComponent}
      options={templateOptions}
      actions={actions}
    >
      {modal}

      {invoiceItemTable}

    </LineItemTemplate>
  );
};

const mapStateToProps = state => ({
  alert: getAlert(state),
  modalAlert: getModalAlert(state),
  modalType: getModalType(state),
  emailInvoiceDetail: getEmailInvoiceDetail(state),
  areModalActionButtonsdisabled: getAreModalActionButtonsDisabled(state),
});

export default connect(mapStateToProps)(InvoiceItemView);
