import {
  Alert,
} from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';

import {
  getAlertMessage, getLoadingState, getModal, getPageTitle,
} from '../receiveMoneyDetailSelectors';
import LineItemTemplate from '../../../../components/Feelix/LineItemTemplate/LineItemTemplate';
import PageView from '../../../../components/PageView/PageView';
import ReceiveMoneyDetailActions from './ReceiveMoneyDetailActions';
import ReceiveMoneyDetailModal from './ReceiveMoneyDetailModal';
import ReceiveMoneyDetailOptions from './ReceiveMoneyDetailOptions';
import ReceiveMoneyDetailTable from './ReceiveMoneyDetailTable';

const ReceiveMoneyDetailView = ({
  onUpdateHeaderOptions,
  onSaveButtonClick,
  onCancelButtonClick,
  onDeleteButtonClick,
  onDismissModal,
  onConfirmCancelButtonClick,
  onConfirmDeleteButtonClick,
  alertMessage,
  onDismissAlert,
  loadingState,
  pageTitle,
  modal,
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

  const view = (
    <React.Fragment>
      <LineItemTemplate
        pageHead={pageTitle}
        options={templateOptions}
        actions={actions}
        alert={alertComponent}
      >
        {
          modal && (
            <ReceiveMoneyDetailModal
              modal={modal}
              onDismissModal={onDismissModal}
              onConfirmSave={onSaveButtonClick}
              onConfirmDeleteButtonClick={onConfirmDeleteButtonClick}
              onConfirmCancelButtonClick={onConfirmCancelButtonClick}
            />
          )
        }
        <ReceiveMoneyDetailTable
          onUpdateRow={onUpdateRow}
          onAddRow={onAddRow}
          onRemoveRow={onRemoveRow}
          onRowInputBlur={onRowInputBlur}
        />
      </LineItemTemplate>
    </React.Fragment>
  );

  return <PageView loadingState={loadingState} view={view} />;
};

const mapStateToProps = state => ({
  alertMessage: getAlertMessage(state),
  modal: getModal(state),
  loadingState: getLoadingState(state),
  pageTitle: getPageTitle(state),
});

export default connect(mapStateToProps)(ReceiveMoneyDetailView);
