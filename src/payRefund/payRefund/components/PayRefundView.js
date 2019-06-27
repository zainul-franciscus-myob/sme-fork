import { Alert, FormTemplate, Spinner } from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';

import {
  getAlert, getIsCreating, getIsLoading, getModalType,
} from '../payRefundSelectors';
import PayRefundModal from './PayRefundModal';
import RefundActions from './PayRefundActions';
import RefundDetail from './PayRefundDetail';

const PayRefundView = (props) => {
  const {
    alert,
    isCreating,
    isLoading,
    modalType,
    onDismissAlert,
    onConfirmCancel,
    onConfirmDelete,
    onCloseModal,
    onRefundDetailsChange,
    onSaveButtonClick,
    onCancelButtonClick,
    onDeleteButtonClick,
  } = props;

  const pageHead = isCreating ? 'Record customer refund' : 'Customer refund';

  const alertComponent = alert && (
    <Alert type={alert.type} onDismiss={onDismissAlert}>
      {alert.message}
    </Alert>
  );

  const modal = modalType && (
    <PayRefundModal
      modalType={modalType}
      onCloseModal={onCloseModal}
      onConfirmCancel={onConfirmCancel}
      onConfirmDelete={onConfirmDelete}
    />
  );

  const view = (
    <FormTemplate pageHead={pageHead} alert={alertComponent}>
      {modal}
      <RefundDetail onRefundDetailsChange={onRefundDetailsChange} />
      <RefundActions
        onSaveButtonClick={onSaveButtonClick}
        onCancelButtonClick={onCancelButtonClick}
        onDeleteButtonClick={onDeleteButtonClick}
      />
    </FormTemplate>
  );

  return (isLoading ? <Spinner /> : view);
};

const mapStateToProps = state => ({
  alert: getAlert(state),
  isCreating: getIsCreating(state),
  isLoading: getIsLoading(state),
  modalType: getModalType(state),
});

export default connect(mapStateToProps)(PayRefundView);
