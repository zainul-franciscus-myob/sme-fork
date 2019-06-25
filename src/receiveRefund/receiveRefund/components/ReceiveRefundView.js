import { Alert, FormTemplate, Spinner } from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';

import { getAlert, getIsLoading, getModalType } from '../receiveRefundSelectors';
import ReceiveRefundModal from './ReceiveRefundModal';
import RefundActions from './ReceiveRefundActions';
import RefundDetail from './ReceiveRefundDetail';

const ReceiveRefundView = (props) => {
  const {
    alert,
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

  const alertComponent = alert && (
    <Alert type={alert.type} onDismiss={onDismissAlert}>
      {alert.message}
    </Alert>
  );

  const modal = modalType && (
    <ReceiveRefundModal
      modalType={modalType}
      onCloseModal={onCloseModal}
      onConfirmCancel={onConfirmCancel}
      onConfirmDelete={onConfirmDelete}
    />
  );

  const view = (
    <FormTemplate pageHead="Receive refund" alert={alertComponent}>
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
  isLoading: getIsLoading(state),
  modalType: getModalType(state),
});

export default connect(mapStateToProps)(ReceiveRefundView);
