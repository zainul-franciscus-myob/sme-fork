import { Alert, LineItemTemplate } from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';

import {
  getAlert,
  getIsActionsDisabled,
  getIsLoading,
  getIsServiceLayout,
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
  isLoading,
  alert,
  modalType,
  emailInvoiceDetail,
  templateOptions,
  isActionsDisabled,
  isServiceLayout,
  modalAlert,
  onDismissAlert,
  onUpdateHeaderOptions,
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
  onAddContactButtonClick,
}) => {
  const options = (
    <InvoiceDetailOptions
      onUpdateHeaderOptions={onUpdateHeaderOptions}
      onAddContactButtonClick={onAddContactButtonClick}
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
      {contactModal}
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
  isActionsDisabled: getIsActionsDisabled(state),
  isServiceLayout: getIsServiceLayout(state),
  templateOptions: getTemplateOptions(state),
});

export default connect(mapStateToProps)(InvoiceDetailView);
