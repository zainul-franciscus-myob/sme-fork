import { Button, Table } from '@myob/myob-widgets';
import React from 'react';

import AmountInput from '../../../../../../components/autoFormatter/AmountInput/AmountInput';

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
  name, label, value, numeralDecimalScaleMin, numeralDecimalScaleMax,
  disabled, payItemId, payItemType, onChange,
}) => (
  <AmountInput
    name={name}
    label={label}
    hideLabel
    textAlign="right"
    value={value}
    disabled={disabled}
    onChange={handleInputChange(onChange, payItemId, payItemType)}
    onBlur={handleInputChange(onChange, payItemId, payItemType)}
    numeralIntegerScale={13}
    numeralDecimalScaleMin={numeralDecimalScaleMin}
    numeralDecimalScaleMax={numeralDecimalScaleMax}
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
  onClick,
}) => {
  const hourRowItem = isHours && renderAmountInputField({
    name: 'hours',
    label: 'Activity (hrs)',
    value: hours,
    numeralIntegerScale: 13,
    numeralDecimalScaleMin: 2,
    numeralDecimalScaleMax: 3,
    disabled,
    payItemId,
    payItemType,
    onChange,
  });

  const amountRowItem = isAmount && renderAmountInputField({
    name: 'amount',
    label: 'Activity ($)',
    value: amount,
    numeralIntegerScale: 26,
    numeralDecimalScaleMin: 2,
    numeralDecimalScaleMax: 2,
    disabled,
    payItemId,
    payItemType,
    onChange,
  });

  const tableConfigWithConditionalHeaders = {
    ...tableConfig,
    hours: {
      ...tableConfig.hours,
      columnName: hourRowItem ? tableConfig.hours.columnName : '',
    },
    amount: {
      ...tableConfig.amount,
      columnName: amountRowItem ? tableConfig.amount.columnName : '',
    },
  };

  return (
    <Table.Row key={payItemId}>
      <Table.RowItem {...tableConfig.name} indentLevel={1}>
        <Button type="link" onClick={handleOnClick(onClick, payItemId, payItemType)}>{name}</Button>
      </Table.RowItem>
      <Table.RowItem {...tableConfigWithConditionalHeaders.hours}>{hourRowItem}</Table.RowItem>
      <Table.RowItem {...tableConfigWithConditionalHeaders.amount}>{amountRowItem}</Table.RowItem>
    </Table.Row>
  );
};

export default PayrollPayHistoryDetailsTableRow;
