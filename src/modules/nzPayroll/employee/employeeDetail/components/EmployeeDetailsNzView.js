import { Alert, BaseTemplate, Card, PageHead, Tabs } from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';

import {
  getAlert,
  getCurrentSubTab,
  getEmployeeFullName,
  getLoadingState,
  getMainTab,
  getModal,
} from '../EmployeeDetailNzSelectors';
import { tabItems } from '../tabItems';
import ConfirmModal from './ConfirmModal';
import EmployeeDetailActions from './EmployeeDetailActions';
import PageView from '../../../../../components/PageView/PageView';

const CardBody = ({ subModules, mainTab, subTab, onSubTabSelected }) => {
  const tab = tabItems.find(({ id }) => id === mainTab);
  if (tab?.subTabs) {
    return (
      <>
        <Tabs
          onSelected={(sub) => onSubTabSelected(mainTab, sub)}
          selected={subTab}
          items={tab.subTabs}
        />
        {subModules[subTab]?.getView()}
      </>
    );
  }
  return subModules[mainTab]?.getView();
};

const EmployeeDetailsNzView = ({
  alert,
  loadingState,
  pageHeadTitle,
  modal,
  subModules,
  onMainTabSelected,
  onSubTabSelected,
  mainTab,
  subTab,
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
      <Tabs
        selected={mainTab}
        items={tabItems}
        onSelected={onMainTabSelected}
      />
      <Card>
        <CardBody
          subModules={subModules}
          mainTab={mainTab}
          subTab={subTab}
          onSubTabSelected={onSubTabSelected}
        />
      </Card>
      {actionButtons}
      {confirmModal}
    </BaseTemplate>
  );

  return <PageView loadingState={loadingState} view={view} />;
};

const mapStateToProps = (state) => ({
  loadingState: getLoadingState(state),
  pageHeadTitle: getEmployeeFullName(state),
  mainTab: getMainTab(state),
  subTab: getCurrentSubTab(state),
  alert: getAlert(state),
  modal: getModal(state),
});

export default connect(mapStateToProps)(EmployeeDetailsNzView);
