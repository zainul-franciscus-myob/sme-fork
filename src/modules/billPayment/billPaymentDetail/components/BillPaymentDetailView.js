import { Alert, LineItemTemplate } from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';

import {
  getAlertMessage, getLoadingState, getModalType, getTitle,
} from '../BillPaymentDetailSelectors';
import BillPaymentActions from './BillPaymentDetailActions';
import BillPaymentDetailTable from './BillPaymentDetailTable';
import BillPaymentDetailTableOptions from './BillPaymentDetailTableOptions';
import BillPaymentOptions from './BillPaymentDetailOptions';
import CancelModal from '../../../../components/modal/CancelModal';
import DeleteModal from '../../../../components/modal/DeleteModal';
import PageView from '../../../../components/PageView/PageView';

const BillPaymentDetailView = ({
  loadingState,
  modalType,
  title,
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
      pageHead={title}
      options={<BillPaymentOptions onUpdateHeaderOption={onUpdateHeaderOption} />}
      actions={actions}
      alert={alertComponent}
    >
      {modal}
      <BillPaymentDetailTableOptions onUpdateHeaderOption={onUpdateHeaderOption} />
      <BillPaymentDetailTable
        onUpdateTableInputField={onUpdateTableInputField}
        onAmountInputBlur={onAmountInputBlur}
      />
    </LineItemTemplate>
  );

  return <PageView loadingState={loadingState} view={view} />;
};

const mapStateToProps = state => ({
  loadingState: getLoadingState(state),
  modalType: getModalType(state),
  alertMessage: getAlertMessage(state),
  title: getTitle(state),
});

export default connect(mapStateToProps)(BillPaymentDetailView);
