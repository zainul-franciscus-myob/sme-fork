import { Alert, LineItemTemplate } from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';

import { getAlertMessage, getIsLoading, getModalType } from '../BillPaymentDetailSelectors';
import BillPaymentActions from './BillPaymentDetailActions';
import BillPaymentDetailTable from './BillPaymentDetailTable';
import BillPaymentOptions from './BillPaymentDetailOptions';
import CancelModal from '../../../../components/modal/CancelModal';
import DeleteModal from '../../../../components/modal/DeleteModal';
import PageView from '../../../../components/PageView/PageView';

const BillPaymentDetailView = ({
  isLoading,
  modalType,
  onUpdateHeaderOption,
  onUpdateTableInputField,
  onCancelButtonClick,
  onDeleteButtonClick,
  onSaveButtonClick,
  onAmountInputBlur,
  onCancelModal,
  onCloseModal,
  onDeleteModal,
  alertMessage,
  onDismissAlert,
}) => {
  let modal;
  if (modalType === 'cancel') {
    modal = (
      <CancelModal
        onCancel={onCloseModal}
        onConfirm={onCancelModal}
      />
    );
  } else if (modalType === 'delete') {
    modal = (
      <DeleteModal
        onCancel={onCloseModal}
        onConfirm={onDeleteModal}
        title="Delete this payment?"
      />
    );
  }

  const alertComponent = alertMessage && (
    <Alert type="danger" onDismiss={onDismissAlert}>
      {alertMessage}
    </Alert>
  );

  const actions = (
    <BillPaymentActions
      onCancelButtonClick={onCancelButtonClick}
      onDeleteButtonClick={onDeleteButtonClick}
      onSaveButtonClick={onSaveButtonClick}
    />
  );

  const view = (
    <LineItemTemplate
      pageHead="Bill payment"
      options={<BillPaymentOptions onUpdateHeaderOption={onUpdateHeaderOption} />}
      actions={actions}
      alert={alertComponent}
    >
      {modal}
      <BillPaymentDetailTable
        onUpdateTableInputField={onUpdateTableInputField}
        onAmountInputBlur={onAmountInputBlur}
      />
    </LineItemTemplate>
  );

  return <PageView isLoading={isLoading} view={view} />;
};

const mapStateToProps = state => ({
  isLoading: getIsLoading(state),
  modalType: getModalType(state),
  alertMessage: getAlertMessage(state),
});

export default connect(mapStateToProps)(BillPaymentDetailView);
