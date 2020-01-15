import {
  Alert, Checkbox, CheckboxGroup, LineItemTemplate,
} from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';

import { CANCEL_MODAL, DELETE_MODAL, UNSAVED_MODAL } from '../../InvoicePaymentModalTypes';
import {
  getAlertMessage,
  getIsCreating,
  getLoadingState,
  getModal,
  getShowPaidInvoices,
} from '../invoicePaymentDetailSelectors';
import CancelModal from '../../../../components/modal/CancelModal';
import DeleteModal from '../../../../components/modal/DeleteModal';
import InvoicePaymentDetailActions from './InvoicePaymentDetailActions';
import InvoicePaymentDetailOptions from './InvoicePaymentDetailOptions';
import InvoicePaymentDetailTable from './InvoicePaymentDetailTable';
import PageView from '../../../../components/PageView/PageView';
import UnsavedModal from '../../../../components/modal/UnsavedModal';

const handleCheckboxChange = handler => (e) => {
  const { checked } = e.target;
  handler(checked);
};

const InvoicePaymentDetailView = ({
  alertMessage,
  loadingState,
  isCreating,
  showPaidInvoices,
  onUpdateInvoicePaymentDetails,
  onUpdateInvoicePaymentEntries,
  onUpdateShowPaidInvoices,
  onUpdateCustomer,
  onSaveButtonClick,
  onDismissAlert,
  modal,
  onCloseModal,
  onDeleteButtonClick,
  onConfirmDelete,
  onCancelButtonClick,
  onConfirmCancel,
  onConfirmSaveButtonClick,
  onConfirmUnsaveButtonClick,
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

  const modalComponent = modal && {
    [CANCEL_MODAL]: <CancelModal
      onCancel={onCloseModal}
      onConfirm={onConfirmCancel}
    />,
    [DELETE_MODAL]: <DeleteModal
      onCancel={onCloseModal}
      onConfirm={onConfirmDelete}
      title="Delete this payment?"
    />,
    [UNSAVED_MODAL]: <UnsavedModal
      onConfirmSave={onConfirmSaveButtonClick}
      onConfirmUnsave={onConfirmUnsaveButtonClick}
      onCancel={onCloseModal}
    />,
  }[modal.type];

  const view = (
    <React.Fragment>
      {modalComponent}
      <LineItemTemplate
        pageHead="Record payment from customer"
        options={(
          <InvoicePaymentDetailOptions
            onUpdateInvoicePaymentDetails={onUpdateInvoicePaymentDetails}
            onUpdateCustomer={onUpdateCustomer}
          />)}
        actions={actions}
        alert={alertComponent}
        sticky="none"
      >
        <CheckboxGroup
          renderCheckbox={() => (
            <Checkbox
              name="showPaidInvoices"
              label="Show closed invoices"
              checked={showPaidInvoices}
              disabled={!isCreating}
              onChange={handleCheckboxChange(onUpdateShowPaidInvoices)}
            />)
          }
        />
        <InvoicePaymentDetailTable
          onUpdateInvoicePaymentEntries={onUpdateInvoicePaymentEntries}
          onAmountInputBlur={onAmountInputBlur}
        />
      </LineItemTemplate>
    </React.Fragment>
  );

  return <PageView loadingState={loadingState} view={view} />;
};

const mapStateToProps = state => ({
  loadingState: getLoadingState(state),
  isCreating: getIsCreating(state),
  alertMessage: getAlertMessage(state),
  modal: getModal(state),
  showPaidInvoices: getShowPaidInvoices(state),
});

export default connect(mapStateToProps)(InvoicePaymentDetailView);
