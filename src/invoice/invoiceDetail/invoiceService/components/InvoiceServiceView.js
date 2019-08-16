import {
  Alert, LineItemTemplate,
} from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';

import {
  getAlert, getEmailInvoiceDetail, getIsActionsDisabled, getIsCreating, getModalAlert, getModalType,
} from '../invoiceServiceSelectors';
import InvoiceDetailModal from '../../components/InvoiceDetailModal';
import InvoiceServiceActions from './InvoiceServiceActions';
import InvoiceServiceHeader from './InvoiceServiceHeader';
import InvoiceServiceOptions from './InvoiceServiceOptions';
import InvoiceServiceTable from './InvoiceServiceTable';

const InvoiceServiceView = ({
  isCreating,
  onUpdateHeaderOptions,
  onUpdateRow,
  onAddRow,
  onRowInputBlur,
  onRemoveRow,
  onSaveButtonClick,
  onCancelButtonClick,
  onDeleteButtonClick,
  onSaveAndEmailButtonClick,
  alert,
  onDismissAlert,
  modalType,
  emailInvoiceDetail,
  isActionsDisabled,
  modalAlert,
  confirmModalListeners,
  emailSettingsModalListeners,
  emailInvoiceDetailModalListeners,
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
      isCreating={isCreating}
      onSaveButtonClick={onSaveButtonClick}
      onSaveAndEmailButtonClick={onSaveAndEmailButtonClick}
      onCancelButtonClick={onCancelButtonClick}
      onDeleteButtonClick={onDeleteButtonClick}
    />
  );

  const modal = modalType && (
    <InvoiceDetailModal
      modalType={modalType}
      confirmModalListeners={confirmModalListeners}
      emailSettingsModalListeners={emailSettingsModalListeners}
      emailInvoiceDetailModalListeners={emailInvoiceDetailModalListeners}
      emailInvoiceDetail={emailInvoiceDetail}
      isActionsDisabled={isActionsDisabled}
      alert={modalAlert}
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
      />
    </LineItemTemplate>
  );

  return view;
};

const mapStateToProps = state => ({
  isCreating: getIsCreating(state),
  alert: getAlert(state),
  modalAlert: getModalAlert(state),
  modalType: getModalType(state),
  emailInvoiceDetail: getEmailInvoiceDetail(state),
  isActionsDisabled: getIsActionsDisabled(state),
});

export default connect(mapStateToProps)(InvoiceServiceView);
