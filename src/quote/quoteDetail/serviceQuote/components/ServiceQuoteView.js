import {
  Alert, LineItemTemplate,
} from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';

import {
  getAlert,
  getExportPdfTemplate,
  getExportPdfTemplateOptions,
  getIsCreating,
  getIsModalActionDisabled,
  getModalType,
  getPageTitle,
  getTotalAmount,
} from '../ServiceQuoteSelectors';
import QuoteDetailModal from '../../components/QuoteDetailModal';
import QuotePageHead from '../../components/QuotePageHead';
import ServiceQuoteActions from './ServiceQuoteActions';
import ServiceQuoteOptions from './ServiceQuoteOptions';
import ServiceQuoteTable from './ServiceQuoteTable';

const ServiceQuoteView = ({
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
  onDeleteModal,
  onExportPdfButtonClick,
  onConfirmExportPdfButtonClick,
  onChangeExportPdfForm,
  pageTitle,
  totalAmount,
}) => {
  const options = <ServiceQuoteOptions onUpdateHeaderOptions={onUpdateHeaderOptions} />;

  const actions = (
    <ServiceQuoteActions
      isCreating={isCreating}
      onSaveButtonClick={onSaveButtonClick}
      onSaveAndButtonClick={onSaveAndButtonClick}
      onCancelButtonClick={onCancelButtonClick}
      onDeleteButtonClick={onDeleteButtonClick}
      onConvertToInvoiceButtonClick={onConvertToInvoiceButtonClick}
      onExportPdfButtonClick={onExportPdfButtonClick}
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
      onDismissModal={onCloseModal}
      onConfirmCancelButtonClick={onCancelModal}
      onConfirmDeleteButtonClick={onDeleteModal}
      onConfirmSaveButtonClick={onConfirmSaveButtonClick}
      onConfirmUnsaveButtonClick={onConfirmUnsaveButtonClick}
      onConfirmSaveAndCreateNewButtonClick={onConfirmSaveAndCreateNewButtonClick}
      onConfirmSaveAndDuplicateButtonClick={onConfirmSaveAndDuplicateButtonClick}
      onConfirmExportPdfButtonClick={onConfirmExportPdfButtonClick}
      onChangeExportPdfForm={onChangeExportPdfForm}
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
      { modal }
      <ServiceQuoteTable
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
  templateOptions: getExportPdfTemplateOptions(state),
  isModalActionDisabled: getIsModalActionDisabled(state),
});

export default connect(mapStateToProps)(ServiceQuoteView);
