import { Alert, FormTemplate } from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';

import {
  getAlert, getIsCreating, getIsLoading, getModalType,
} from '../receiveRefundSelectors';
import PageView from '../../../components/PageView/PageView';
import ReceiveRefundModal from './ReceiveRefundModal';
import RefundActions from './ReceiveRefundActions';
import RefundDetail from './ReceiveRefundDetail';

const ReceiveRefundView = (props) => {
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

  const pageHead = isCreating ? 'Receive refund' : 'Received refund';

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

  return <PageView isLoading={isLoading} view={view} />;
};

const mapStateToProps = state => ({
  alert: getAlert(state),
  isCreating: getIsCreating(state),
  isLoading: getIsLoading(state),
  modalType: getModalType(state),
});

export default connect(mapStateToProps)(ReceiveRefundView);
