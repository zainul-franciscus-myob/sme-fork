import {
  Alert, LineItemTemplate, Spinner,
} from '@myob/myob-widgets';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import React from 'react';

import { CANCEL_MODAL, DELETE_MODAL } from '../../InvoicePaymentModalTypes';
import {
  getAlertMessage,
  getIsLoading,
  getModalType,
} from '../invoicePaymentDetailSelectors';
import CancelModal from '../../../components/modal/CancelModal';
import DeleteModal from '../../../components/modal/DeleteModal';
import InvoicePaymentDetailActions from './InvoicePaymentDetailActions';
import InvoicePaymentDetailOptions from './InvoicePaymentDetailOptions';
import InvoicePaymentDetailTable from './InvoicePaymentDetailTable';

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
      title="Cancel invoice payment alterations"
      description="Are you sure you want to cancel the alterations in this invoice payment?"
    />,
    [DELETE_MODAL]: <DeleteModal
      onCancel={onCloseModal}
      onConfirm={onConfirmDelete}
      title="Delete invoice payment"
      description="Are you sure you want to delete this invoice payment transaction?"
    />,
  }[modalType];

  return isLoading ? <Spinner /> : (
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
};

InvoicePaymentDetailView.propTypes = {
  onUpdateInvoicePaymentDetails: PropTypes.func.isRequired,
  onUpdateInvoicePaymentEntries: PropTypes.func.isRequired,
  onUpdateShowPaidInvoices: PropTypes.func.isRequired,
  onUpdateCustomer: PropTypes.func.isRequired,
  onSaveButtonClick: PropTypes.func.isRequired,
  onDeleteButtonClick: PropTypes.func.isRequired,
  onConfirmDelete: PropTypes.func.isRequired,
  onCloseModal: PropTypes.func.isRequired,
  onCancelButtonClick: PropTypes.func.isRequired,
  onConfirmCancel: PropTypes.func.isRequired,
  onDismissAlert: PropTypes.func.isRequired,
  onAmountInputBlur: PropTypes.func.isRequired,
  isLoading: PropTypes.bool.isRequired,
  alertMessage: PropTypes.string.isRequired,
  modalType: PropTypes.string.isRequired,
};

const mapStateToProps = state => ({
  isLoading: getIsLoading(state),
  alertMessage: getAlertMessage(state),
  modalType: getModalType(state),
});

export default connect(mapStateToProps)(InvoicePaymentDetailView);
