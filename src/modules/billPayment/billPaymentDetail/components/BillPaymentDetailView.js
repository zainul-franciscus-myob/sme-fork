import { Alert, Checkbox, Separator } from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';

import {
  getAlertMessage,
  getIsCreating,
  getIsRemittanceAdviceEnabled,
  getLoadingState,
  getModalType,
  getRemittanceAdviceEmailDetails,
  getRemittanceAdviceType,
  getShouldSendRemittanceAdvice,
  getShouldShowAlertMessage,
  getTemplateOptions,
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

const BillPaymentDetailView = ({
  remittanceAdviceEmailDetails,
  loadingState,
  modalType,
  title,
  onRemittanceAdviceEmailDetailsChange,
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
  onConfirmEmailRemittanceAdviceModal,
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
  templateOptions,
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
        onConfirm={onConfirmEmailRemittanceAdviceModal}
        onCancel={onCloseRemittanceAdviceModal}
        onDismissAlert={onDismissAlert}
        remittanceAdviceType={remittanceAdviceType}
        onUpdateRemittanceAdviceType={onUpdateRemittanceAdviceType}
        remittanceAdviceEmailDetails={remittanceAdviceEmailDetails}
        onRemittanceAdviceEmailDetailsChange={
          onRemittanceAdviceEmailDetailsChange
        }
        templateOptions={templateOptions}
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
          {
            "You'll have the option to send by email or export a PDF when you save this payment."
          }
          <a href="/">&nbsp;Learn more</a>
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
          <Alert type="danger" onDismiss={onDismissAlert}>
            {alertMessage}
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
  shouldShowAlertMessage: getShouldShowAlertMessage(state),
  remittanceAdviceEmailDetails: getRemittanceAdviceEmailDetails(state),
  remittanceAdviceType: getRemittanceAdviceType(state),
  templateOptions: getTemplateOptions(state),
});

export default connect(mapStateToProps)(BillPaymentDetailView);
