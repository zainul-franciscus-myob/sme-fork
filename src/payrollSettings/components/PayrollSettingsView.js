import {
  Alert, StandardTemplate,
} from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';

import { getAlert, getModalType, getTab } from '../selectors/payrollSettingsSelectors';
import { tabIds, tabItems } from '../tabItems';
import EmployeeClassificationListView from './employmentClassificationList/EmploymentClassificationListView';
import EmploymentClassificationDetailModal
  from './employmentClassificationDetail/EmploymentClassificationDetailModal';
import GeneralPayrollInformationView from './generalPayrollInformation/GeneralPayrollInformationView';
import ModalType from '../ModalType';
import SuperFundListView from './superFundList/SuperFundListView';
import Tabs from '../../components/Tabs/Tabs';

const EmptyView = ({ pageHead, alert, tabs }) => (
  <StandardTemplate sticky="none" pageHead={pageHead} alert={alert} subHeadChildren={tabs} />
);

const PayrollSettingsView = (props) => {
  const {
    modalType,
    alert,
    selectedTab,
    onSelectTab,
    onDismissAlert,
    superFundListeners,
    employmentClassificationListeners,
    employmentClassificationDetailListeners,
    generalPayrollInformationListeners,
  } = props;

  const alertComponent = alert && (
    <Alert type={alert.type} onDismiss={onDismissAlert}>
      {alert.message}
    </Alert>
  );

  const tabsComponent = <Tabs items={tabItems} selected={selectedTab} onSelected={onSelectTab} />;

  const modal = {
    [ModalType.EMPLOYMENT_CLASSIFICATION_DETAIL]: <EmploymentClassificationDetailModal
      employmentClassificationDetailListeners={employmentClassificationDetailListeners}
    />,
  }[modalType];

  const View = {
    [tabIds.general]: GeneralPayrollInformationView,
    [tabIds.classification]: EmployeeClassificationListView,
    [tabIds.superFundList]: SuperFundListView,
    [tabIds.paySlips]: EmptyView,
  }[selectedTab];

  const listeners = {
    [tabIds.superFundList]: superFundListeners,
    [tabIds.classification]: employmentClassificationListeners,
    [tabIds.general]: generalPayrollInformationListeners,
  }[selectedTab];

  return (
    <React.Fragment>
      { modal }
      <View pageHead="Payroll settings" alert={alertComponent} tabs={tabsComponent} listeners={listeners} />
    </React.Fragment>
  );
};

const mapStateToProps = state => ({
  selectedTab: getTab(state),
  alert: getAlert(state),
  modalType: getModalType(state),
});

export default connect(mapStateToProps)(PayrollSettingsView);
