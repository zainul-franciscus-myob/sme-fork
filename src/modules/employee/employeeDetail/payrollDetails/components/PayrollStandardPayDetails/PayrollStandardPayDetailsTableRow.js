import { Button, Table } from '@myob/myob-widgets';
import React from 'react';

import { fieldTypes } from '../../selectors/PayrollStandardPaySelectors';
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
  fieldType, payItemId, payItemType, isLoading, onChange, onBlur,
}) => {
  switch (fieldType) {
    case fieldTypes.input:
      return (
        <AmountInput
          name={name}
          label={label}
          hideLabel
          textAlign="right"
          value={value}
          disabled={isLoading}
          onChange={handleInputChange(onChange, payItemId, payItemType)}
          onBlur={handleInputChange(onBlur, payItemId, payItemType)}
          numeralIntegerScale={13}
          numeralDecimalScaleMin={numeralDecimalScaleMin}
          numeralDecimalScaleMax={numeralDecimalScaleMax}
        />
      );
    case fieldTypes.calculated:
      return 'Calculated';
    default:
      return '';
  }
};

const PayrollStandardPayDetailsTableRow = ({
  tableConfig,
  entry: {
    payItemId,
    payItemType,
    hours,
    amount,
    name,
    hourFieldType,
    amountFieldType,
    isLoading,
  },
  onChange,
  onBlur,
  onClick,
}) => {
  const hourRowItem = renderAmountInputField({
    name: 'hours',
    label: 'Hours',
    value: hours,
    numeralDecimalScaleMin: 2,
    numeralDecimalScaleMax: 3,
    fieldType: hourFieldType,
    payItemId,
    payItemType,
    isLoading,
    onChange,
    onBlur,
  });
  const amountRowItem = renderAmountInputField({
    name: 'amount',
    label: 'Amount',
    value: amount,
    numeralDecimalScaleMin: 2,
    numeralDecimalScaleMax: 2,
    fieldType: amountFieldType,
    payItemId,
    payItemType,
    isLoading,
    onChange,
    onBlur,
  });

  const tableConfigWithConditionalHeaders = {
    ...tableConfig,
    hours: {
      ...tableConfig.hours,
      columnName: hourRowItem ? tableConfig.hours.columnName : '',
    },
    amount: {
      ...tableConfig.amount,
      columnName: amountRowItem ? tableConfig.hours.columnName : '',
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

export default PayrollStandardPayDetailsTableRow;
