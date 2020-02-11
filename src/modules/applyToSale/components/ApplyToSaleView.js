import { Alert } from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';

import {
  getAlertMessage, getIsLoading, getModalType, getTitle,
} from '../applyToSaleSelectors';
import ApplyToSaleActions from './ApplyToSaleActions';
import ApplyToSaleModal from './ApplyToSaleModal';
import ApplyToSaleOptions from './ApplyToSaleOptions';
import ApplyToSaleTable from './ApplyToSaleTable';
import LineItemTemplate from '../../../components/Feelix/LineItemTemplate/LineItemTemplate';
import PageView from '../../../components/PageView/PageView';

const ApplyToSaleView = ({
  isLoading,
  modalType,
  alertMessage,
  title,
  onUpdateApplyToSaleOption,
  onUpdateTableAmountInput,
  onBlurTableAmountInput,
  onSaveButtonClick,
  onCancelButtonClick,
  onDeleteButtonClick,
  onGoBackButtonClick,
  onDismissModal,
  onDismissAlert,
  onConfirmCancelButtonClick,
  onConfirmDeleteButtonClick,
}) => {
  const view = (
    <LineItemTemplate
      pageHead={title}
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
          onGoBackButtonClick={onGoBackButtonClick}
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

  return <PageView isLoading={isLoading} view={view} />;
};

const mapStateToProps = state => ({
  isLoading: getIsLoading(state),
  modalType: getModalType(state),
  alertMessage: getAlertMessage(state),
  title: getTitle(state),
});

export default connect(mapStateToProps)(ApplyToSaleView);
