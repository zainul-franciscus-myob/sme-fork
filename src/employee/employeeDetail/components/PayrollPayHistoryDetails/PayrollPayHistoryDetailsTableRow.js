import { Button, Table } from '@myob/myob-widgets';
import React from 'react';

import AmountInput from '../../../../components/autoFormatter/AmountInput/AmountInput';

const handleInputChange = (handler, payItemId, payItemType) => (e) => {
  const { name, rawValue } = e.target;
  handler({
    payItemId, payItemType, key: name, value: rawValue,
  });
};

const handleOnClick = (handler, payItemId, payItemType) => () => {
  handler({ payItemId, payItemType });
};

const renderAmountInputField = ({
  name, label, value, decimalScale, disabled, payItemId, payItemType, onChange, onBlur,
}) => (
  <AmountInput
    name={name}
    label={label}
    hideLabel
    textAlign="right"
    value={value}
    disabled={disabled}
    onChange={handleInputChange(onChange, payItemId, payItemType)}
    onBlur={handleInputChange(onBlur, payItemId, payItemType)}
    numeralIntegerScale={13}
    decimalScale={decimalScale}
  />
);

const PayrollPayHistoryDetailsTableRow = ({
  tableConfig,
  entry: {
    payItemId,
    payItemType,
    hours,
    amount,
    name,
    isHours,
    isAmount,
  },
  disabled,
  onChange,
  onBlur,
  onClick,
}) => {
  const hourRowItem = isHours && renderAmountInputField({
    name: 'hours',
    label: 'Activity (hrs)',
    value: hours,
    numeralIntegerScale: 13,
    decimalScale: 2,
    disabled,
    payItemId,
    payItemType,
    onChange,
    onBlur,
  });

  const amountRowItem = isAmount && renderAmountInputField({
    name: 'amount',
    label: 'Activity ($)',
    value: amount,
    numeralIntegerScale: 26,
    decimalScale: 3,
    disabled,
    payItemId,
    payItemType,
    onChange,
    onBlur,
  });

  return (
    <Table.Row key={payItemId}>
      <Table.RowItem {...tableConfig.name} indentLevel={1}>
        <Button type="link" onClick={handleOnClick(onClick, payItemId, payItemType)}>{name}</Button>
      </Table.RowItem>
      <Table.RowItem {...tableConfig.hours}>{hourRowItem}</Table.RowItem>
      <Table.RowItem {...tableConfig.amount}>{amountRowItem}</Table.RowItem>
    </Table.Row>
  );
};

export default PayrollPayHistoryDetailsTableRow;
