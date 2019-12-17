import {
  Alert, ButtonRow, PageHead, Separator, StandardTemplate,
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
import AccountListTableHeader from './AccountListTableHeader';
import Button from '../../../../components/Button/Button';
import PageView from '../../../../components/PageView/PageView';
import Tabs from '../../../../components/Tabs/Tabs';

const AccountListView = ({
  alert,
  isLoading,
  selectedTab,
  onDismissAlert,
  onUpdateFilterOptions,
  onApplyFilter,
  onTabSelect,
  onEditLinkedAccountButtonClick,
  onCreateAccountButtonClick,
  onImportChartOfAccountsClick,
}) => {
  const alertComponent = alert && (
    <Alert type={alert.type} onDismiss={onDismissAlert}>
      {alert.message}
    </Alert>
  );

  const pageHead = (
    <PageHead title="Accounts">
      <ButtonRow>
        <Button type="secondary" onClick={onEditLinkedAccountButtonClick}>Edit linked accounts</Button>
        <Separator direction="vertical" />
        <Button type="secondary" onClick={onImportChartOfAccountsClick}>Import chart of accounts</Button>
        <Button type="primary" onClick={onCreateAccountButtonClick}>Create account</Button>
      </ButtonRow>
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

  const tableHeader = <AccountListTableHeader />;

  const accountView = (
    <React.Fragment>
      <StandardTemplate
        alert={alertComponent}
        pageHead={pageHead}
        filterBar={filterBar}
        subHeadChildren={tabs}
        tableHeader={tableHeader}
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
