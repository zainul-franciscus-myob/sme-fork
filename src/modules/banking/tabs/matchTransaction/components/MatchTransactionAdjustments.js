import { BulkAdd, Input } from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';

import {
  getAccounts,
  getAdjustments,
  getIsLoadingAccount,
  getTaxCodes,
} from '../matchTransactionSelectors';
import AccountCombobox from '../../../../../components/combobox/AccountCombobox';
import AmountInput from '../../../../../components/autoFormatter/AmountInput/FormattedAmountInput';
import TaxCodeCombobox from '../../../../../components/combobox/TaxCodeCombobox';
import getRegionToDialectText from '../../../../../dialect/getRegionToDialectText';
import handleAmountInputChange from '../../../../../components/handlers/handleAmountInputChange';
import handleComboboxChange from '../../../../../components/handlers/handleComboboxChange';
import handleInputChange from '../../../../../components/handlers/handleInputChange';

const getTableColumns = ({ taxCodeLabel }) => [
  { label: 'Account', requiredLabel: 'required', textWrap: 'wrap' },
  {
    label: 'Amount ($)',
    align: 'right',
    requiredLabel: 'required',
  },
  {
    label: 'Quantity',
    align: 'right',
  },
  { label: 'Description' },
  {
    label: 'Job',
    textWrap: 'wrap',
  },
  {
    label: taxCodeLabel,
    requiredLabel: 'required',
    textWrap: 'wrap',
  },
];

const getResponsiveWidths = (taxCodeLabel) => [
  {
    'min-width': '1160px',
    config: [
      { columnName: 'Account', styles: { width: 'flex-1' } },
      { columnName: 'Amount ($)', styles: { width: '16.4rem' } },
      { columnName: 'Quantity', styles: { width: '10.6rem' } },
      { columnName: 'Description', styles: { width: 'flex-1' } },
      { columnName: 'Job', styles: { width: '16.4rem' } },
      { columnName: taxCodeLabel, styles: { width: '16.4rem' } },
    ],
  },
];

const handleAutoCompleteItemChange = (handler, name) => (item) => {
  handler({
    key: name,
    value: item ? item.id : '',
  });
};

const renderRow = (
  accounts,
  taxCodes,
  [
    accountColumn,
    amountColumn,
    quantityColumn,
    descColumn,
    jobColumn,
    taxColumn,
  ],
  onAddAccount,
  renderJobCombobox,
  isLoadingAccount
) => (index, adjustment, onChange) => {
  const {
    id,
    accountId,
    amount = '',
    quantity = '',
    description,
    taxCodeId,
    jobId,
  } = adjustment;
  return (
    <BulkAdd.Row key={id} index={index}>
      <BulkAdd.RowItem columnName={accountColumn.label} {...accountColumn}>
        <AccountCombobox
          items={accounts}
          onChange={handleComboboxChange('accountId', onChange)}
          selectedId={accountId}
          addNewAccount={() =>
            onAddAccount(handleComboboxChange('accountId', onChange))
          }
          disabled={isLoadingAccount}
        />
      </BulkAdd.RowItem>
      <BulkAdd.RowItem columnName={amountColumn.label} {...amountColumn}>
        <AmountInput
          name="amount"
          textAlign="right"
          onChange={handleAmountInputChange(onChange)}
          value={amount}
          disabled={isLoadingAccount}
          numeralDecimalScaleMin={2}
          numeralDecimalScaleMax={2}
        />
      </BulkAdd.RowItem>
      <BulkAdd.RowItem columnName={quantityColumn.label} {...quantityColumn}>
        <AmountInput
          name="quantity"
          textAlign="right"
          onChange={handleAmountInputChange(onChange)}
          value={quantity}
          disabled={isLoadingAccount}
        />
      </BulkAdd.RowItem>
      <BulkAdd.RowItem columnName={descColumn.label} {...descColumn}>
        <Input
          name="description"
          disabled={isLoadingAccount}
          onChange={handleInputChange(onChange)}
          value={description}
        />
      </BulkAdd.RowItem>
      <BulkAdd.RowItem columnName={jobColumn.label} {...jobColumn}>
        {renderJobCombobox({
          hideLabel: true,
          selectedId: jobId,
          onChange: handleAutoCompleteItemChange(onChange, 'jobId'),
          left: true,
        })}
      </BulkAdd.RowItem>
      <BulkAdd.RowItem columnName={taxColumn.label} {...taxColumn}>
        <TaxCodeCombobox
          disabled={isLoadingAccount}
          items={taxCodes}
          selectedId={taxCodeId}
          onChange={handleComboboxChange('taxCodeId', onChange)}
        />
      </BulkAdd.RowItem>
    </BulkAdd.Row>
  );
};

const MatchTransactionAdjustments = ({
  onAddAccount,
  renderJobCombobox,
  onUpdateAdjustment,
  onRemoveAdjustment,
  onAddAdjustment,
  adjustments,
  accounts,
  taxCodes,
  taxCodeLabel,
  isLoadingAccount,
}) => {
  const tableColumns = getTableColumns({ taxCodeLabel });
  const responsiveWidths = getResponsiveWidths(taxCodeLabel);

  return (
    <BulkAdd responsiveWidths={responsiveWidths}>
      <BulkAdd.Header>
        {tableColumns
          .filter((e) => e)
          .map((column) => (
            <BulkAdd.HeaderItem
              key={column.label}
              columnName={column.label}
              valign="middle"
              {...column}
            >
              {column.label}
            </BulkAdd.HeaderItem>
          ))}
      </BulkAdd.Header>
      <BulkAdd.Rows
        data={adjustments}
        renderRow={renderRow(
          accounts,
          taxCodes,
          tableColumns,
          onAddAccount,
          renderJobCombobox,
          isLoadingAccount
        )}
        onRowChange={onUpdateAdjustment}
        onRemoveRow={onRemoveAdjustment}
        onAddRow={onAddAdjustment}
      />
    </BulkAdd>
  );
};

const mapStateToProps = (state) => ({
  adjustments: getAdjustments(state),
  taxCodes: getTaxCodes(state),
  accounts: getAccounts(state),
  taxCodeLabel: getRegionToDialectText(state.region)('Tax code'),
  isLoadingAccount: getIsLoadingAccount(state),
});

export default connect(mapStateToProps)(MatchTransactionAdjustments);
