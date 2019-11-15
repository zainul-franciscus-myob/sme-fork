import { Alert, LineItemTemplate } from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';

import {
  getAlert,
  getEmailQuoteDetail,
  getExportPdfTemplate,
  getIsCreating,
  getIsModalActionDisabled,
  getModalAlert,
  getModalType,
  getPageTitle,
  getTemplateOptions,
  getTotalAmount,
} from '../ServiceQuoteSelectors';
import QuoteDetailModal from '../../components/QuoteDetailModal';
import QuotePageHead from '../../components/QuotePageHead';
import ServiceQuoteActions from './ServiceQuoteActions';
import ServiceQuoteOptions from './ServiceQuoteOptions';
import ServiceQuoteTable from './ServiceQuoteTable';

const ServiceQuoteView = ({
  accountModal,
  onAddAccount,
  template,
  templateOptions,
  isModalActionDisabled,
  onUpdateHeaderOptions,
  onUpdateRow,
  onAddRow,
  onRemoveRow,
  onRowInputBlur,
  onSaveButtonClick,
  onSaveAndButtonClick,
  onCancelButtonClick,
  onDeleteButtonClick,
  onConvertToInvoiceButtonClick,
  isCreating,
  modalType,
  onCloseModal,
  onCancelModal,
  onConfirmSaveButtonClick,
  onConfirmUnsaveButtonClick,
  onConfirmSaveAndCreateNewButtonClick,
  onConfirmSaveAndDuplicateButtonClick,
  alert,
  onDismissAlert,
  onDismissModalAlert,
  onDeleteModal,
  onExportPdfButtonClick,
  onSaveAndEmailButtonClick,
  onConfirmExportPdfButtonClick,
  onChangeExportPdfForm,
  pageTitle,
  totalAmount,
  emailQuoteDetail,
  modalAlert,
  onEmailQuoteDetailChange,
  onConfirmEmailQuoteButtonClick,
  onCancelEmailQuoteButtonClick,
  onAddAttachments,
  onRemoveAttachment,
  onConfirmEmailSettingButtonClick,
  onCloseEmailSettingButtonClick,
  contactModal,
  onAddCustomerButtonClick,
}) => {
  const options = (
    <ServiceQuoteOptions
      onUpdateHeaderOptions={onUpdateHeaderOptions}
      onAddCustomerButtonClick={onAddCustomerButtonClick}
    />
  );

  const actions = (
    <ServiceQuoteActions
      isCreating={isCreating}
      onSaveButtonClick={onSaveButtonClick}
      onSaveAndButtonClick={onSaveAndButtonClick}
      onCancelButtonClick={onCancelButtonClick}
      onDeleteButtonClick={onDeleteButtonClick}
      onConvertToInvoiceButtonClick={onConvertToInvoiceButtonClick}
      onExportPdfButtonClick={onExportPdfButtonClick}
      onSaveAndEmailButtonClick={onSaveAndEmailButtonClick}
    />
  );

  const alertComponent = alert && (
    <Alert type={alert.type} onDismiss={onDismissAlert}>
      {alert.message}
    </Alert>
  );

  const modal = modalType && (
    <QuoteDetailModal
      modalType={modalType}
      template={template}
      templateOptions={templateOptions}
      isActionDisabled={isModalActionDisabled}
      emailQuoteDetail={emailQuoteDetail}
      modalAlert={modalAlert}
      onDismissModal={onCloseModal}
      onDismissAlert={onDismissModalAlert}
      onConfirmCancelButtonClick={onCancelModal}
      onConfirmDeleteButtonClick={onDeleteModal}
      onConfirmSaveButtonClick={onConfirmSaveButtonClick}
      onConfirmUnsaveButtonClick={onConfirmUnsaveButtonClick}
      onConfirmSaveAndCreateNewButtonClick={onConfirmSaveAndCreateNewButtonClick}
      onConfirmSaveAndDuplicateButtonClick={onConfirmSaveAndDuplicateButtonClick}
      onConfirmExportPdfButtonClick={onConfirmExportPdfButtonClick}
      onConfirmEmailQuoteButtonClick={onConfirmEmailQuoteButtonClick}
      onChangeExportPdfForm={onChangeExportPdfForm}
      onEmailQuoteDetailChange={onEmailQuoteDetailChange}
      onCancelEmailQuoteButtonClick={onCancelEmailQuoteButtonClick}
      onAddAttachments={onAddAttachments}
      onRemoveAttachment={onRemoveAttachment}
      onConfirmEmailSettingButtonClick={onConfirmEmailSettingButtonClick}
      onCloseEmailSettingButtonClick={onCloseEmailSettingButtonClick}
    />
  );

  const pageHead = (
    <QuotePageHead
      showTotalItems={isCreating}
      totalAmount={totalAmount}
      pageTitle={pageTitle}
    />
  );

  const view = (
    <LineItemTemplate
      pageHead={pageHead}
      alert={alertComponent}
      options={options}
      actions={actions}
    >
      { contactModal }
      { modal }
      { accountModal }
      <ServiceQuoteTable
        onAddAccount={onAddAccount}
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
  modalType: getModalType(state),
  alert: getAlert(state),
  pageTitle: getPageTitle(state),
  totalAmount: getTotalAmount(state),
  template: getExportPdfTemplate(state),
  templateOptions: getTemplateOptions(state),
  isModalActionDisabled: getIsModalActionDisabled(state),
  emailQuoteDetail: getEmailQuoteDetail(state),
  modalAlert: getModalAlert(state),
});

export default connect(mapStateToProps)(ServiceQuoteView);
