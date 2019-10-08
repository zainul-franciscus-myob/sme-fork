import {
  Alert, Button, PageHead, StandardTemplate,
} from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';

import {
  getAlert, getAppliedFilterOptionsType,
  getIsLoading,
} from '../AccountListSelectors';
import { tabItems } from '../tabItems';
import AccountListFilterOptions from './AccountListFilterOptions';
import AccountListTable from './AccountListTable';
import PageView from '../../../components/PageView/PageView';
import Tabs from '../../../components/Tabs/Tabs';

const AccountListView = ({
  alert,
  isLoading,
  selectedTab,
  onDismissAlert,
  onUpdateFilterOptions,
  onApplyFilter,
  onTabSelect,
  onEditLinkedAccountButtonClick,
}) => {
  const alertComponent = alert && (
    <Alert type={alert.type} onDismiss={onDismissAlert}>
      {alert.message}
    </Alert>
  );

  const pageHead = (
    <PageHead title="Accounts">
      <Button type="secondary" onClick={onEditLinkedAccountButtonClick}>Edit linked accounts</Button>
    </PageHead>
  );

  const filterBar = (
    <AccountListFilterOptions
      onUpdateFilterOptions={onUpdateFilterOptions}
      onApplyFilter={onApplyFilter}
    />
  );

  const tabs = (
    <Tabs
      items={tabItems}
      selected={selectedTab}
      onSelected={onTabSelect}
    />
  );

  const accountView = (
    <React.Fragment>
      <StandardTemplate
        sticky="none"
        alert={alertComponent}
        pageHead={pageHead}
        filterBar={filterBar}
        subHeadChildren={tabs}
      >
        <AccountListTable />
      </StandardTemplate>
    </React.Fragment>
  );

  return <PageView isLoading={isLoading} view={accountView} />;
};

const mapStateToProps = state => ({
  isLoading: getIsLoading(state),
  alert: getAlert(state),
  selectedTab: getAppliedFilterOptionsType(state),
});

export default connect(mapStateToProps)(AccountListView);
