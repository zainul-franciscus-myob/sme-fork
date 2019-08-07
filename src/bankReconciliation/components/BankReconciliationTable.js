import {
  Checkbox, HeaderSort, LineItemTable, Table,
} from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';

import {
  getFormattedOutOfBalance,
  getHeaderSelectStatus, getIsActionDisabled,
  getIsOutOfBalance,
  getIsTableEmpty,
  getIsTableLoading,
  getOrder,
} from '../BankReconciliationSelectors';
import BankReconciliationTableBody from './BankReconciliationTableBody';
import TableView from '../../components/TableView/TableView';

const tableConfig = {
  date: { width: '11rem' },
  reference: { width: '12.4rem' },
  description: { width: 'flex-1' },
  withdrawal: { width: '15rem', align: 'right' },
  deposit: { width: '13rem', align: 'right' },
};

const BankReconciliationTable = ({
  order,
  headerSelectStatus,
  isTableLoading,
  isTableEmpty,
  isOutOfBalance,
  outOfBalance,
  isActionDisabled,
  onSort,
  onSelectRow,
  onSelectAll,
}) => {
  const view = (
    <React.Fragment>
      <BankReconciliationTableBody
        tableConfig={tableConfig}
        onSelectRow={onSelectRow}
      />
      <LineItemTable.Total>
        <LineItemTable.Totals
          totalAmount
          title="Out of balance"
          amount={outOfBalance}
          type={isOutOfBalance ? 'danger' : undefined}
        />
      </LineItemTable.Total>
    </React.Fragment>
  );

  const header = (
    <Table.Header>
      <Table.HeaderItem width="auto">
        <Checkbox
          name="bulkSelect"
          label="Bulk select"
          hideLabel
          onChange={onSelectAll}
          checked={headerSelectStatus === 'checked'}
          indeterminate={headerSelectStatus === 'indeterminate'}
          disabled={isActionDisabled}
        />
      </Table.HeaderItem>
      <Table.HeaderItem {...tableConfig.date}>
        <HeaderSort title="Date" sortName="DateOccurred" activeSort={order} onSort={onSort} />
      </Table.HeaderItem>
      <Table.HeaderItem {...tableConfig.reference}>
        <HeaderSort title="Reference" sortName="DisplayId" activeSort={order} onSort={onSort} />
      </Table.HeaderItem>
      <Table.HeaderItem {...tableConfig.description}>
        <HeaderSort title="Description" sortName="Description" activeSort={order} onSort={onSort} />
      </Table.HeaderItem>
      <Table.HeaderItem {...tableConfig.withdrawal}>
        <HeaderSort title="Withdrawal ($)" sortName="Withdrawal" activeSort={order} onSort={onSort} />
      </Table.HeaderItem>
      <Table.HeaderItem {...tableConfig.deposit}>
        <HeaderSort title="Deposit ($)" sortName="Deposit" activeSort={order} onSort={onSort} />
      </Table.HeaderItem>
    </Table.Header>
  );

  return (
    <TableView
      emptyMessage="There are no transactions for the selected filter options."
      isLoading={isTableLoading}
      isEmpty={isTableEmpty}
      header={header}
    >
      { view }
    </TableView>
  );
};

const mapStateToProps = state => ({
  order: getOrder(state),
  isTableLoading: getIsTableLoading(state),
  isTableEmpty: getIsTableEmpty(state),
  isOutOfBalance: getIsOutOfBalance(state),
  outOfBalance: getFormattedOutOfBalance(state),
  headerSelectStatus: getHeaderSelectStatus(state),
  isActionDisabled: getIsActionDisabled(state),
});

export default connect(mapStateToProps)(BankReconciliationTable);
