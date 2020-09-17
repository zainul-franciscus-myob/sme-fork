import { Button, HeaderSort, Icons, Table } from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';

import {
  getIsTableEmpty,
  getIsTableLoading,
  getIsWithdrawal,
  getOrder,
} from '../transferMoneySelectors';
import EmptyView from '../../../components/EmptyView';
import TableView from '../../../../../components/TableView/TableView';
import TransferMoneyTableBody from './TransferMoneyTableBody';
import styles from '../../../components/BankTransactionOpenEntryTable.module.css'; // @TODO: Refactor so it doesn't rely on list styling

const getTableConfig = (isWithdrawal) => ({
  select: {
    cellRole: 'checkbox',
    valign: 'middle',
    width: 'auto',
    align: 'left',
  },
  date: {
    columnName: 'Date',
    width: '11rem',
    valign: 'middle',
    align: 'left',
  },
  account: {
    columnName: 'Bank account',
    width: 'flex-1',
    valign: 'middle',
    align: 'left',
  },
  description: {
    columnName: 'Description',
    width: 'flex-1',
    valign: 'middle',
    align: 'left',
  },
  amount: {
    columnName: !isWithdrawal ? 'Withdrawal ($)' : 'Deposit ($)',
    width: '16rem',
    valign: 'middle',
    align: 'right',
  },
});

const TransferMoneyTable = (props) => {
  const {
    order,
    isWithdrawal,
    isTableEmpty,
    isTableLoading,
    onSort,
    onSelect,
    onOpenTransferMoneyModal,
  } = props;

  const tableConfig = getTableConfig(isWithdrawal);
  const view = (
    <TransferMoneyTableBody tableConfig={tableConfig} onSelect={onSelect} />
  );

  const header = (
    <Table.Header>
      <Table.HeaderItem {...tableConfig.select} />
      <Table.HeaderItem {...tableConfig.date}>
        <HeaderSort
          title={tableConfig.date.columnName}
          sortName="Date"
          activeSort={order}
          onSort={onSort}
        />
      </Table.HeaderItem>
      <Table.HeaderItem {...tableConfig.account}>
        <HeaderSort
          title={tableConfig.account.columnName}
          sortName="AccountDisplayId"
          activeSort={order}
          onSort={onSort}
        />
      </Table.HeaderItem>
      <Table.HeaderItem {...tableConfig.description}>
        <HeaderSort
          title={tableConfig.description.columnName}
          sortName="Description"
          activeSort={order}
          onSort={onSort}
        />
      </Table.HeaderItem>
      <Table.HeaderItem {...tableConfig.amount}>
        <HeaderSort
          title={tableConfig.amount.columnName}
          sortName="Amount"
          activeSort={order}
          onSort={onSort}
        />
      </Table.HeaderItem>
    </Table.Header>
  );

  const emptyView = (
    <EmptyView>
      <div>
        <div>No matching transfers found.</div>
        <Button
          type="link"
          icon={<Icons.Add />}
          onClick={onOpenTransferMoneyModal}
        >
          Create a transfer money
        </Button>
      </div>
    </EmptyView>
  );

  return (
    <TableView
      header={header}
      isLoading={isTableLoading}
      isEmpty={isTableEmpty}
      emptyView={emptyView}
      className={styles.matchTransactionTable}
    >
      {view}
    </TableView>
  );
};

const mapStateToProps = (state) => ({
  order: getOrder(state),
  isWithdrawal: getIsWithdrawal(state),
  isTableLoading: getIsTableLoading(state),
  isTableEmpty: getIsTableEmpty(state),
});

export default connect(mapStateToProps)(TransferMoneyTable);
