import { Alert, Card, PageHead } from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';

import {
  getAlert,
  getIsCreating,
  getLoadingState,
  getModal,
  getPageTitle,
} from '../transferMoneyDetailSelectors';
import PageView from '../../../../components/PageView/PageView';
import SmallScreenTemplate from '../../../../components/SmallScreenTemplate/SmallScreenTemplate';
import TransferMoneyDetailActions from './TranferMoneyDetailActions';
import TransferMoneyDetailForm from './TransferMoneyDetailForm';
import TransferMoneyDetailModal from './TransferMoneyDetailModal';

const TransferMoneyDetailView = ({
  onUpdateForm,
  alert,
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

  const alertComponent = alert && (
    <Alert type={alert.type} onDismiss={onDismissAlert}>
      {alert.message}
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
        />
      </Card>
      { actions }
    </SmallScreenTemplate>
  );

  return <PageView loadingState={loadingState} view={view} />;
};

const mapStateToProps = state => ({
  alert: getAlert(state),
  modal: getModal(state),
  loadingState: getLoadingState(state),
  pageTitle: getPageTitle(state),
  isCreating: getIsCreating(state),
});

export default connect(mapStateToProps)(TransferMoneyDetailView);
