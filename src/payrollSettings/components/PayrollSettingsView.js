import {
  Alert, StandardTemplate, Tabs,
} from '@myob/myob-widgets';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import React from 'react';

import { getAlert, getTab } from '../selectors/payrollSettingsSelectors';
import { tabIds, tabItems } from '../tabItems';
import SuperFundListView from './superFundList/SuperFundListView';

// eslint-disable-next-line react/prop-types
const EmptyView = ({ pageHead, alert, tabs }) => (
  <StandardTemplate sticky="none" pageHead={pageHead} alert={alert} subHeadChildren={tabs} />
);

const PayrollSettingsView = (props) => {
  const {
    alert,
    selectedTab,
    onSelectTab,
    onDismissAlert,
    superFundListeners,
  } = props;

  const alertComponent = alert && (
    <Alert type={alert.type} onDismiss={onDismissAlert}>
      {alert.message}
    </Alert>
  );

  const tabsComponent = <Tabs items={tabItems} selected={selectedTab} onSelected={onSelectTab} />;

  const View = {
    [tabIds.general]: EmptyView,
    [tabIds.classification]: EmptyView,
    [tabIds.superFundList]: SuperFundListView,
    [tabIds.paySlips]: EmptyView,
  }[selectedTab];

  const listeners = {
    [tabIds.superFundList]: superFundListeners,
  }[selectedTab];

  return (
    <View pageHead="Payroll settings" alert={alertComponent} tabs={tabsComponent} listeners={listeners} />
  );
};

PayrollSettingsView.defaultProps = {
  alert: undefined,
};

PayrollSettingsView.propTypes = {
  alert: PropTypes.shape(),
  selectedTab: PropTypes.string.isRequired,
  superFundListeners: PropTypes.shape({}).isRequired,
  onSelectTab: PropTypes.func.isRequired,
  onDismissAlert: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  selectedTab: getTab(state),
  alert: getAlert(state),
});

export default connect(mapStateToProps)(PayrollSettingsView);
