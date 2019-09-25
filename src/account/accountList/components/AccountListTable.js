import { Table } from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';

import {
  getAppliedFilterOptionsShowInactive, getIsTableEmpty, getIsTableLoading,
} from '../AccountListSelectors';
import AccountListTableBody from './AccountListTableBody';
import NoResultPageState from '../../../components/NoResultPageState/NoResultPageState';
import TableView from '../../../components/TableView/TableView';

const tableConfig = {
  accountNumber: { width: '18rem', valign: 'middle' },
  accountName: { width: 'flex-1', valign: 'middle' },
  status: { width: '10rem', valign: 'middle' },
  type: { width: '20rem', valign: 'middle' },
  taxCode: { width: '10rem', valign: 'middle' },
  linked: { width: '8rem', valign: 'middle' },
  level: { width: '8rem', valign: 'middle' },
  balance: { width: '18rem', valign: 'middle', align: 'right' },
};

const emptyView = (
  <NoResultPageState
    title="No accounts found. :("
    description="Try a different search term, or show the inactive accounts."
  />
);

const AccountListTable = (props) => {
  const {
    isTableLoading,
    isTableEmpty,
    showInactive,
  } = props;

  const header = (
    <Table.Header>
      <Table.HeaderItem {...tableConfig.accountNumber} columnName="accountNumber">Account number</Table.HeaderItem>
      <Table.HeaderItem {...tableConfig.accountName} columnName="accountName">Account name</Table.HeaderItem>
      { showInactive && <Table.HeaderItem {...tableConfig.status} columnName="status">Status</Table.HeaderItem>}
      <Table.HeaderItem {...tableConfig.type} columnName="type">Type</Table.HeaderItem>
      <Table.HeaderItem {...tableConfig.taxCode} columnName="taxCode">Tax code</Table.HeaderItem>
      <Table.HeaderItem {...tableConfig.linked} columnName="linked">Linked</Table.HeaderItem>
      <Table.HeaderItem {...tableConfig.level} columnName="level">Level</Table.HeaderItem>
      <Table.HeaderItem {...tableConfig.balance} columnName="balance">Current balance ($)</Table.HeaderItem>
    </Table.Header>
  );

  return (
    <TableView
      isLoading={isTableLoading}
      isEmpty={isTableEmpty}
      emptyView={emptyView}
      header={header}
    >
      <AccountListTableBody tableConfig={tableConfig} />
    </TableView>
  );
};

const mapStateToProps = state => ({
  isTableLoading: getIsTableLoading(state),
  isTableEmpty: getIsTableEmpty(state),
  showInactive: getAppliedFilterOptionsShowInactive(state),
});

export default connect(mapStateToProps)(AccountListTable);
