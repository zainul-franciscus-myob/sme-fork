import {
  HeaderSort, RadioButton, Table,
} from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';

import { getIsTableEmpty, getIsTableLoading, getOrder } from '../bankingSelectors/matchTransactionSelectors';
import LoadingPageState from '../../components/LoadingPageState/LoadingPageState';
import MatchTransactionTableBody from './MatchTransactionTableBody';
import styles from './BankTransactionOpenEntryTable.module.css';

const tableConfig = {
  date: {
    columnName: 'Date', width: '11rem', valign: 'top', align: 'left',
  },
  referenceId: {
    columnName: 'Reference', width: '12.4rem', valign: 'top', align: 'left',
  },
  description: {
    columnName: 'Description', width: 'flex-1', valign: 'top', align: 'left',
  },
  amount: {
    columnName: 'Amount ($)', width: '15rem', valign: 'top', align: 'right',
  },
  radioButton: {
    cellRole: 'checkbox', valign: 'middle', width: 'auto',
  },
};

const emptyView = (
  <div className={styles.openEntryEmpty}>
    No results.
  </div>
);

const spinnerView = (
  <div className={styles.bankingTableSpinner}>
    <LoadingPageState size="medium" />
  </div>
);

const MatchTransactionTable = (props) => {
  const {
    isTableEmpty,
    isTableLoading,
    order,
    onSortMatchTransactions,
    onUpdateMatchTransactionSelection,
  } = props;

  let view;
  if (isTableLoading) {
    view = spinnerView;
  } else if (isTableEmpty) {
    view = emptyView;
  } else {
    view = (
      <MatchTransactionTableBody
        tableConfig={tableConfig}
        onUpdateMatchTransactionSelection={onUpdateMatchTransactionSelection}
      />
    );
  }

  const header = (
    <Table.Header>
      <Table.HeaderItem {...tableConfig.radioButton}>
        <RadioButton
          name="selectedJournalLineId"
          label="Match"
          hideLabel
          disabled
        />
      </Table.HeaderItem>
      <Table.HeaderItem {...tableConfig.date}>
        <HeaderSort title="Date" sortName="DateOccurred" activeSort={order} onSort={onSortMatchTransactions} />
      </Table.HeaderItem>
      <Table.HeaderItem {...tableConfig.referenceId}>
        <HeaderSort title="Reference" sortName="DisplayId" activeSort={order} onSort={onSortMatchTransactions} />
      </Table.HeaderItem>
      <Table.HeaderItem {...tableConfig.description}>
        <HeaderSort title="Description" sortName="Description" activeSort={order} onSort={onSortMatchTransactions} />
      </Table.HeaderItem>
      <Table.HeaderItem {...tableConfig.amount}>
        <HeaderSort title="Amount ($)" sortName="Amount" activeSort={order} onSort={onSortMatchTransactions} />
      </Table.HeaderItem>
    </Table.Header>
  );

  return (
    <Table className={styles.matchTransactionTable}>
      {header}
      {view}
    </Table>
  );
};

const mapStateToProps = state => ({
  isTableLoading: getIsTableLoading(state),
  isTableEmpty: getIsTableEmpty(state),
  order: getOrder(state),
});

export default connect(mapStateToProps)(MatchTransactionTable);
