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
        title="Name"
        sortName="TransactionName"
        activeSort={order}
        onSort={onSort}
      />
    </Table.HeaderItem>
    <Table.HeaderItem {...tableConfig.transactionType}>
      Transaction type
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
