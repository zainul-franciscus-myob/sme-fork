import { Alert, LineItemTemplate } from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';

import {
  getAlertMessage,
  getIsLoading,
  getModalType,
  getPageTitle,
} from '../spendMoneyDetailSelectors';
import CancelModal from '../../../components/modal/CancelModal';
import DeleteModal from '../../../components/modal/DeleteModal';
import PageView from '../../../components/PageView/PageView';
import SpendMoneyAttachments from './SpendMoneyAttachments';
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
  pageTitle,
  onDeleteModal,
  modalType,
  onUpdateRow,
  onAddRow,
  onRemoveRow,
  onRowInputBlur,
  onAddAttachments,
  onRemoveAttachment,
  onDeleteAttachmentModal,
  onOpenAttachment,
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
  } else if (modalType === 'deleteAttachment') {
    modal = (
      <DeleteModal
        onCancel={onCloseModal}
        onConfirm={onDeleteAttachmentModal}
        title="Delete attachment"
        description="Are you sure you want delete this attachment?"
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
        <SpendMoneyDetailTable
          onUpdateRow={onUpdateRow}
          onAddRow={onAddRow}
          onRemoveRow={onRemoveRow}
          onRowInputBlur={onRowInputBlur}
        />

      </LineItemTemplate>
      <SpendMoneyAttachments
        onAddAttachments={onAddAttachments}
        onRemoveAttachment={onRemoveAttachment}
        onOpenAttachment={onOpenAttachment}
      />
    </React.Fragment>
  );

  return (
    <PageView isLoading={isLoading} view={view} />
  );
};

const mapStateToProps = state => ({
  alertMessage: getAlertMessage(state),
  modalType: getModalType(state),
  isLoading: getIsLoading(state),
  pageTitle: getPageTitle(state),
});

export default connect(mapStateToProps)(SpendMoneyDetailView);
