import { Alert, BaseTemplate, PageHead, Tabs } from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';

import {
  getAlert,
  getAreMultipleUsersOnboarded,
  getIsRemoveAuthorisationModalOpen,
  getLoadingState,
  getSelectedTab,
} from '../PaydayFilingSelectors';
import { getTabItems } from '../TabItems';
import PageView from '../../../../../components/PageView/PageView';
import RemoveAuthorisationModal from './RemoveAuthorisationModal';

const PaydayFilingView = ({
  loadingState,
  alert,
  selectedTab,
  tabModules,
  onDismissAlert,
  onTabSelected,
  removeAuthorisationModalIsOpen,
  onCloseRemoveAuthorisationModal,
  onRemoveAuthorisation,
  multipleUsersOnboarded,
}) => {
  const actions = <div />;
  const tabs = (
    <Tabs
      items={getTabItems()}
      selected={selectedTab}
      onSelected={onTabSelected}
    />
  );

  const alertComponent = alert && (
    <Alert type={alert.type} onDismiss={onDismissAlert}>
      {alert.message}
    </Alert>
  );

  const removeAuthorisationModal = removeAuthorisationModalIsOpen && (
    <RemoveAuthorisationModal
      onCancel={onCloseRemoveAuthorisationModal}
      onRemoveAuthorisation={onRemoveAuthorisation}
      multipleUsersOnboarded={multipleUsersOnboarded}
    />
  );

  const view = (
    <BaseTemplate>
      {alertComponent}
      {removeAuthorisationModal}
      <PageHead title="Payday filing" />
      {tabs}
      {tabModules[selectedTab].getView()}
      {actions}
    </BaseTemplate>
  );

  return <PageView loadingState={loadingState} view={view} />;
};

const mapStateToProps = (state) => ({
  loadingState: getLoadingState(state),
  alert: getAlert(state),
  selectedTab: getSelectedTab(state),
  removeAuthorisationModalIsOpen: getIsRemoveAuthorisationModalOpen(state),
  multipleUsersOnboarded: getAreMultipleUsersOnboarded(state),
});

export default connect(mapStateToProps)(PaydayFilingView);
