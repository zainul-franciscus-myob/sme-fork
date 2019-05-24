import { Table } from '@myob/myob-widgets';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import React from 'react';

import { getEntryByIndexSelector } from '../bankingSelectors/paymentAllocationSelectors';
import AmountInput from '../../components/autoFormatter/AmountInput/AmountInput';

const handleInputChange = (handler, index) => (e) => {
  const { name, rawValue } = e.target;
  handler({ index, key: name, value: rawValue });
};

const PaymentAllocationRow = (props) => {
  const {
    tableConfig,
    index,
    entry = {},
    onUpdatePaymentAllocationLine,
  } = props;

  const {
    id,
    referenceId,
    status,
    date,
    amount,
    discountAmount,
    balanceDue,
    appliedAmount,
  } = entry;

  return (
    <Table.Row key={id}>
      <Table.RowItem {...tableConfig.referenceId}>{referenceId}</Table.RowItem>
      <Table.RowItem {...tableConfig.status}>{status}</Table.RowItem>
      <Table.RowItem {...tableConfig.date}>{date}</Table.RowItem>
      <Table.RowItem {...tableConfig.amount}>{amount}</Table.RowItem>
      <Table.RowItem {...tableConfig.discountAmount}>
        <AmountInput
          label="discountAmount"
          hideLabel
          name="discountAmount"
          value={discountAmount}
          onChange={handleInputChange(onUpdatePaymentAllocationLine, index)}
          textAlign="right"
        />
      </Table.RowItem>
      <Table.RowItem {...tableConfig.balanceDue}>{balanceDue}</Table.RowItem>
      <Table.RowItem {...tableConfig.appliedAmount}>
        <AmountInput
          label="appliedAmount"
          hideLabel
          name="appliedAmount"
          value={appliedAmount}
          onChange={handleInputChange(onUpdatePaymentAllocationLine, index)}
          textAlign="right"
        />
      </Table.RowItem>
    </Table.Row>
  );
};

PaymentAllocationRow.propTypes = {
  index: PropTypes.number.isRequired,
  tableConfig: PropTypes.shape({}).isRequired,
  entry: PropTypes.shape({}).isRequired,
  onUpdatePaymentAllocationLine: PropTypes.func.isRequired,
};

const makeMapRowStateToProps = () => {
  const getEntryByIndex = getEntryByIndexSelector();
  return (state, ownProps) => ({
    entry: getEntryByIndex(state, ownProps),
  });
};

export default connect(makeMapRowStateToProps)(PaymentAllocationRow);
