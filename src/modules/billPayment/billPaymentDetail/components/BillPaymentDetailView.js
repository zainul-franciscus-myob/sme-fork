import { Alert, Checkbox, Separator } from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';

import {
  getAlertMessage,
  getIsCreating,
  getIsPayBillRemittanceAdviceEnabled,
  getLoadingState,
  getModalType,
  getShouldSendRemittance,
  getTitle,
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
import handleCheckboxChange from '../../../../components/handlers/handleCheckboxChange';

const BillPaymentDetailView = ({
  loadingState,
  modalType,
  title,
  onUpdateIsElectronicPayment,
  isCreating,
  isPayBillRemittanceAdviceEnabled,
  renderContactCombobox,
  onChangeBankStatementText,
  onChangeReferenceId,
  onUpdateHeaderOption,
  onUpdateBankStatementText,
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
  shouldSendRemittance,
  onShouldSendRemittanceChange,
}) => {
  let modal;
  if (modalType === 'cancel') {
    modal = <CancelModal onCancel={onCloseModal} onConfirm={onCancelModal} />;
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

  const sendRemittance = (
    <>
      <Checkbox
        name="shouldSendRemittanceAdvice"
        label="Send remittance advice"
        checked={shouldSendRemittance}
        onChange={handleCheckboxChange(onShouldSendRemittanceChange)}
      />
      <br />
      {shouldSendRemittance && (
        <Alert type="info">
          {
            "You'll have the option to send by email or export a PDF when you save this payment."
          }
          <a href="TBC">&nbsp;Learn more</a>
        </Alert>
      )}
    </>
  );

  const view = (
    <LineItemTemplate
      pageHead={title}
      options={
        <BillPaymentOptions
          onUpdateIsElectronicPayment={onUpdateIsElectronicPayment}
          renderContactCombobox={renderContactCombobox}
          onChangeBankStatementText={onChangeBankStatementText}
          onUpdateBankStatementText={onUpdateBankStatementText}
          onUpdateHeaderOption={onUpdateHeaderOption}
          onChangeReferenceId={onChangeReferenceId}
        />
      }
      actions={actions}
      alert={alertComponent}
      sticky="none"
    >
      {modal}
      {isCreating && (
        <BillPaymentDetailTableOptions
          onUpdateHeaderOption={onUpdateHeaderOption}
        />
      )}
      <BillPaymentDetailTable
        onUpdateTableInputField={onUpdateTableInputField}
      />
      <Separator />
      {isPayBillRemittanceAdviceEnabled && isCreating && sendRemittance}
    </LineItemTemplate>
  );

  return <PageView loadingState={loadingState} view={view} />;
};

const mapStateToProps = (state) => ({
  loadingState: getLoadingState(state),
  modalType: getModalType(state),
  alertMessage: getAlertMessage(state),
  title: getTitle(state),
  isCreating: getIsCreating(state),
  shouldSendRemittance: getShouldSendRemittance(state),
  isPayBillRemittanceAdviceEnabled: getIsPayBillRemittanceAdviceEnabled(state),
});

export default connect(mapStateToProps)(BillPaymentDetailView);
