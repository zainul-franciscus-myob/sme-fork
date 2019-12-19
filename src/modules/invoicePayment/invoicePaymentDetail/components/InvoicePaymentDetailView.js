import { Alert, LineItemTemplate } from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';

import { CANCEL_MODAL, DELETE_MODAL } from '../../InvoicePaymentModalTypes';
import { getAlertMessage, getIsLoading, getModalType } from '../invoicePaymentDetailSelectors';
import CancelModal from '../../../../components/modal/CancelModal';
import DeleteModal from '../../../../components/modal/DeleteModal';
import InvoicePaymentDetailActions from './InvoicePaymentDetailActions';
import InvoicePaymentDetailOptions from './InvoicePaymentDetailOptions';
import InvoicePaymentDetailTable from './InvoicePaymentDetailTable';
import PageView from '../../../../components/PageView/PageView';

const InvoicePaymentDetailView = ({
  alertMessage,
  isLoading,
  onUpdateInvoicePaymentDetails,
  onUpdateInvoicePaymentEntries,
  onUpdateShowPaidInvoices,
  onUpdateCustomer,
  onSaveButtonClick,
  onDismissAlert,
  modalType,
  onCloseModal,
  onDeleteButtonClick,
  onConfirmDelete,
  onCancelButtonClick,
  onConfirmCancel,
  onAmountInputBlur,
}) => {
  const actions = (
    <InvoicePaymentDetailActions
      onSaveButtonClick={onSaveButtonClick}
      onDeleteButtonClick={onDeleteButtonClick}
      onCancelButtonClick={onCancelButtonClick}
    />
  );

  const alertComponent = alertMessage && (
    <Alert type="danger" onDismiss={onDismissAlert}>
      {alertMessage}
    </Alert>
  );

  const modal = modalType && {
    [CANCEL_MODAL]: <CancelModal
      onCancel={onCloseModal}
      onConfirm={onConfirmCancel}
    />,
    [DELETE_MODAL]: <DeleteModal
      onCancel={onCloseModal}
      onConfirm={onConfirmDelete}
      title="Delete this payment?"
    />,
  }[modalType];

  const view = (
    <React.Fragment>
      {modal}
      <LineItemTemplate
        pageHead="Invoice payment"
        options={(
          <InvoicePaymentDetailOptions
            onUpdateInvoicePaymentDetails={onUpdateInvoicePaymentDetails}
            onUpdateShowPaidInvoices={onUpdateShowPaidInvoices}
            onUpdateCustomer={onUpdateCustomer}
          />)}
        actions={actions}
        alert={alertComponent}
        sticky="none"
      >
        <InvoicePaymentDetailTable
          onUpdateInvoicePaymentEntries={onUpdateInvoicePaymentEntries}
          onAmountInputBlur={onAmountInputBlur}
        />
      </LineItemTemplate>
    </React.Fragment>
  );

  return <PageView isLoading={isLoading} view={view} />;
};

const mapStateToProps = state => ({
  isLoading: getIsLoading(state),
  alertMessage: getAlertMessage(state),
  modalType: getModalType(state),
});

export default connect(mapStateToProps)(InvoicePaymentDetailView);
