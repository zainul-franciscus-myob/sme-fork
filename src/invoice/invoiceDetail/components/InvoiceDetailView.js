import {
  Alert, LineItemTemplate,
} from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';

import {
  getAlert, getIsActionsDisabled, getIsLoading, getIsServiceLayout, getModalAlert, getModalType,
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
}) => {
  const templateOptions = (
    <InvoiceDetailOptions onUpdateHeaderOptions={onUpdateHeaderOptions} />
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
      options={templateOptions}
      actions={actions}
    >
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
});

export default connect(mapStateToProps)(InvoiceDetailView);
