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
import CancelModal from '../../../../components/modal/CancelModal';
import DeleteModal from '../../../../components/modal/DeleteModal';
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
  isCreating,
  modalType,
  onCloseModal,
  onCancelModal,
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
    />
  );

  const alertComponent = alertMessage && (
    <Alert type="danger" onDismiss={onDismissAlert}>
      {alertMessage}
    </Alert>
  );

  let modal;
  if (modalType === 'cancel') {
    modal = (
      <CancelModal
        onCancel={onCloseModal}
        onConfirm={onCancelModal}
        title="Cancel quote alterations"
        description="Are you sure you want to cancel the alterations in this quote?"
      />
    );
  } else if (modalType === 'delete') {
    modal = (
      <DeleteModal
        onCancel={onCloseModal}
        onConfirm={onDeleteModal}
        title="Delete quote"
        description="Are you sure you want to delete this quote?"
      />
    );
  }

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
