import { Alert, Checkbox, Separator, Tooltip } from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';

import {
  getAlertMessage,
  getIsCreating,
  getLoadingState,
  getModalType,
  getRemittanceAdviceType,
  getSendRemittanceAdviceNow,
  getShouldSendRemittanceAdvice,
  getShouldShowAlertMessage,
  getTitle,
} from '../SupplierPaymentDetailSelectors';
import BooleanRadioButtonGroup from '../../../../components/BooleanRadioButtonGroup/BooleanRadioButtonGroup';
import CancelModal from '../../../../components/modal/CancelModal';
import DeleteModal from '../../../../components/modal/DeleteModal';
import LineItemTemplate from '../../../../components/Feelix/LineItemTemplate/LineItemTemplate';
import PageView from '../../../../components/PageView/PageView';
import RemittanceAdviceModal from './RemittanceAdviceModal';
import SupplierPaymentActions from './SupplierPaymentDetailActions';
import SupplierPaymentDetailTable from './SupplierPaymentDetailTable';
import SupplierPaymentDetailTableOptions from './SupplierPaymentDetailTableOptions';
import SupplierPaymentOptions from './SupplierPaymentDetailOptions';
import UnsavedModal from '../../../../components/modal/UnsavedModal';
import handleCheckboxChange from '../../../../components/handlers/handleCheckboxChange';
import remittanceAdviceTypes from '../remittanceAdviceTypes';
import supplierPaymentModalTypes from '../supplierPaymentModalTypes';

const SupplierPaymentDetailView = ({
  loadingState,
  modalType,
  title,
  onRemittanceAdviceDetailsChange,
  onUpdateIsElectronicPayment,
  isCreating,
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
  sendRemittanceAdviceNow,
  shouldSendRemittanceAdvice,
  shouldShowAlertMessage,
  onSendRemittanceAdviceNowChange,
  onShouldSendRemittanceAdviceChange,
  isBulkRemittanceAdviceEnabled,
}) => {
  let modal;
  if (modalType === supplierPaymentModalTypes.cancel) {
    modal = <CancelModal onCancel={onCloseModal} onConfirm={onCancelModal} />;
  } else if (modalType === supplierPaymentModalTypes.delete) {
    modal = (
      <DeleteModal
        onCancel={onCloseModal}
        onConfirm={onDeleteModal}
        title="Delete this payment?"
      />
    );
  } else if (modalType === supplierPaymentModalTypes.unsaved) {
    modal = (
      <UnsavedModal
        onConfirmSave={onConfirmSaveAndRedirect}
        onConfirmUnsave={onDiscardAndRedirect}
        onCancel={onCloseUnsaveModal}
        title="Record changes?"
        description="Looks like you've made changes. Do you want to record these changes?"
      />
    );
  } else if (modalType === supplierPaymentModalTypes.remittanceAdvice) {
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
    <SupplierPaymentActions
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
        labelAccessory={<Tooltip>Send by email or download as PDF</Tooltip>}
      />

      {shouldSendRemittanceAdvice && (
        <>
          {isBulkRemittanceAdviceEnabled && (
            <BooleanRadioButtonGroup
              name="sendRemittanceAdviceTiming"
              value={sendRemittanceAdviceNow}
              trueLabel="Send now"
              falseLabel="Send later"
              disabled={!shouldSendRemittanceAdvice}
              handler={onSendRemittanceAdviceNowChange}
            />
          )}
          <br />
          <Alert type="info">
            To send in bulk later, go to{' '}
            <b>Purchases {'>'} Remittance advice</b>.&nbsp;
            <a
              href="https://help.myob.com/wiki/x/TA5XAw"
              target="_blank"
              rel="noopener noreferrer"
            >
              Learn more
            </a>
          </Alert>
        </>
      )}
    </>
  );

  const view = (
    <LineItemTemplate
      pageHead={title}
      options={
        <SupplierPaymentOptions
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
        <SupplierPaymentDetailTableOptions
          onUpdateHeaderOption={onUpdateHeaderOption}
        />
      )}
      <SupplierPaymentDetailTable
        onUpdateTableInputField={onUpdateTableInputField}
      />
      <Separator />
      {isCreating && shouldSendRemittanceAdviceCheckbox}
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
  remittanceAdviceType: getRemittanceAdviceType(state),
  shouldShowAlertMessage: getShouldShowAlertMessage(state),
  sendRemittanceAdviceNow: getSendRemittanceAdviceNow(state),
});

export default connect(mapStateToProps)(SupplierPaymentDetailView);
