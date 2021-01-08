import { Alert, BaseTemplate, PageHead, Tabs } from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';

import {
  getAlert,
  getLoadingState,
  getSelectedTab,
} from '../PaydayFilingSelectors';
import { getTabItems } from '../TabItems';
import PageView from '../../../../../components/PageView/PageView';

const PaydayFilingView = ({
  loadingState,
  alert,
  selectedTab,
  tabModules,
  onDismissAlert,
  onTabSelected,
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

  const view = (
    <BaseTemplate>
      {alertComponent}
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
});

export default connect(mapStateToProps)(PaydayFilingView);
