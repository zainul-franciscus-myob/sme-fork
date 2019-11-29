import { Alert, LineItemTemplate } from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';

import {
  getAlert,
  getIsLoading,
  getIsServiceLayout,
  getIsSubmitting,
  getModalAlert,
  getModalType,
  getTemplateOptions,
} from '../selectors/invoiceDetailSelectors';
import { getEmailInvoiceDetail } from '../selectors/emailSelectors';
import InvoiceDetailActions from './InvoiceDetailActions';
import InvoiceDetailHeader from './InvoiceDetailHeader';
import InvoiceDetailModal from './InvoiceDetailModal';
import InvoiceDetailOptions from './InvoiceDetailOptions';
import InvoiceItemTable from './itemLayout/InvoiceItemTable';
import InvoiceServiceTable from './serviceLayout/InvoiceServiceTable';
import PageView from '../../../components/PageView/PageView';

const InvoiceDetailView = ({
  accountModal,
  inventoryModal,
  isLoading,
  alert,
  modalType,
  emailInvoiceDetail,
  templateOptions,
  isActionsDisabled,
  isServiceLayout,
  modalAlert,
  onDismissAlert,
  serviceLayoutListeners,
  itemLayoutListeners,
  invoiceActionListeners,
  confirmModalListeners,
  saveAndConfirmModalListeners,
  emailSettingsModalListeners,
  emailInvoiceDetailModalListeners,
  applyPaymentUnsavedChangesListeners,
  exportPdfModalListeners,
  contactModal,
  onUpdateHeaderOptions,
  onAddContactButtonClick,
  onUpdateInvoiceLayout,
}) => {
  const options = (
    <InvoiceDetailOptions
      onUpdateHeaderOptions={onUpdateHeaderOptions}
      onAddContactButtonClick={onAddContactButtonClick}
      onUpdateInvoiceLayout={onUpdateInvoiceLayout}
    />
  );

  const alertComponent = alert && (
    <Alert type={alert.type} onDismiss={onDismissAlert}>
      {alert.message}
    </Alert>
  );

  const actions = (
    <InvoiceDetailActions listeners={invoiceActionListeners} />
  );

  const modal = modalType && (
    <InvoiceDetailModal
      modalType={modalType}
      confirmModalListeners={confirmModalListeners}
      saveAndConfirmModalListeners={saveAndConfirmModalListeners}
      emailSettingsModalListeners={emailSettingsModalListeners}
      emailInvoiceDetailModalListeners={emailInvoiceDetailModalListeners}
      emailInvoiceDetail={emailInvoiceDetail}
      templateOptions={templateOptions}
      isActionsDisabled={isActionsDisabled}
      alert={modalAlert}
      applyPaymentUnsavedChangesListeners={applyPaymentUnsavedChangesListeners}
      exportPdfModalListeners={exportPdfModalListeners}
    />
  );

  const table = isServiceLayout
    ? <InvoiceServiceTable listeners={serviceLayoutListeners} />
    : <InvoiceItemTable listeners={itemLayoutListeners} />;

  const view = (
    <LineItemTemplate
      pageHead={<InvoiceDetailHeader />}
      alert={alertComponent}
      options={options}
      actions={actions}
    >
      {accountModal}
      {contactModal}
      {inventoryModal}
      {modal}
      {table}
    </LineItemTemplate>
  );

  return <PageView isLoading={isLoading} view={view} />;
};

const mapStateToProps = state => ({
  alert: getAlert(state),
  modalAlert: getModalAlert(state),
  modalType: getModalType(state),
  emailInvoiceDetail: getEmailInvoiceDetail(state),
  isLoading: getIsLoading(state),
  isActionsDisabled: getIsSubmitting(state),
  isServiceLayout: getIsServiceLayout(state),
  templateOptions: getTemplateOptions(state),
});

export default connect(mapStateToProps)(InvoiceDetailView);
