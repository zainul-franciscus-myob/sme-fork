import { Alert, LineItemTemplate, Spinner } from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';

import { getAlertMessage, getIsLoading, getModalType } from '../applyToSaleSelectors';
import ApplyToSaleActions from './ApplyToSaleActions';
import ApplyToSaleModal from './ApplyToSaleModal';
import ApplyToSaleOptions from './ApplyToSaleOptions';
import ApplyToSaleTable from './ApplyToSaleTable';

const ApplyToSaleView = ({
  isLoading,
  modalType,
  alertMessage,
  onUpdateApplyToSaleOption,
  onUpdateTableAmountInput,
  onBlurTableAmountInput,
  onSaveButtonClick,
  onCancelButtonClick,
  onDeleteButtonClick,
  onDismissModal,
  onDismissAlert,
  onConfirmCancelButtonClick,
  onConfirmDeleteButtonClick,
}) => {
  const view = (
    <LineItemTemplate
      pageHead="Apply to sale"
      options={(
        <ApplyToSaleOptions
          onUpdateApplyToSaleOption={onUpdateApplyToSaleOption}
        />
      )}
      actions={(
        <ApplyToSaleActions
          onSaveButtonClick={onSaveButtonClick}
          onCancelButtonClick={onCancelButtonClick}
          onDeleteButtonClick={onDeleteButtonClick}
        />
      )}
      alert={alertMessage && (
        <Alert type="danger" onDismiss={onDismissAlert}>
          {alertMessage}
        </Alert>
      )}
    >
      {modalType && (
      <ApplyToSaleModal
        onDismissModal={onDismissModal}
        onConfirmCancelButtonClick={onConfirmCancelButtonClick}
        onConfirmDeleteButtonClick={onConfirmDeleteButtonClick}
      />
      )}
      <ApplyToSaleTable
        onUpdateTableAmountInput={onUpdateTableAmountInput}
        onBlurTableAmountInput={onBlurTableAmountInput}
      />
    </LineItemTemplate>
  );

  return isLoading ? <Spinner /> : view;
};

const mapStateToProps = state => ({
  isLoading: getIsLoading(state),
  modalType: getModalType(state),
  alertMessage: getAlertMessage(state),
});

export default connect(mapStateToProps)(ApplyToSaleView);
