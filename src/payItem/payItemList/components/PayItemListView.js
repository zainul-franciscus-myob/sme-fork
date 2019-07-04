import {
  Alert,
  Button,
  ButtonRow,
  PageHead,
  Spinner,
  StandardTemplate,
  Tabs,
} from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';

import {
  getAlert, getIsLoading, getTab,
} from '../PayItemListSelectors';
import { tabIds, tabItems } from '../tabItems';
import PayItemDeductionsTable from './PayItemDeductionsTable';
import PayItemExpensesTable from './PayItemExpensesTable';
import PayItemLeaveTable from './PayItemLeaveTable';
import PayItemSuperannuationTable from './PayItemSuperannuationTable';
import PayItemWagesTable from './PayItemWagesTable';
import style from './PayItemListView.css';

const PayItemListView = ({
  isLoading,
  alert,
  selectedTab,
  listeners,
}) => {
  const { onCreateSuperannuationButtonClick } = listeners;

  const Content = {
    [tabIds.wages]: PayItemWagesTable,
    [tabIds.superannuation]: PayItemSuperannuationTable,
    [tabIds.leave]: PayItemLeaveTable,
    [tabIds.deductions]: PayItemDeductionsTable,
    [tabIds.expenses]: PayItemExpensesTable,
  }[selectedTab];

  const alertComponent = alert && (
    <Alert type={alert.type} onDismiss={listeners.onDismissAlert}>
      {alert.message}
    </Alert>
  );

  const actions = selectedTab === tabIds.superannuation && (
    <ButtonRow>
      <Button onClick={onCreateSuperannuationButtonClick}>Create super pay item</Button>
    </ButtonRow>
  );

  const pageHead = <PageHead title="Pay items" />;

  const subHeadTabs = (
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
      subHeadChildren={subHeadTabs}
      alert={alertComponent}
    >
      <div className={style.list}>
        <Content listeners={listeners} />
      </div>
    </StandardTemplate>
  );

  return isLoading ? <Spinner /> : payItemView;
};

const mapStateToProps = state => ({
  isLoading: getIsLoading(state),
  selectedTab: getTab(state),
  alert: getAlert(state),
});

export default connect(mapStateToProps)(PayItemListView);
