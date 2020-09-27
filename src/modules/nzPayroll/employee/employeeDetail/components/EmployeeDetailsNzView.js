import { Alert, BaseTemplate, PageHead } from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';

import {
  getAlert,
  getEmployeeFullName,
  getLoadingState,
  getModal,
} from '../EmployeeDetailNzSelectors';
import ConfirmModal from './ConfirmModal';
import EmployeeDetailActions from './EmployeeDetailActions';
import EmployeeDetailsMainTabs from './EmployeeDetailsMainTabs';
import EmployeeDetailsSubTabBody from './EmployeeDetailsSubTabBody';
import PageView from '../../../../../components/PageView/PageView';

const EmployeeDetailsNzView = ({
  alert,
  loadingState,
  pageHeadTitle,
  modal,
  subModules,
  onMainTabSelected,
  onSubTabSelected,
  onCancelButtonClick,
  onSaveButtonClick,
  onDeleteButtonClick,
  onDismissAlertClick,
  confirmModalListeners,
}) => {
  const actionButtons = (
    <EmployeeDetailActions
      onCancelButtonClick={onCancelButtonClick}
      onSaveButtonClick={onSaveButtonClick}
      onDeleteButtonClick={onDeleteButtonClick}
    />
  );

  const alertComponent = alert && (
    <Alert type={alert.type} onDismiss={onDismissAlertClick}>
      {alert.message}
    </Alert>
  );

  const confirmModal = modal && (
    <ConfirmModal modal={modal} confirmModalListeners={confirmModalListeners} />
  );

  const view = (
    <BaseTemplate>
      {alertComponent}
      <PageHead title={pageHeadTitle} />
      <EmployeeDetailsMainTabs onMainTabSelected={onMainTabSelected} />
      <EmployeeDetailsSubTabBody
        onSubTabSelected={onSubTabSelected}
        subModules={subModules}
      />
      {actionButtons}
      {confirmModal}
    </BaseTemplate>
  );

  return <PageView loadingState={loadingState} view={view} />;
};

const mapStateToProps = (state) => ({
  loadingState: getLoadingState(state),
  pageHeadTitle: getEmployeeFullName(state),
  alert: getAlert(state),
  modal: getModal(state),
});

export default connect(mapStateToProps)(EmployeeDetailsNzView);
