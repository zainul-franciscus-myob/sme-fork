import { HeaderSort, Table } from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';

import { getOrder } from '../selectors/transactionListSelectors';

const JournalTransactionListTableHeader = ({ order, onSort, tableConfig }) => (
  <Table.Header>
    <Table.HeaderItem {...tableConfig.date}>
      <HeaderSort
        title="Date"
        sortName="Date"
        activeSort={order}
        onSort={onSort}
      />
    </Table.HeaderItem>
    <Table.HeaderItem {...tableConfig.referenceId}>
      <HeaderSort
        title="Reference no"
        sortName="Reference"
        activeSort={order}
        onSort={onSort}
      />
    </Table.HeaderItem>
    <Table.HeaderItem {...tableConfig.description}>
      <HeaderSort
        title="Description"
        sortName="Description"
        activeSort={order}
        onSort={onSort}
      />
    </Table.HeaderItem>
    <Table.HeaderItem {...tableConfig.sourceJournal}>
      <HeaderSort
        title="Source journal"
        sortName="SourceJournal"
        activeSort={order}
        onSort={onSort}
      />
    </Table.HeaderItem>
    <Table.HeaderItem {...tableConfig.displayAmount}>
      <HeaderSort
        title="Amount ($)"
        sortName="Amount"
        activeSort={order}
        onSort={onSort}
      />
    </Table.HeaderItem>
  </Table.Header>
);

const mapStateToProps = state => ({
  order: getOrder(state),
});

export default connect(mapStateToProps)(JournalTransactionListTableHeader);
