import { LineItemTemplate, Spinner } from '@myob/myob-widgets';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import React from 'react';

import { getAlertMessage, getIsLoading, getModalType } from '../spendMoneyDetailSelectors';
import CancelModal from './SpendMoneyDetailCancelModal';
import DeleteModal from './SpendMoneyDetailDeleteModal';
import SpendMoneyDetailActions from './SpendMoneyDetailActions';
import SpendMoneyDetailAlert from './SpendMoneyDetailAlert';
import SpendMoneyDetailOptions from './SpendMoneyDetailOptions';
import SpendMoneyDetailTable from './SpendMoneyDetailTable';

const SpendMoneyDetailView = ({
  onUpdateHeaderOptions,
  onSaveButtonClick,
  onCancelButtonClick,
  onDeleteButtonClick,
  onCancelModal,
  onCloseModal,
  alertMessage,
  onDismissAlert,
  isCreating,
  isLoading,
  onDeleteModal,
  modalType,
  onUpdateRow,
  onAddRow,
  onRemoveRow,
  onRowInputBlur,
}) => {
  const templateOptions = (
    <SpendMoneyDetailOptions
      onUpdateHeaderOptions={onUpdateHeaderOptions}
    />
  );

  const actions = (
    <SpendMoneyDetailActions
      isCreating={isCreating}
      onSaveButtonClick={onSaveButtonClick}
      onCancelButtonClick={onCancelButtonClick}
      onDeleteButtonClick={onDeleteButtonClick}
    />
  );

  const alertComponent = alertMessage && (
    <SpendMoneyDetailAlert type="danger" onDismiss={onDismissAlert}>
      {alertMessage}
    </SpendMoneyDetailAlert>
  );

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
      />
    );
  }

  const view = (
    <React.Fragment>

      {alertComponent}
      <LineItemTemplate
        pageHead="Spend Money Entry"
        options={templateOptions}
        actions={actions}
      >
        { modal }
        <SpendMoneyDetailTable
          onUpdateRow={onUpdateRow}
          onAddRow={onAddRow}
          onRemoveRow={onRemoveRow}
          onRowInputBlur={onRowInputBlur}
        />

      </LineItemTemplate>
    </React.Fragment>
  );

  return (
    isLoading ? <Spinner /> : view
  );
};

SpendMoneyDetailView.propTypes = {
  isCreating: PropTypes.bool.isRequired,
  isLoading: PropTypes.bool.isRequired,
  alertMessage: PropTypes.string.isRequired,
  modalType: PropTypes.string.isRequired,
  onUpdateHeaderOptions: PropTypes.func.isRequired,
  onSaveButtonClick: PropTypes.func.isRequired,
  onCancelButtonClick: PropTypes.func.isRequired,
  onDeleteButtonClick: PropTypes.func.isRequired,
  onCancelModal: PropTypes.func.isRequired,
  onDeleteModal: PropTypes.func.isRequired,
  onCloseModal: PropTypes.func.isRequired,
  onDismissAlert: PropTypes.func.isRequired,
  onUpdateRow: PropTypes.func.isRequired,
  onAddRow: PropTypes.func.isRequired,
  onRemoveRow: PropTypes.func.isRequired,
  onRowInputBlur: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  alertMessage: getAlertMessage(state),
  modalType: getModalType(state),
  isLoading: getIsLoading(state),
});

export default connect(mapStateToProps)(SpendMoneyDetailView);
