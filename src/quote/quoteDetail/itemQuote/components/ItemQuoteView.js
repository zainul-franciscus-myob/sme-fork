import { Alert, LineItemTemplate } from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';

import {
  getAlert,
  getExportPdfTemplate,
  getExportPdfTemplateOptions,
  getIsCreating,
  getModalType,
  getPageTitle,
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
  onConfirmDeleteButtonClick,
  onConfirmCancelButtonClick,
  onConfirmSaveButtonClick,
  onConfirmUnsaveButtonClick,
  onConfirmSaveAndCreateNewButtonClick,
  onConfirmSaveAndDuplicateButtonClick,
  onDismissModal,
  onExportPdfButtonClick,
  onConfirmExportPdfButtonClick,
  onChangeExportPdfForm,
  pageTitle,
  isCreating,
  totalAmount,
}) => {
  const actions = (
    <ItemQuoteActions
      onSaveButtonClick={onSaveButtonClick}
      onSaveAndButtonClick={onSaveAndButtonClick}
      onDeleteButtonClick={onDeleteButtonClick}
      onCancelButtonClick={onCancelButtonClick}
      onConvertToInvoiceButtonClick={onConvertToInvoiceButtonClick}
      onExportPdfButtonClick={onExportPdfButtonClick}
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
      onDismissModal={onDismissModal}
      onConfirmCancelButtonClick={onConfirmCancelButtonClick}
      onConfirmDeleteButtonClick={onConfirmDeleteButtonClick}
      onConfirmSaveButtonClick={onConfirmSaveButtonClick}
      onConfirmUnsaveButtonClick={onConfirmUnsaveButtonClick}
      onConfirmSaveAndCreateNewButtonClick={onConfirmSaveAndCreateNewButtonClick}
      onConfirmSaveAndDuplicateButtonClick={onConfirmSaveAndDuplicateButtonClick}
      onConfirmExportPdfButtonClick={onConfirmExportPdfButtonClick}
      onChangeExportPdfForm={onChangeExportPdfForm}
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
  templateOptions: getExportPdfTemplateOptions(state),
});

export default connect(mapStateToProps)(ItemQuoteView);
