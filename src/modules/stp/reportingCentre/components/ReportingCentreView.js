import {
  Alert, BaseTemplate, PageHead, Tabs,
} from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';

import {
  getAlert,
  getLoadingState,
  getPayrollIsSetUp,
  getPayrollSettingsLink,
  getSelectedTab,
} from '../ReportingCentreSelectors';
import { getTabItems } from '../TabItems';
import PageView from '../../../../components/PageView/PageView';
import PayrollNotSetup from '../../../../components/Payroll/PayrollNotSetup';

const ReportingCentreView = ({
  loadingState,
  alert,
  selectedTab,
  tabModules,
  onDismissAlert,
  onTabSelected,
  payrollIsSetUp,
  payrollSettingsLink,
  featureToggles,
}) => {
  const actions = (
    <div />
  );
  const tabs = (
    <Tabs
      items={getTabItems(featureToggles)}
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

  const payrollNotSetup = <PayrollNotSetup
    description="Before you can sign up for Single Touch Payroll, you'll need to enter a payroll year."
    payrollSettingsLink={payrollSettingsLink}
  />;

  return <PageView loadingState={loadingState} view={payrollIsSetUp ? view : payrollNotSetup} />;
};

const mapStateToProps = state => ({
  loadingState: getLoadingState(state),
  alert: getAlert(state),
  selectedTab: getSelectedTab(state),
  payrollIsSetUp: getPayrollIsSetUp(state),
  payrollSettingsLink: getPayrollSettingsLink(state),
});

export default connect(mapStateToProps)(ReportingCentreView);
