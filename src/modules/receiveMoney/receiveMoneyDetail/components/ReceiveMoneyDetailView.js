import { Alert } from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';

import {
  getAlert,
  getLoadingState,
  getModal,
  getPageTitle,
} from '../selectors/receiveMoneyDetailSelectors';
import LineItemTemplate from '../../../../components/Feelix/LineItemTemplate/LineItemTemplate';
import PageView from '../../../../components/PageView/PageView';
import ReceiveMoneyDetailActions from './ReceiveMoneyDetailActions';
import ReceiveMoneyDetailModal from './ReceiveMoneyDetailModal';
import ReceiveMoneyDetailOptions from './ReceiveMoneyDetailOptions';
import ReceiveMoneyDetailTable from './ReceiveMoneyDetailTable';

const ReceiveMoneyDetailView = ({
  accountModal,
  onUpdateHeaderOptions,
  onSaveButtonClick,
  onSaveAndButtonClick,
  onCancelButtonClick,
  onDeleteButtonClick,
  onDismissModal,
  onConfirmCancelButtonClick,
  onConfirmDeleteButtonClick,
  alert,
  onDismissAlert,
  loadingState,
  pageTitle,
  modal,
  onUpdateRow,
  onAddRow,
  onRemoveRow,
  onRowInputBlur,
  onAddAccount,
  renderJobCombobox,
  renderContactCombobox,
  onViewedAccountToolTip,
}) => {
  const templateOptions = (
    <ReceiveMoneyDetailOptions
      onUpdateHeaderOptions={onUpdateHeaderOptions}
      renderContactCombobox={renderContactCombobox}
    />
  );

  const actions = (
    <ReceiveMoneyDetailActions
      onSaveButtonClick={onSaveButtonClick}
      onSaveAndButtonClick={onSaveAndButtonClick}
      onCancelButtonClick={onCancelButtonClick}
      onDeleteButtonClick={onDeleteButtonClick}
    />
  );

  const alertComponent = alert && (
    <Alert type={alert.type} onDismiss={onDismissAlert}>
      {alert.message}
    </Alert>
  );

  const view = (
    <React.Fragment>
      <LineItemTemplate
        pageHead={pageTitle}
        options={templateOptions}
        actions={actions}
        alert={alertComponent}
      >
        {modal && (
          <ReceiveMoneyDetailModal
            modal={modal}
            onDismissModal={onDismissModal}
            onConfirmSave={onSaveButtonClick}
            onConfirmDeleteButtonClick={onConfirmDeleteButtonClick}
            onConfirmCancelButtonClick={onConfirmCancelButtonClick}
          />
        )}
        {accountModal}
        <ReceiveMoneyDetailTable
          onUpdateRow={onUpdateRow}
          onAddRow={onAddRow}
          onRemoveRow={onRemoveRow}
          onRowInputBlur={onRowInputBlur}
          onAddAccount={onAddAccount}
          renderJobCombobox={renderJobCombobox}
          onViewedAccountToolTip={onViewedAccountToolTip}
        />
      </LineItemTemplate>
    </React.Fragment>
  );

  return <PageView loadingState={loadingState} view={view} />;
};

const mapStateToProps = (state) => ({
  alert: getAlert(state),
  modal: getModal(state),
  loadingState: getLoadingState(state),
  pageTitle: getPageTitle(state),
});

export default connect(mapStateToProps)(ReceiveMoneyDetailView);
