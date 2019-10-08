import { Table } from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';

import {
  getAppliedFilterOptionsShowInactive, getIsTableEmpty, getIsTableLoading, getTableTaxCodeHeader,
} from '../AccountListSelectors';
import AccountListTableBody from './AccountListTableBody';
import NoResultPageState from '../../../components/NoResultPageState/NoResultPageState';
import TableView from '../../../components/TableView/TableView';


const emptyView = (
  <NoResultPageState
    title="No accounts found. :("
    description="Try a different search term, or show the inactive accounts."
  />
);

const HeaderItem = ({ config }) => !config.isHidden && (
  <Table.HeaderItem columnName={config.columnName} {...config.styles}>
    {config.columnName}
  </Table.HeaderItem>
);

const AccountListTable = (props) => {
  const {
    isTableLoading,
    isTableEmpty,
    showInactive,
    taxCodeHeader,
  } = props;

  const tableConfig = {
    accountNumber: { columnName: 'Account number', styles: { width: 'flex-2', valign: 'middle' } },
    accountName: { columnName: 'Account name', styles: { width: 'flex-3', valign: 'middle' } },
    status: { columnName: 'Status', styles: { valign: 'middle' }, isHidden: !showInactive },
    type: { columnName: 'Account type', styles: { width: 'flex-2', valign: 'middle' } },
    taxCode: { columnName: taxCodeHeader, styles: { valign: 'middle' } },
    linked: { columnName: 'Linked', styles: { valign: 'middle' } },
    level: { columnName: 'Level', styles: { valign: 'middle' } },
    balance: { columnName: 'Current balance ($)', styles: { width: 'flex-2', valign: 'middle', align: 'right' } },
  };

  const header = (
    <Table.Header>
      <HeaderItem config={tableConfig.accountNumber} />
      <HeaderItem config={tableConfig.accountName} />
      <HeaderItem config={tableConfig.status} />
      <HeaderItem config={tableConfig.type} />
      <HeaderItem config={tableConfig.taxCode} />
      <HeaderItem config={tableConfig.linked} />
      <HeaderItem config={tableConfig.level} />
      <HeaderItem config={tableConfig.balance} />
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
  taxCodeHeader: getTableTaxCodeHeader(state),
});

export default connect(mapStateToProps)(AccountListTable);
