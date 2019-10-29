import {
  Alert,
  Button,
  ButtonRow,
  PageHead,
  StandardTemplate,
} from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';

import {
  getAlert, getShowActionButtonForTax, getTab,
} from '../PayItemListSelectors';
import { tabIds, tabItems } from '../tabItems';
import PayItemDeductionsTable from './PayItemDeductionsTable';
import PayItemExpensesTable from './PayItemExpensesTable';
import PayItemLeaveTable from './PayItemLeaveTable';
import PayItemSuperannuationTable from './PayItemSuperannuationTable';
import PayItemWagesTable from './PayItemWagesTable';
import Tabs from '../../../components/Tabs/Tabs';
import TaxPayItemView from './TaxPayItemView';
import style from './PayItemListView.module.css';

const PayItemListView = ({
  alert,
  selectedTab,
  showActionButtonForTax,
  listeners,
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
      <Button onClick={onCreatePayItemButtonClick}>{`Create ${createButtonType} pay item`}</Button>
    </ButtonRow>
  );

  const taxActions = (
    <ButtonRow>
      <Button onClick={onSaveTaxPayItemButtonClick}>Save</Button>
    </ButtonRow>
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
    <StandardTemplate
      sticky="none"
      pageHead={pageHead}
      subHeadChildren={subHeadChildren}
      alert={alertComponent}
    >
      <div className={style.list}>
        <Content listeners={listeners} />
      </div>
      {showActionButtonForTax && taxActions}
    </StandardTemplate>
  );

  return payItemView;
};

const mapStateToProps = state => ({
  selectedTab: getTab(state),
  showActionButtonForTax: getShowActionButtonForTax(state),
  alert: getAlert(state),
});

export default connect(mapStateToProps)(PayItemListView);
