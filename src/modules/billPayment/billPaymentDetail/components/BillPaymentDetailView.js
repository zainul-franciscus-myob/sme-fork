import { Alert } from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';

import {
  getAlertMessage, getIsCreating, getLoadingState, getModalType, getTitle,
} from '../BillPaymentDetailSelectors';
import BillPaymentActions from './BillPaymentDetailActions';
import BillPaymentDetailTable from './BillPaymentDetailTable';
import BillPaymentDetailTableOptions from './BillPaymentDetailTableOptions';
import BillPaymentOptions from './BillPaymentDetailOptions';
import CancelModal from '../../../../components/modal/CancelModal';
import DeleteModal from '../../../../components/modal/DeleteModal';
import LineItemTemplate from '../../../../components/Feelix/LineItemTemplate/LineItemTemplate';
import PageView from '../../../../components/PageView/PageView';
import UnsavedModal from '../../../../components/modal/UnsavedModal';

const BillPaymentDetailView = ({
  loadingState,
  modalType,
  title,
  isCreating,
  onUpdateHeaderOption,
  onBlurBankStatementText,
  onUpdateTableInputField,
  onCancelButtonClick,
  onDeleteButtonClick,
  onSaveButtonClick,
  onConfirmSaveAndRedirect,
  onDiscardAndRedirect,
  onCloseUnsaveModal,
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
  } else if (modalType === 'unsaved') {
    modal = (
      <UnsavedModal
        onConfirmSave={onConfirmSaveAndRedirect}
        onConfirmUnsave={onDiscardAndRedirect}
        onCancel={onCloseUnsaveModal}
        title="Record changes?"
        description="Looks like you've made changes. Do you want to record these changes?"
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
      options={<BillPaymentOptions
        onUpdateHeaderOption={onUpdateHeaderOption}
        onBlurBankStatementText={onBlurBankStatementText}
      />}
      actions={actions}
      alert={alertComponent}
      sticky="none"
    >
      {modal}
      {isCreating && <BillPaymentDetailTableOptions onUpdateHeaderOption={onUpdateHeaderOption} />}
      <BillPaymentDetailTable
        onUpdateTableInputField={onUpdateTableInputField}
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
  isCreating: getIsCreating(state),
});

export default connect(mapStateToProps)(BillPaymentDetailView);
