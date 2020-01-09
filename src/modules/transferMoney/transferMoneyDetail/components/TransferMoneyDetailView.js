import {
  Alert, Card, PageHead,
} from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';

import {
  getAlertMessage, getLoadingState, getModal, getPageTitle,
} from '../transferMoneyDetailSelectors';
import PageView from '../../../../components/PageView/PageView';
import SmallScreenTemplate from '../../../../components/SmallScreenTemplate/SmallScreenTemplate';
import TransferMoneyDetailActions from './TranferMoneyDetailActions';
import TransferMoneyDetailForm from './TransferMoneyDetailForm';
import TransferMoneyDetailModal from './TransferMoneyDetailModal';

const TransferMoneyDetailView = ({
  onUpdateForm,
  onAmountInputBlur,
  alertMessage,
  onDismissAlert,
  onSave,
  isCreating,
  modal,
  onConfirmCancelButtonClick,
  onDismissModal,
  onCancel,
  onDelete,
  onConfirmDeleteButtonClick,
  loadingState,
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

  const view = (
    <SmallScreenTemplate>
      { alertComponent }
      {
        modal && (
          <TransferMoneyDetailModal
            modal={modal}
            onDismissModal={onDismissModal}
            onConfirmSave={onSave}
            onConfirmDeleteButtonClick={onConfirmDeleteButtonClick}
            onConfirmCancelButtonClick={onConfirmCancelButtonClick}
          />
        )
      }
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

  return <PageView loadingState={loadingState} view={view} />;
};

const mapStateToProps = state => ({
  alertMessage: getAlertMessage(state),
  modal: getModal(state),
  loadingState: getLoadingState(state),
  pageTitle: getPageTitle(state),
});

export default connect(mapStateToProps)(TransferMoneyDetailView);
