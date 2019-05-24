import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import React from 'react';
import Table from '@myob/myob-widgets/lib/components/Table/Table';

import { getIsOpenEntryCreating } from '../bankingSelectors';
import { getPaymentAllocationEntries } from '../bankingSelectors/paymentAllocationSelectors';
import PaymentAllocationRow from './PaymentAllocationRow';

const PaymentAllocationTableBody = (props) => {
  const {
    isCreating,
    tableConfig,
    entries,
    onUpdatePaymentAllocationLine,
  } = props;

  return (
    <Table.Body>
      {entries.map((entry, index) => {
        if (isCreating) {
          return (
            <PaymentAllocationRow
              key={entry.id}
              index={index}
              tableConfig={tableConfig}
              onUpdatePaymentAllocationLine={onUpdatePaymentAllocationLine}
            />
          );
        }

        return (
          <Table.Row key={entry.id}>
            <Table.RowItem {...tableConfig.referenceId}>{entry.referenceId}</Table.RowItem>
            <Table.RowItem {...tableConfig.status}>{entry.status}</Table.RowItem>
            <Table.RowItem {...tableConfig.date}>{entry.date}</Table.RowItem>
            <Table.RowItem {...tableConfig.amount}>{entry.amount}</Table.RowItem>
            <Table.RowItem {...tableConfig.appliedAmount}>{entry.appliedAmount}</Table.RowItem>
          </Table.Row>
        );
      })}
    </Table.Body>
  );
};

PaymentAllocationTableBody.propTypes = {
  isCreating: PropTypes.bool.isRequired,
  tableConfig: PropTypes.shape({}).isRequired,
  entries: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  onUpdatePaymentAllocationLine: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  isCreating: getIsOpenEntryCreating(state),
  entries: getPaymentAllocationEntries(state),
});

export default connect(mapStateToProps)(PaymentAllocationTableBody);
