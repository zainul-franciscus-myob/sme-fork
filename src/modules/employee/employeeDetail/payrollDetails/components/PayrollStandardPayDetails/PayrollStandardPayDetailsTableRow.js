import { Button, Table } from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';

import { fieldTypes, getIsPayrollJobColumnEnabled, getJobs } from '../../selectors/PayrollStandardPaySelectors';
import AmountInput from '../../../../../../components/autoFormatter/AmountInput/AmountInput';
import JobCombobox from '../../../../../../components/combobox/JobCombobox';

const handleInputChange = (handler, payItemId, payItemType) => (e) => {
  const { name, rawValue } = e.target;
  handler({
    payItemId, payItemType, key: name, value: rawValue,
  });
};

const handleOnClick = (handler, payItemId, payItemType) => () => {
  handler({ payItemId, payItemType });
};

const handleComboboxChange = (payItemId, key, handler) => (item) => {
  handler({
    payItemId,
    key,
    value: item.id,
  });
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
    jobId,
    name,
    hourFieldType,
    amountFieldType,
    isLoading,
  },
  onChange,
  onBlur,
  onClick,
  jobs,
  excludeJobs,
  isPayrollJobColumnEnabled,
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
  const jobRowItem = !excludeJobs && <JobCombobox
    onChange={handleComboboxChange(payItemId, 'jobId', onChange)}
    items={jobs}
    selectedId={jobId}
    disabled={isLoading}
    allowClear
  />;

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
    job: {
      ...tableConfig.job,
      columnName: jobRowItem ? tableConfig.job.columnName : '',
    },
  };

  return (
    <Table.Row key={payItemId}>
      <Table.RowItem {...tableConfig.name} indentLevel={1}>
        <Button type="link" onClick={handleOnClick(onClick, payItemId, payItemType)}>{name}</Button>
      </Table.RowItem>
      <Table.RowItem {...tableConfigWithConditionalHeaders.hours}>{hourRowItem}</Table.RowItem>
      <Table.RowItem {...tableConfigWithConditionalHeaders.amount}>{amountRowItem}</Table.RowItem>
      {isPayrollJobColumnEnabled
      && <Table.RowItem textWrap="wrap" {...tableConfigWithConditionalHeaders.job}>{jobRowItem}</Table.RowItem>}
    </Table.Row>
  );
};
const mapStateToProps = state => ({
  jobs: getJobs(state),
  isPayrollJobColumnEnabled: getIsPayrollJobColumnEnabled(state),
});

export default connect(mapStateToProps)(PayrollStandardPayDetailsTableRow);
