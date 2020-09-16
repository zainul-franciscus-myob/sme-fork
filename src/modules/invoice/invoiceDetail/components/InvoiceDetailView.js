import { Alert } from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';
import classNames from 'classnames';

import {
  getAlert,
  getIsCreating,
  getIsPreConversion,
  getIsReadOnly,
  getIsSubmitting,
  getLayout,
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
import InvoiceLayout from '../types/InvoiceLayout';
import InvoiceServiceTable from './serviceLayout/InvoiceServiceTable';
import LineItemTemplate from '../../../../components/Feelix/LineItemTemplate/LineItemTemplate';
import MoreInformation from './MoreInformation';
import PageView from '../../../../components/PageView/PageView';
import UpgradeModal from './UpgradeModal';
import styles from './InvoiceDetailView.module.css';

const InvoiceDetailView = ({
  accountModal,
  jobModal,
  layout,
  loadingState,
  isCreating,
  alert,
  modalType,
  emailInvoiceDetail,
  templateOptions,
  isActionsDisabled,
  isReadOnly,
  isPreConversion,
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
  preConversionModalListeners,
  applyPaymentUnsavedChangesListeners,
  redirectToUrlListeners,
  exportPdfModalListeners,
  renderContactCombobox,
  renderItemCombobox,
  onInputAlert,
  onDismissPreConversionAlert,
  onUpdateHeaderOptions,
  onIssueDateBlur,
  onUpdateInvoiceLayout,
  onUpgradeModalDismiss,
  onUpgradeModalUpgradeButtonClick,
  onAccordionClose,
  onAccordionOpen,
  onClickOnRefNo,
  onFocusActivityHistory,
  onRedirectToCreatePayment,
}) => {
  const options = (
    <InvoiceDetailOptions
      renderContactCombobox={renderContactCombobox}
      onInputAlert={onInputAlert}
      onUpdateHeaderOptions={onUpdateHeaderOptions}
      onIssueDateBlur={onIssueDateBlur}
      onDismissPreConversionAlert={onDismissPreConversionAlert}
    />
  );

  const alertComponent = alert && (
    <Alert type={alert.type} onDismiss={onDismissAlert}>
      {alert.message}
    </Alert>
  );

  const actions = <InvoiceDetailActions listeners={invoiceActionListeners} />;

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
      preConversionModalListeners={preConversionModalListeners}
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

  const serviceTable = (
    <InvoiceServiceTable
      listeners={serviceLayoutListeners}
      footer={notesAndTotals}
    />
  );

  const itemAndServiceTable = (
    <InvoiceItemTable
      listeners={itemLayoutListeners}
      footer={notesAndTotals}
      renderItemCombobox={renderItemCombobox}
    />
  );

  const table = {
    [InvoiceLayout.SERVICE]: serviceTable,
    [InvoiceLayout.ITEM_AND_SERVICE]: itemAndServiceTable,
    [InvoiceLayout.PROFESSIONAL]: serviceTable,
    [InvoiceLayout.TIME_BILLING]: itemAndServiceTable,
    [InvoiceLayout.MISCELLANEOUS]: serviceTable,
  }[layout];

  const layoutPopver = isPreConversion || (
    <InvoiceDetailLayoutPopover onUpdateInvoiceLayout={onUpdateInvoiceLayout} />
  );

  const view = (
    <React.Fragment>
      <LineItemTemplate
        pageHead={
          <InvoiceDetailHeader
            onFocusActivityHistory={onFocusActivityHistory}
            onRedirectToCreatePayment={onRedirectToCreatePayment}
          />
        }
        alert={alertComponent}
        options={options}
        separatorOptions={layoutPopver}
        actions={actions}
      >
        {accountModal}
        {jobModal}
        {upgradeModal}
        {modal}
        <div className={classNames(isReadOnly && styles.disabledTable)}>
          {table}
        </div>
      </LineItemTemplate>
      {!isCreating && (
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

const mapStateToProps = (state) => ({
  alert: getAlert(state),
  modalAlert: getModalAlert(state),
  modalType: getModalType(state),
  emailInvoiceDetail: getEmailInvoiceDetail(state),
  loadingState: getLoadingState(state),
  isActionsDisabled: getIsSubmitting(state),
  templateOptions: getTemplateOptions(state),
  isCreating: getIsCreating(state),
  layout: getLayout(state),
  isReadOnly: getIsReadOnly(state),
  isPreConversion: getIsPreConversion(state),
});

export default connect(mapStateToProps)(InvoiceDetailView);
