import {
  Alert, LineItemTemplate, Spinner,
} from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';

import {
  getAlertMessage,
  getIsCreating,
  getIsLoading,
  getModalType,
} from '../SupplierReturnPurchaseSelector';
import SupplierReturnPurchaseActions from './SupplierReturnPurchaseActions';
import SupplierReturnPurchaseModal from './SupplierReturnPurchaseModal';
import SupplierReturnPurchaseOptions from './SupplierReturnPurchaseOptions';
import SupplierReturnPurchaseTable from './SupplierReturnPurchaseTable';

const SupplierReturnPurchaseView = ({
  isLoading,
  isCreating,
  modalType,
  alertMessage,
  onCloseModal,
  onConfirmCancel,
  onConfirmDelete,
  onDismissAlert,
  onSaveButtonClick,
  onCancelButtonClick,
  onDeleteButtonClick,
  onUpdatePurchaseOptions,
  onUpdateTableAmountFields,
  onFormatAmountInput,
}) => {
  const alertComponent = alertMessage && (
    <Alert type="danger" onDismiss={onDismissAlert}>
      {alertMessage}
    </Alert>
  );

  const modal = modalType && (
    <SupplierReturnPurchaseModal
      modalType={modalType}
      onCloseModal={onCloseModal}
      onConfirmCancel={onConfirmCancel}
      onConfirmDelete={onConfirmDelete}
    />
  );

  const actions = (
    <SupplierReturnPurchaseActions
      onSaveButtonClick={onSaveButtonClick}
      onCancelButtonClick={onCancelButtonClick}
      onDeleteButtonClick={onDeleteButtonClick}
    />
  );

  const pageHead = isCreating ? 'Apply to purchase' : 'Applied to purchase';

  const view = (
    <React.Fragment>
      <LineItemTemplate
        pageHead={pageHead}
        options={(
          <SupplierReturnPurchaseOptions onUpdatePurchaseOptions={onUpdatePurchaseOptions} />)}
        actions={actions}
        alert={alertComponent}
      >
        {modal}
        <SupplierReturnPurchaseTable
          onUpdateTableAmountFields={onUpdateTableAmountFields}
          onFormatAmountInput={onFormatAmountInput}
        />
      </LineItemTemplate>
    </React.Fragment>
  );

  return isLoading ? <Spinner /> : view;
};

const mapStateToProps = state => ({
  isLoading: getIsLoading(state),
  isCreating: getIsCreating(state),
  modalType: getModalType(state),
  alertMessage: getAlertMessage(state),
});

export default connect(mapStateToProps)(SupplierReturnPurchaseView);
