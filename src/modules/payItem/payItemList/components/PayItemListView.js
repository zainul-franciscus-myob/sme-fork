import {
  Alert,
  BaseTemplate,
  Button,
  ButtonRow,
  Card,
  PageHead,
} from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';

import {
  getAlert,
  getLoadingState,
  getModal,
  getPayrollIsSetUp,
  getPayrollSettingsLink,
  getShowActionButtonForTax,
  getTab,
} from '../PayItemListSelectors';
import { tabIds, tabItems } from '../tabItems';
import PageView from '../../../../components/PageView/PageView';
import PayItemDeductionsTable from './PayItemDeductionsTable';
import PayItemExpensesTable from './PayItemExpensesTable';
import PayItemLeaveTable from './PayItemLeaveTable';
import PayItemSuperannuationTable from './PayItemSuperannuationTable';
import PayItemWagesTable from './PayItemWagesTable';
import PayrollNotSetup from '../../../../components/Payroll/PayrollNotSetup';
import Tabs from '../../../../components/Tabs/Tabs';
import TaxPayItemView from './TaxPayItemView';
import UnsavedModal from '../../../../components/modal/UnsavedModal';
import style from './PayItemListView.module.css';

const PayItemListView = ({
  alert,
  selectedTab,
  showActionButtonForTax,
  listeners,
  onConfirmSave,
  onConfirmCancelButtonClick,
  onDismissModal,
  modal,
  loadingState,
  payrollSettingsLink,
  payrollIsSetUp,
}) => {
  const { onCreatePayItemButtonClick, onSaveTaxPayItemButtonClick } = listeners;

  const Content = {
    [tabIds.wages]: PayItemWagesTable,
    [tabIds.superannuation]: PayItemSuperannuationTable,
    [tabIds.leave]: PayItemLeaveTable,
    [tabIds.deductions]: PayItemDeductionsTable,
    [tabIds.expenses]: PayItemExpensesTable,
    [tabIds.tax]: TaxPayItemView,
  }[selectedTab];

  const alertComponent = alert && (
    <Alert type={alert.type} onDismiss={listeners.onDismissAlert}>
      {alert.message}
    </Alert>
  );

  const createButtonType = {
    [tabIds.superannuation]: 'super',
    [tabIds.wages]: 'wage',
    [tabIds.deductions]: 'deduction',
    [tabIds.leave]: 'leave',
    [tabIds.expenses]: 'expense',
  }[selectedTab];

  const actions = createButtonType && (
    <ButtonRow>
      <Button
        onClick={onCreatePayItemButtonClick}
      >{`Create ${createButtonType} pay item`}</Button>
    </ButtonRow>
  );

  const taxActions = (
    <ButtonRow>
      <Button onClick={onSaveTaxPayItemButtonClick}>Save</Button>
    </ButtonRow>
  );

  const unsavedModal = (
    <UnsavedModal
      onConfirmSave={onConfirmSave}
      onConfirmUnsave={onConfirmCancelButtonClick}
      onCancel={onDismissModal}
    />
  );

  const pageHead = <PageHead title="Pay items" />;

  const subHeadChildren = (
    <React.Fragment>
      <Tabs
        items={tabItems}
        selected={selectedTab}
        onSelected={listeners.onTabSelected}
      />
      {actions}
    </React.Fragment>
  );

  const payItemView = (
    <BaseTemplate>
      {alertComponent}
      {pageHead}
      {subHeadChildren}
      {modal && unsavedModal}
      <div className={style.list}>
        <Card>
          <Content listeners={listeners} />
        </Card>
      </div>
      {showActionButtonForTax && taxActions}
    </BaseTemplate>
  );

  const payrollNotSetUpView = (
    <PayrollNotSetup
      description="Before you create pay items, you'll need to enter a payroll year."
      payrollSettingsLink={payrollSettingsLink}
    />
  );

  return (
    <PageView
      loadingState={loadingState}
      view={payrollIsSetUp ? payItemView : payrollNotSetUpView}
    />
  );
};

const mapStateToProps = (state) => ({
  selectedTab: getTab(state),
  showActionButtonForTax: getShowActionButtonForTax(state),
  alert: getAlert(state),
  modal: getModal(state),
  loadingState: getLoadingState(state),
  payrollSettingsLink: getPayrollSettingsLink(state),
  payrollIsSetUp: getPayrollIsSetUp(state),
});

export default connect(mapStateToProps)(PayItemListView);
