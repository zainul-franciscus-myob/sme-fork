import { HeaderSort, Table } from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';

import { getOrder } from '../recurringTransactionListSelectors';

const RecurringTransactionListTableHeader = ({
  tableConfig,
  onSort,
  order,
}) => (
  <Table.Header>
    <Table.HeaderItem {...tableConfig.transactionName}>
      <HeaderSort
        title="Schedule name"
        sortName="TransactionName"
        activeSort={order}
        onSort={onSort}
      />
    </Table.HeaderItem>
    <Table.HeaderItem {...tableConfig.transactionType}>
      <HeaderSort
        title="Transaction type"
        sortName="TransactionTypeDescription"
        activeSort={order}
        onSort={onSort}
      />
    </Table.HeaderItem>
    <Table.HeaderItem {...tableConfig.frequency}>
      <HeaderSort
        title="Frequency"
        sortName="Frequency"
        activeSort={order}
        onSort={onSort}
      />
    </Table.HeaderItem>
    <Table.HeaderItem {...tableConfig.overdue}>
      <HeaderSort
        title="Overdue"
        sortName="Overdue"
        activeSort={order}
        onSort={onSort}
      />
    </Table.HeaderItem>
    <Table.HeaderItem {...tableConfig.lastPosted}>
      <HeaderSort
        title="Last posted"
        sortName="LastPosted"
        activeSort={order}
        onSort={onSort}
      />
    </Table.HeaderItem>
    <Table.HeaderItem {...tableConfig.nextDue}>
      <HeaderSort
        title="Next due"
        sortName="NextDue"
        activeSort={order}
        onSort={onSort}
      />
    </Table.HeaderItem>
    <Table.HeaderItem {...tableConfig.amount}>
      <HeaderSort
        title="Amount ($)"
        sortName="Amount"
        activeSort={order}
        onSort={onSort}
      />
    </Table.HeaderItem>
  </Table.Header>
);

const mapStateToProps = (state) => ({
  order: getOrder(state),
});

export default connect(mapStateToProps)(RecurringTransactionListTableHeader);
