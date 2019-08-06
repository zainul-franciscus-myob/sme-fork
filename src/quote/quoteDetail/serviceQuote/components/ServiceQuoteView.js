import {
  Alert, LineItemTemplate,
} from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';

import {
  getAlertMessage,
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
  onCancelButtonClick,
  onDeleteButtonClick,
  onConvertToInvoiceButtonClick,
  isCreating,
  modalType,
  onCloseModal,
  onCancelModal,
  onConfirmSaveButtonClick,
  onConfirmUnsaveButtonClick,
  alertMessage,
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
      onCancelButtonClick={onCancelButtonClick}
      onDeleteButtonClick={onDeleteButtonClick}
      onConvertToInvoiceButtonClick={onConvertToInvoiceButtonClick}
    />
  );

  const alertComponent = alertMessage && (
    <Alert type="danger" onDismiss={onDismissAlert}>
      {alertMessage}
    </Alert>
  );

  const modal = (
    <QuoteDetailModal
      modalType={modalType}
      onDismissModal={onCloseModal}
      onConfirmCancelButtonClick={onCancelModal}
      onConfirmDeleteButtonClick={onDeleteModal}
      onConfirmSaveButtonClick={onConfirmSaveButtonClick}
      onConfirmUnsaveButtonClick={onConfirmUnsaveButtonClick}
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
  alertMessage: getAlertMessage(state),
  pageTitle: getPageTitle(state),
  totalAmount: getTotalAmount(state),
});

export default connect(mapStateToProps)(ServiceQuoteView);
