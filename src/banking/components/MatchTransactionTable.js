import {
  Checkbox,
  HeaderSort,
  Table,
} from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';

import {
  getIsTableEmpty,
  getIsTableLoading,
  getOrder,
  getSelectAllState,
  getSelectedText,
  getSortingDisabled,
} from '../bankingSelectors/matchTransactionSelectors';
import LoadingPageState from '../../components/LoadingPageState/LoadingPageState';
import MatchTransactionTableBody from './MatchTransactionTableBody';
import handleCheckboxChange from '../../components/handlers/handleCheckboxChange';
import styles from './BankTransactionOpenEntryTable.module.css';

const tableConfig = {
  date: {
    columnName: 'Date', width: '11rem', valign: 'middle', align: 'left',
  },
  referenceId: {
    columnName: 'Reference', width: '12.4rem', valign: 'middle', align: 'left',
  },
  description: {
    columnName: 'Description', width: 'flex-1', valign: 'middle', align: 'left',
  },
  amount: {
    columnName: 'Total ($)', width: '16rem', valign: 'middle', align: 'right',
  },
  discount: {
    columnName: 'Discount ($)', width: '15rem', valign: 'middle', align: 'right',
  },
  amountDue: {
    columnName: 'Balance due ($)', width: '15rem', valign: 'middle', align: 'right',
  },
  matchAmount: {
    columnName: 'Match amount ($)', width: '17rem', valign: 'middle', align: 'right',
  },
  checkbox: {
    cellRole: 'checkbox', valign: 'middle', width: 'auto', align: 'left',
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

const Sorter = ({
  title,
  sortName,
  activeSort,
  onSort,
  disabled,
}) => (
  disabled ? title : (
    <HeaderSort title={title} sortName={sortName} activeSort={activeSort} onSort={onSort} />
  )
);

const MatchTransactionTable = (props) => {
  const {
    isTableEmpty,
    isTableLoading,
    isSelectedAll,
    footerLabel,
    order,
    onSortMatchTransactions,
    onUpdateMatchTransactionSelection,
    onUpdateSelectedTransactionDetails,
    onToggleSelectAllState,
    disableSorting,
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
        onUpdateSelectedTransactionDetails={onUpdateSelectedTransactionDetails}
      />
    );
  }

  const header = (
    <Table.Header>
      <Table.HeaderItem {...tableConfig.checkbox}>
        <Checkbox
          name="selectAll"
          label="Match"
          checked={isSelectedAll}
          hideLabel
          onChange={handleCheckboxChange(onToggleSelectAllState)}
        />
      </Table.HeaderItem>
      <Table.HeaderItem {...tableConfig.date}>
        <Sorter
          disabled={disableSorting}
          title="Date"
          sortName="DateOccurred"
          activeSort={order}
          onSort={onSortMatchTransactions}
        />
      </Table.HeaderItem>
      <Table.HeaderItem {...tableConfig.referenceId}>
        <Sorter
          disabled={disableSorting}
          title="Reference"
          sortName="DisplayId"
          activeSort={order}
          onSort={onSortMatchTransactions}
        />
      </Table.HeaderItem>
      <Table.HeaderItem {...tableConfig.description}>
        <Sorter
          disabled={disableSorting}
          title="Description"
          sortName="Description"
          activeSort={order}
          onSort={onSortMatchTransactions}
        />
      </Table.HeaderItem>
      <Table.HeaderItem {...tableConfig.amount}>
        <Sorter
          disabled={disableSorting}
          title="Total ($)"
          sortName="Amount"
          activeSort={order}
          onSort={onSortMatchTransactions}
        />
      </Table.HeaderItem>
      <Table.HeaderItem {...tableConfig.discount}>
        {tableConfig.discount.columnName}
      </Table.HeaderItem>
      <Table.HeaderItem {...tableConfig.amountDue}>
        {tableConfig.amountDue.columnName}
      </Table.HeaderItem>
      <Table.HeaderItem {...tableConfig.matchAmount}>
        {tableConfig.matchAmount.columnName}
      </Table.HeaderItem>
    </Table.Header>
  );

  return (
    <>
      <Table className={styles.matchTransactionTable}>
        {header}
        {view}
      </Table>
      <div className={styles.footerLabel}>{footerLabel}</div>
    </>
  );
};

const mapStateToProps = state => ({
  isTableLoading: getIsTableLoading(state),
  isTableEmpty: getIsTableEmpty(state),
  order: getOrder(state),
  isSelectedAll: getSelectAllState(state),
  footerLabel: getSelectedText(state),
  disableSorting: getSortingDisabled(state),
});

export default connect(mapStateToProps)(MatchTransactionTable);
