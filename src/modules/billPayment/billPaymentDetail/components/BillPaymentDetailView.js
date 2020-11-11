import { Alert, Checkbox, Separator } from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';

import {
  getAlertMessage,
  getIsCreating,
  getIsRemittanceAdviceEnabled,
  getLoadingState,
  getModalType,
  getRemittanceAdviceType,
  getShouldSendRemittanceAdvice,
  getShouldShowAlertMessage,
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
import RemittanceAdviceModal from './RemittanceAdviceModal';
import UnsavedModal from '../../../../components/modal/UnsavedModal';
import billPaymentModalTypes from '../billPaymentModalTypes';
import handleCheckboxChange from '../../../../components/handlers/handleCheckboxChange';
import remittanceAdviceTypes from '../remittanceAdviceTypes';

const BillPaymentDetailView = ({
  loadingState,
  modalType,
  title,
  onRemittanceAdviceDetailsChange,
  onUpdateIsElectronicPayment,
  isCreating,
  isRemittanceAdviceEnabled,
  renderContactCombobox,
  onChangeBankStatementText,
  onChangeReferenceId,
  onUpdateHeaderOption,
  onUpdateBankStatementText,
  onUpdateTableInputField,
  onCancelButtonClick,
  onDeleteButtonClick,
  onCloseRemittanceAdviceModal,
  onUpdateRemittanceAdviceType,
  onRemittanceAdviceClick,
  onSaveButtonClick,
  onSendRemittanceAdviceEmail,
  onDownloadRemittanceAdvicePdf,
  onConfirmSaveAndRedirect,
  onDiscardAndRedirect,
  onCloseUnsaveModal,
  onCancelModal,
  onCloseModal,
  onDeleteModal,
  alertMessage,
  onDismissAlert,
  remittanceAdviceType,
  shouldSendRemittanceAdvice,
  shouldShowAlertMessage,
  onShouldSendRemittanceAdviceChange,
}) => {
  let modal;
  if (modalType === billPaymentModalTypes.cancel) {
    modal = <CancelModal onCancel={onCloseModal} onConfirm={onCancelModal} />;
  } else if (modalType === billPaymentModalTypes.delete) {
    modal = (
      <DeleteModal
        onCancel={onCloseModal}
        onConfirm={onDeleteModal}
        title="Delete this payment?"
      />
    );
  } else if (modalType === billPaymentModalTypes.unsaved) {
    modal = (
      <UnsavedModal
        onConfirmSave={onConfirmSaveAndRedirect}
        onConfirmUnsave={onDiscardAndRedirect}
        onCancel={onCloseUnsaveModal}
        title="Record changes?"
        description="Looks like you've made changes. Do you want to record these changes?"
      />
    );
  } else if (modalType === billPaymentModalTypes.remittanceAdvice) {
    modal = (
      <RemittanceAdviceModal
        alertMessage={alertMessage}
        onConfirm={
          remittanceAdviceType === remittanceAdviceTypes.email
            ? onSendRemittanceAdviceEmail
            : onDownloadRemittanceAdvicePdf
        }
        onCancel={onCloseRemittanceAdviceModal}
        onDismissAlert={onDismissAlert}
        onUpdateRemittanceAdviceType={onUpdateRemittanceAdviceType}
        onRemittanceAdviceDetailsChange={onRemittanceAdviceDetailsChange}
      />
    );
  }

  const actions = (
    <BillPaymentActions
      onCancelButtonClick={onCancelButtonClick}
      onDeleteButtonClick={onDeleteButtonClick}
      onSaveButtonClick={onSaveButtonClick}
      onRemittanceAdviceClick={onRemittanceAdviceClick}
    />
  );

  const shouldSendRemittanceAdviceCheckbox = (
    <>
      <Checkbox
        name="shouldSendRemittanceAdvice"
        label="Send remittance advice"
        checked={shouldSendRemittanceAdvice}
        onChange={handleCheckboxChange(onShouldSendRemittanceAdviceChange)}
      />
      <br />
      {shouldSendRemittanceAdvice && (
        <Alert type="info">
          You&#39;ll have the option to send by email or export a PDF when you
          save this payment.&nbsp;
          <a
            href="https://help.myob.com/wiki/x/TA5XAw"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn more
          </a>
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
      sticky="none"
      actions={actions}
      alert={
        shouldShowAlertMessage && (
          <Alert type={alertMessage.type} onDismiss={onDismissAlert}>
            {alertMessage.message}
          </Alert>
        )
      }
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
      {isRemittanceAdviceEnabled &&
        isCreating &&
        shouldSendRemittanceAdviceCheckbox}
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
  shouldSendRemittanceAdvice: getShouldSendRemittanceAdvice(state),
  isRemittanceAdviceEnabled: getIsRemittanceAdviceEnabled(state),
  remittanceAdviceType: getRemittanceAdviceType(state),
  shouldShowAlertMessage: getShouldShowAlertMessage(state),
});

export default connect(mapStateToProps)(BillPaymentDetailView);
