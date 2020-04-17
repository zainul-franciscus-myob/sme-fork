import {
  Alert,
  BaseTemplate,
  Card,
  PageHead,
  Tabs,
} from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';

import {
  getAlert,
  getIsPayrollSetup,
  getLoadingState,
  getMainTab,
  getModal,
  getPageHeadTitle,
  getPayrollSettingsLink,
} from '../EmployeeDetailSelectors';
import { mainTabItems } from '../tabItems';
import ConfirmModal from './ConfirmModal';
import EmployeeDetailActions from './EmployeeDetailActions';
import PageView from '../../../../components/PageView/PageView';
import PayrollNotSetup from '../../../../components/Payroll/PayrollNotSetup';

const EmployeeDetailView = ({
  isPayrollSetup,
  tabViews,
  selectedTab,
  onMainTabSelected,
  loadingState,
  onCancelButtonClick,
  onSaveButtonClick,
  onDeleteButtonClick,
  alert,
  onDismissAlert,
  modal,
  confirmModalListeners,
  pageHeadTitle,
  payrollSettingsLink,
}) => {
  const subHeadTabs = (
    <Tabs
      items={mainTabItems}
      selected={selectedTab}
      onSelected={onMainTabSelected}
    />
  );

  const actions = (
    <EmployeeDetailActions
      onCancelButtonClick={onCancelButtonClick}
      onSaveButtonClick={onSaveButtonClick}
      onDeleteButtonClick={onDeleteButtonClick}
    />
  );

  const alertComponent = alert && (
    <Alert type={alert.type} onDismiss={onDismissAlert}>
      {alert.message}
    </Alert>
  );

  const modalComponent = modal && (
    <ConfirmModal
      modal={modal}
      confirmModalListeners={confirmModalListeners}
    />
  );

  const view = isPayrollSetup ? (
    <BaseTemplate>
      { alertComponent }
      <PageHead title={pageHeadTitle} />
      { subHeadTabs }
      { modalComponent }
      <Card body={tabViews[selectedTab].getView()} />
      { actions }
    </BaseTemplate>
  ) : (
    <PayrollNotSetup
      description="Before you can create an employee, you'll need to enter a payroll year."
      payrollSettingsLink={payrollSettingsLink}
    />
  );

  return <PageView loadingState={loadingState} view={view} />;
};

const mapStateToProps = state => ({
  loadingState: getLoadingState(state),
  selectedTab: getMainTab(state),
  alert: getAlert(state),
  modal: getModal(state),
  pageHeadTitle: getPageHeadTitle(state),
  isPayrollSetup: getIsPayrollSetup(state),
  payrollSettingsLink: getPayrollSettingsLink(state),
});

export default connect(mapStateToProps)(EmployeeDetailView);
