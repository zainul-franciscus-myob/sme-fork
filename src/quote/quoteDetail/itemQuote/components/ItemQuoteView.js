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
} from '../ItemQuoteSelectors';
import ItemQuoteActions from './ItemQuoteActions';
import ItemQuoteOptions from './ItemQuoteOptions';
import ItemQuoteTable from './ItemQuoteTable';
import QuoteDetailModal from '../../components/QuoteDetailModal';
import QuotePageHead from '../../components/QuotePageHead';

const ItemQuoteView = ({
  alert,
  modalType,
  template,
  templateOptions,
  isModalActionDisabled,
  onUpdateQuoteOption,
  onTableRowAmountInputBlur,
  onAddTableRow,
  onChangeTableRow,
  onRemoveTableRow,
  onSaveButtonClick,
  onSaveAndButtonClick,
  onDeleteButtonClick,
  onCancelButtonClick,
  onConvertToInvoiceButtonClick,
  onDismissAlert,
  onDismissModalAlert,
  onConfirmDeleteButtonClick,
  onConfirmCancelButtonClick,
  onConfirmSaveButtonClick,
  onConfirmUnsaveButtonClick,
  onConfirmSaveAndCreateNewButtonClick,
  onConfirmSaveAndDuplicateButtonClick,
  onDismissModal,
  onExportPdfButtonClick,
  onSaveAndEmailButtonClick,
  onConfirmExportPdfButtonClick,
  onChangeExportPdfForm,
  pageTitle,
  isCreating,
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
}) => {
  const actions = (
    <ItemQuoteActions
      onSaveButtonClick={onSaveButtonClick}
      onSaveAndButtonClick={onSaveAndButtonClick}
      onDeleteButtonClick={onDeleteButtonClick}
      onCancelButtonClick={onCancelButtonClick}
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

  const options = <ItemQuoteOptions onUpdateQuoteOption={onUpdateQuoteOption} />;

  const pageHead = (
    <QuotePageHead
      showTotalItems={isCreating}
      totalAmount={totalAmount}
      pageTitle={pageTitle}
    />
  );

  const modal = modalType && (
    <QuoteDetailModal
      modalType={modalType}
      template={template}
      templateOptions={templateOptions}
      isActionDisabled={isModalActionDisabled}
      emailQuoteDetail={emailQuoteDetail}
      modalAlert={modalAlert}
      onDismissModal={onDismissModal}
      onDismissAlert={onDismissModalAlert}
      onConfirmCancelButtonClick={onConfirmCancelButtonClick}
      onConfirmDeleteButtonClick={onConfirmDeleteButtonClick}
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

  return (
    <React.Fragment>
      <LineItemTemplate
        pageHead={pageHead}
        options={options}
        actions={actions}
        alert={alertComponent}
      >
        { modal }
        <ItemQuoteTable
          onAddTableRow={onAddTableRow}
          onChangeTableRow={onChangeTableRow}
          onRemoveTableRow={onRemoveTableRow}
          onTableRowAmountInputBlur={onTableRowAmountInputBlur}
        />
      </LineItemTemplate>
    </React.Fragment>
  );
};

const mapStateToProps = state => ({
  modalType: getModalType(state),
  alert: getAlert(state),
  pageTitle: getPageTitle(state),
  totalAmount: getTotalAmount(state),
  isCreating: getIsCreating(state),
  template: getExportPdfTemplate(state),
  templateOptions: getTemplateOptions(state),
  isModalActionDisabled: getIsModalActionDisabled(state),
  emailQuoteDetail: getEmailQuoteDetail(state),
  modalAlert: getModalAlert(state),
});

export default connect(mapStateToProps)(ItemQuoteView);
