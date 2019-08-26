import {
  Alert, LineItemTemplate, Spinner,
} from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';

import {
  getAlertMessage, getIsLoading, getModalType, getPageTitle,
} from '../receiveMoneyDetailSelectors';
import CancelModal from '../../../components/modal/CancelModal';
import DeleteModal from '../../../components/modal/DeleteModal';
import ReceiveMoneyDetailActions from './ReceiveMoneyDetailActions';
import ReceiveMoneyDetailOptions from './ReceiveMoneyDetailOptions';
import ReceiveMoneyDetailTable from './ReceiveMoneyDetailTable';

const ReceiveMoneyDetailView = ({
  onUpdateHeaderOptions,
  onSaveButtonClick,
  onCancelButtonClick,
  onDeleteButtonClick,
  onCancelModal,
  onCloseModal,
  onDeleteModal,
  alertMessage,
  onDismissAlert,
  isCreating,
  isLoading,
  pageTitle,
  modalType,
  onUpdateRow,
  onAddRow,
  onRemoveRow,
  onRowInputBlur,
}) => {
  const templateOptions = (
    <ReceiveMoneyDetailOptions onUpdateHeaderOptions={onUpdateHeaderOptions} />
  );

  const actions = (
    <ReceiveMoneyDetailActions
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
        title="Cancel receive money alterations"
        description="Are you sure you want to cancel the alterations in this receive money?"
      />
    );
  } else if (modalType === 'delete') {
    modal = (
      <DeleteModal
        onCancel={onCloseModal}
        onConfirm={onDeleteModal}
        title="Delete transaction"
        description="Are you sure you want to delete this receive money transaction?"
      />
    );
  }

  const view = (
    <React.Fragment>
      <LineItemTemplate
        pageHead={pageTitle}
        options={templateOptions}
        actions={actions}
        alert={alertComponent}
      >
        { modal }
        <ReceiveMoneyDetailTable
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

const mapStateToProps = state => ({
  alertMessage: getAlertMessage(state),
  modalType: getModalType(state),
  isLoading: getIsLoading(state),
  pageTitle: getPageTitle(state),
});

export default connect(mapStateToProps)(ReceiveMoneyDetailView);
