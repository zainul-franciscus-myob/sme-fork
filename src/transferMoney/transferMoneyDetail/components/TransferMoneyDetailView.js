import {
  Alert, Card, PageHead,
} from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';

import {
  getAlertMessage, getIsLoading, getModalType, getPageTitle,
} from '../transferMoneyDetailSelectors';
import CancelModal from '../../../components/modal/CancelModal';
import DeleteModal from '../../../components/modal/DeleteModal';
import PageView from '../../../components/PageView/PageView';
import SmallScreenTemplate from '../../../components/SmallScreenTemplate/SmallScreenTemplate';
import TransferMoneyDetailActions from './TranferMoneyDetailActions';
import TransferMoneyDetailForm from './TransferMoneyDetailForm';

const TransferMoneyDetailView = ({
  onUpdateForm,
  onAmountInputBlur,
  alertMessage,
  onDismissAlert,
  onSave,
  isCreating,
  modalType,
  onCancelModal,
  onCloseModal,
  onCancel,
  onDelete,
  onDeleteModal,
  isLoading,
  pageTitle,
}) => {
  const actions = (
    <TransferMoneyDetailActions
      isCreating={isCreating}
      onSave={onSave}
      onCancel={onCancel}
      onDelete={onDelete}
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
        title="Cancel transfer money"
        description="Are you sure you want to cancel this transfer money?"
      />
    );
  } else if (modalType === 'delete') {
    modal = (
      <DeleteModal
        onCancel={onCloseModal}
        onConfirm={onDeleteModal}
        title="Delete transfer money"
        description="Are you sure you want to delete this transfer money entry?"
      />
    );
  }

  const view = (
    <SmallScreenTemplate>
      { alertComponent }
      { modal }
      <PageHead title={pageTitle} />
      <Card>
        <TransferMoneyDetailForm
          isCreating={isCreating}
          onUpdateForm={onUpdateForm}
          onAmountInputBlur={onAmountInputBlur}
        />
      </Card>
      { actions }
    </SmallScreenTemplate>
  );

  return <PageView isLoading={isLoading} view={view} />;
};

const mapStateToProps = state => ({
  alertMessage: getAlertMessage(state),
  modalType: getModalType(state),
  isLoading: getIsLoading(state),
  pageTitle: getPageTitle(state),
});

export default connect(mapStateToProps)(TransferMoneyDetailView);
