import {
  Alert, Columns, LineItemTemplate,
} from '@myob/myob-widgets';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import React from 'react';

import {
  getAlertMessage, getIsCreating, getModalType,
} from '../invoiceServiceSelectors';
import CancelModal from '../../../../components/modal/CancelModal';
import DeleteModal from '../../../../components/modal/DeleteModal';
import InvoiceServiceActions from './InvoiceServiceActions';
import InvoiceServiceOptions from './InvoiceServiceOptions';
import InvoiceServiceTable from './InvoiceServiceTable';

const InvoiceServiceView = ({
  isCreating,
  onUpdateHeaderOptions,
  onUpdateRow,
  onAddRow,
  onRowInputBlur,
  onRemoveRow,
  onSaveButtonClick,
  onCancelButtonClick,
  onDeleteButtonClick,
  modalType,
  onCancelModal,
  onCloseModal,
  alertMessage,
  onDismissAlert,
  onDeleteModal,
}) => {
  const templateOptions = (
    <Columns type="three">
      <InvoiceServiceOptions
        onUpdateHeaderOptions={onUpdateHeaderOptions}
      />
    </Columns>
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
        title="Cancel invoice alterations"
        description="Are you sure you want to cancel the alterations in this invoice?"
      />
    );
  } else if (modalType === 'delete') {
    modal = (
      <DeleteModal
        onCancel={onCloseModal}
        onConfirm={onDeleteModal}
        title="Delete invoice"
        description="Are you sure you want to delete this invoice?"
      />
    );
  }

  const actions = (
    <InvoiceServiceActions
      isCreating={isCreating}
      onSaveButtonClick={onSaveButtonClick}
      onCancelButtonClick={onCancelButtonClick}
      onDeleteButtonClick={onDeleteButtonClick}
    />
  );

  const view = (
    <LineItemTemplate pageHead="Invoice" alert={alertComponent} options={templateOptions} actions={actions}>
      {modal}
      <InvoiceServiceTable
        onUpdateRow={onUpdateRow}
        onAddRow={onAddRow}
        onRemoveRow={onRemoveRow}
        onRowInputBlur={onRowInputBlur}
      />
    </LineItemTemplate>
  );

  return view;
};

InvoiceServiceView.propTypes = {
  isCreating: PropTypes.bool.isRequired,
  onUpdateHeaderOptions: PropTypes.func.isRequired,
  onUpdateRow: PropTypes.func.isRequired,
  onAddRow: PropTypes.func.isRequired,
  onRowInputBlur: PropTypes.func.isRequired,
  onRemoveRow: PropTypes.func.isRequired,
  onCancelButtonClick: PropTypes.func.isRequired,
  onSaveButtonClick: PropTypes.func.isRequired,
  onDeleteButtonClick: PropTypes.func.isRequired,
  modalType: PropTypes.string.isRequired,
  alertMessage: PropTypes.string.isRequired,
  onDismissAlert: PropTypes.func.isRequired,
  onDeleteModal: PropTypes.func.isRequired,
  onCloseModal: PropTypes.func.isRequired,
  onCancelModal: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  isCreating: getIsCreating(state),
  modalType: getModalType(state),
  alertMessage: getAlertMessage(state),
});

export default connect(mapStateToProps)(InvoiceServiceView);
