import { Spinner, Table } from '@myob/myob-widgets';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import React from 'react';

import { getTableOptions } from '../bankingSelectors/paymentAllocationSelectors';
import PaymentAllocationTableBody from './PaymentAllocationTableBody';
import styles from './BankingView.module.css';

const tableConfig = {
  referenceId: { width: '15rem', valign: 'top' },
  status: { width: 'flex-1', valign: 'top' },
  date: { width: '11rem', valign: 'top' },
  amount: { width: '17rem', valign: 'top', align: 'right' },
  discountAmount: { width: '17rem', valign: 'top', align: 'right' },
  balanceDue: { width: '15rem', valign: 'top', align: 'right' },
  appliedAmount: { width: '17rem', valign: 'top', align: 'right' },
};

const emptyView = tableEmptyMessage => (
  <div className={styles.openEntryEmpty}>
    {tableEmptyMessage}
  </div>
);

const spinnerView = (
  <div className={styles.bankingTableSpinner}>
    <Spinner size="medium" />
  </div>
);

const PaymentAllocationTable = (props) => {
  const {
    isCreating,
    isTableLoading,
    isTableEmpty,
    referenceIdLabel,
    amountLabel,
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
    <Table>
      <Table.Header>
        <Table.HeaderItem {...tableConfig.referenceId}>{referenceIdLabel}</Table.HeaderItem>
        <Table.HeaderItem {...tableConfig.status}>Status</Table.HeaderItem>
        <Table.HeaderItem {...tableConfig.date}>Date</Table.HeaderItem>
        <Table.HeaderItem {...tableConfig.amount}>{amountLabel}</Table.HeaderItem>
        {
          isCreating
            ? (
              <Table.HeaderItem {...tableConfig.discountAmount}>
                Discount given ($)
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
