import {
  Alert, BaseTemplate, PageHead, Tabs,
} from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';

import {
  getAlert,
  getIsLoading,
  getSelectedTab,
} from '../ReportingCentreSelectors';
import { tabItems } from '../TabItems';
import PageView from '../../../../components/PageView/PageView';

const ReportingCentreView = ({
  isLoading,
  alert,
  selectedTab,
  tabModules,
  onDismissAlert,
  onTabSelected,
}) => {
  const actions = (
    <div />
  );

  const tabs = (
    <Tabs
      items={tabItems}
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
      <PageHead title="Single Touch Payroll reporting" />
      {tabs}
      {tabModules[selectedTab].getView()}
      {actions}
    </BaseTemplate>
  );

  return <PageView isLoading={isLoading} view={view} />;
};

const mapStateToProps = state => ({
  isLoading: getIsLoading(state),
  alert: getAlert(state),
  selectedTab: getSelectedTab(state),
});

export default connect(mapStateToProps)(ReportingCentreView);
