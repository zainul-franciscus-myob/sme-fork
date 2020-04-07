import { Alert } from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';

import {
  getAlert,
  getIsCreating,
  getIsServiceLayout,
  getIsSubmitting,
  getLoadingState,
  getModalAlert,
  getModalType,
  getTemplateOptions,
} from '../selectors/invoiceDetailSelectors';
import { getEmailInvoiceDetail } from '../selectors/emailSelectors';
import InvoiceDetailActions from './InvoiceDetailActions';
import InvoiceDetailHeader from './InvoiceDetailHeader';
import InvoiceDetailLayoutPopover from './InvoiceDetailLayoutPopover';
import InvoiceDetailModal from './InvoiceDetailModal';
import InvoiceDetailNotes from './InvoiceDetailNotes';
import InvoiceDetailOptions from './InvoiceDetailOptions';
import InvoiceDetailTotals from './InvoiceDetailTotals';
import InvoiceItemTable from './itemLayout/InvoiceItemTable';
import InvoiceServiceTable from './serviceLayout/InvoiceServiceTable';
import LineItemTemplate from '../../../../components/Feelix/LineItemTemplate/LineItemTemplate';
import MoreInformation from './MoreInformation';
import PageView from '../../../../components/PageView/PageView';
import UpgradeModal from './UpgradeModal';
import styles from './InvoiceDetailView.module.css';

const InvoiceDetailView = ({
  accountModal,
  inventoryModal,
  loadingState,
  isCreating,
  alert,
  modalType,
  emailInvoiceDetail,
  templateOptions,
  isActionsDisabled,
  isServiceLayout,
  modalAlert,
  onDismissAlert,
  onChangeAmountToPay,
  serviceLayoutListeners,
  itemLayoutListeners,
  invoiceActionListeners,
  confirmModalListeners,
  saveAndConfirmModalListeners,
  emailSettingsModalListeners,
  emailInvoiceDetailModalListeners,
  applyPaymentUnsavedChangesListeners,
  redirectToUrlListeners,
  exportPdfModalListeners,
  contactModal,
  onUpdateHeaderOptions,
  onAddContactButtonClick,
  onUpdateInvoiceLayout,
  onUpgradeModalDismiss,
  onUpgradeModalUpgradeButtonClick,
  onAccordionClose,
  onAccordionOpen,
  onClickOnRefNo,
  onFocusActivityHistory,
  onRedirectToCreatePayment,
  onLoadContacts,
}) => {
  const options = (
    <InvoiceDetailOptions
      onUpdateHeaderOptions={onUpdateHeaderOptions}
      onAddContactButtonClick={onAddContactButtonClick}
      onUpdateInvoiceLayout={onUpdateInvoiceLayout}
      onLoadContacts={onLoadContacts}
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
      redirectToUrlListeners={redirectToUrlListeners}
    />
  );

  const upgradeModal = (
    <UpgradeModal
      onUpgradeModalDismiss={onUpgradeModalDismiss}
      onUpgradeModalUpgradeButtonClick={onUpgradeModalUpgradeButtonClick}
    />
  );

  const notesAndTotals = (
    <div className={styles.notesAndTotals}>
      <InvoiceDetailNotes onUpdateHeaderOptions={onUpdateHeaderOptions} />
      <InvoiceDetailTotals onChange={onChangeAmountToPay} />
    </div>
  );

  const table = isServiceLayout
    ? <InvoiceServiceTable
      listeners={serviceLayoutListeners}
      footer={notesAndTotals}
    />
    : <InvoiceItemTable
      listeners={itemLayoutListeners}
      footer={notesAndTotals}
    />;

  const layoutPopver = (
    <InvoiceDetailLayoutPopover onUpdateInvoiceLayout={onUpdateInvoiceLayout} />
  );

  const view = (
    <React.Fragment>
      <LineItemTemplate
        pageHead={(
          <InvoiceDetailHeader
            onFocusActivityHistory={onFocusActivityHistory}
            onRedirectToCreatePayment={onRedirectToCreatePayment}
          />
        )}
        alert={alertComponent}
        options={options}
        actions={actions}
      >
        {accountModal}
        {upgradeModal}
        {contactModal}
        {inventoryModal}
        {modal}
        {layoutPopver}
        {table}
      </LineItemTemplate>
      {!isCreating
      && (
      <MoreInformation
        onAccordionClose={onAccordionClose}
        onAccordionOpen={onAccordionOpen}
        onClickOnRefNo={onClickOnRefNo}
      />
      )}
    </React.Fragment>
  );

  return <PageView loadingState={loadingState} view={view} />;
};

const mapStateToProps = state => ({
  alert: getAlert(state),
  modalAlert: getModalAlert(state),
  modalType: getModalType(state),
  emailInvoiceDetail: getEmailInvoiceDetail(state),
  loadingState: getLoadingState(state),
  isActionsDisabled: getIsSubmitting(state),
  isServiceLayout: getIsServiceLayout(state),
  templateOptions: getTemplateOptions(state),
  isCreating: getIsCreating(state),
});

export default connect(mapStateToProps)(InvoiceDetailView);
