import { Table } from '@myob/myob-widgets';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import React from 'react';

import { getTableOptions } from '../bankingSelectors/paymentAllocationSelectors';
import LoadingPageState from '../../components/LoadingPageState/LoadingPageState';
import PaymentAllocationTableBody from './PaymentAllocationTableBody';
import styles from './BankTransactionOpenEntryTable.module.css';

const tableConfig = {
  referenceId: { columnName: 'Bill Number', valign: 'top' },
  status: { columnName: 'Status', valign: 'top' },
  date: { columnName: 'Date', valign: 'top' },
  amount: {
    columnName: 'Bill amount ($)', valign: 'top', align: 'right',
  },
  discountAmount: {
    columnName: 'Discount given ($)', valign: 'top', align: 'right',
  },
  balanceDue: {
    columnName: 'Balance due ($)', valign: 'top', align: 'right',
  },
  appliedAmount: {
    columnName: 'Amount paid ($)', valign: 'top', align: 'right',
  },
};

const emptyView = tableEmptyMessage => (
  <div className={styles.openEntryEmpty}>
    {tableEmptyMessage}
  </div>
);

const spinnerView = (
  <div className={styles.bankingTableSpinner}>
    <LoadingPageState size="medium" />
  </div>
);

const PaymentAllocationTable = (props) => {
  const {
    isCreating,
    isTableLoading,
    isTableEmpty,
    referenceIdLabel,
    amountPaidLabel,
    tableEmptyMessage,
    onUpdatePaymentAllocationLine,
  } = props;

  let view;
  if (isTableLoading) {
    view = spinnerView;
  } else if (isTableEmpty) {
    view = emptyView(tableEmptyMessage);
  } else {
    view = (
      <PaymentAllocationTableBody
        tableConfig={tableConfig}
        onUpdatePaymentAllocationLine={onUpdatePaymentAllocationLine}
      />
    );
  }

  return (
    <Table className={styles.paymentAllocationTable}>
      <Table.Header>
        <Table.HeaderItem {...tableConfig.referenceId}>{referenceIdLabel}</Table.HeaderItem>
        <Table.HeaderItem {...tableConfig.status}>Status</Table.HeaderItem>
        <Table.HeaderItem {...tableConfig.date}>Issue Date</Table.HeaderItem>
        <Table.HeaderItem {...tableConfig.amount}>Total amount ($)</Table.HeaderItem>
        {
          isCreating
            ? (
              <Table.HeaderItem {...tableConfig.discountAmount}>
                Discount ($)
              </Table.HeaderItem>
            )
            : null
        }
        {
          isCreating
            ? <Table.HeaderItem {...tableConfig.balanceDue}>Balance due ($)</Table.HeaderItem>
            : null
        }
        <Table.HeaderItem {...tableConfig.appliedAmount}>{amountPaidLabel}</Table.HeaderItem>
      </Table.Header>
      { view }
    </Table>
  );
};

PaymentAllocationTable.propTypes = {
  isCreating: PropTypes.bool.isRequired,
  isTableLoading: PropTypes.bool.isRequired,
  isTableEmpty: PropTypes.bool.isRequired,
  referenceIdLabel: PropTypes.string.isRequired,
  amountLabel: PropTypes.string.isRequired,
  amountPaidLabel: PropTypes.string.isRequired,
  tableEmptyMessage: PropTypes.string.isRequired,
  onUpdatePaymentAllocationLine: PropTypes.func.isRequired,
};

const mapStateToProps = state => getTableOptions(state);

export default connect(mapStateToProps)(PaymentAllocationTable);
