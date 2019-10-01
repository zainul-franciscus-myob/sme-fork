import {
  Alert, LineItemTemplate,
} from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';

import {
  getAlert,
  getIsCreating,
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
  pageTitle,
  totalAmount,
}) => {
  const templateOptions = <ServiceQuoteOptions onUpdateHeaderOptions={onUpdateHeaderOptions} />;

  const actions = (
    <ServiceQuoteActions
      isCreating={isCreating}
      onSaveButtonClick={onSaveButtonClick}
      onSaveAndButtonClick={onSaveAndButtonClick}
      onCancelButtonClick={onCancelButtonClick}
      onDeleteButtonClick={onDeleteButtonClick}
      onConvertToInvoiceButtonClick={onConvertToInvoiceButtonClick}
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
      onDismissModal={onCloseModal}
      onConfirmCancelButtonClick={onCancelModal}
      onConfirmDeleteButtonClick={onDeleteModal}
      onConfirmSaveButtonClick={onConfirmSaveButtonClick}
      onConfirmUnsaveButtonClick={onConfirmUnsaveButtonClick}
      onConfirmSaveAndCreateNewButtonClick={onConfirmSaveAndCreateNewButtonClick}
      onConfirmSaveAndDuplicateButtonClick={onConfirmSaveAndDuplicateButtonClick}
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
      options={templateOptions}
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
});

export default connect(mapStateToProps)(ServiceQuoteView);
