import {
  Alert, LineItemTemplate, Spinner,
} from '@myob/myob-widgets';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import React from 'react';

import { getAlertMessage, getIsLoading, getModalType } from '../spendMoneyDetailSelectors';
import CancelModal from '../../../components/modal/CancelModal';
import DeleteModal from '../../../components/modal/DeleteModal';
import SpendMoneyDetailActions from './SpendMoneyDetailActions';
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
    <Alert type="danger" onDismiss={onDismissAlert}>
      {alertMessage}
    </Alert>
  );

  let modal;
  if (modalType === 'cancel') {
    modal = (
      <CancelModal
        onCancel={onCloseModal}
        onConfirm={onCancelModal}
        title="Cancel spend money alterations"
        description="Are you sure you want to cancel the alterations in this spend money?"
      />
    );
  } else if (modalType === 'delete') {
    modal = (
      <DeleteModal
        onCancel={onCloseModal}
        onConfirm={onDeleteModal}
        title="Delete transaction"
        description="Are you sure you want delete this spend money transaction?"
      />
    );
  }

  const view = (
    <React.Fragment>
      <LineItemTemplate
        pageHead="Spend money entry"
        options={templateOptions}
        actions={actions}
        alert={alertComponent}
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
