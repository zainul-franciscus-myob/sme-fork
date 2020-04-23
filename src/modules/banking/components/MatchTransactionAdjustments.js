import {
  BulkAdd,
  Input,
} from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';

import { getAccounts, getAdjustments } from '../bankingSelectors/matchTransactionSelectors';
import {
  getIsBankingJobColumnEnabled, getIsLoadingAccount, getJobs, getTaxCodes,
} from '../bankingSelectors/index';
import AccountCombobox from '../../../components/combobox/AccountCombobox';
import AmountInput from '../../../components/autoFormatter/AmountInput/AmountInput';
import JobCombobox from '../../../components/combobox/JobCombobox';
import TaxCodeCombobox from '../../../components/combobox/TaxCodeCombobox';
import getRegionToDialectText from '../../../dialect/getRegionToDialectText';
import handleAmountInputChange from '../../../components/handlers/handleAmountInputChange';
import handleComboboxChange from '../../../components/handlers/handleComboboxChange';
import handleInputChange from '../../../components/handlers/handleInputChange';

const getTableColumns = ({ taxCodeLabel, isBankingJobColumnEnabled }) => [
  { label: 'Account', requiredLabel: 'required', textWrap: 'wrap' },
  {
    label: 'Amount ($)', align: 'right', requiredLabel: 'required',
  },
  {
    label: 'Quantity', align: 'right',
  },
  { label: 'Description' },
  isBankingJobColumnEnabled ? { label: 'Job', textWrap: 'wrap' } : null,
  {
    label: taxCodeLabel, requiredLabel: 'required', textWrap: 'wrap',
  },
];

const getResponsiveWidths = (taxCodeLabel, isBankingJobColumnEnabled) => [
  {
    'min-width': '1160px',
    config: [
      { columnName: 'Account', styles: { width: 'flex-1' } },
      { columnName: 'Amount ($)', styles: { width: '16.4rem' } },
      { columnName: 'Quantity', styles: { width: '10.6rem' } },
      { columnName: 'Description', styles: { width: 'flex-1' } },
      ...isBankingJobColumnEnabled ? [{ columnName: 'Job', styles: { width: '16.4rem' } }] : [],
      { columnName: taxCodeLabel, styles: { width: '16.4rem' } },
    ],
  },
];

const renderRow = (accounts, taxCodes, jobs, [
  accountColumn, amountColumn, quantityColumn, descColumn, jobColumn, taxColumn,
], onAddAccount, isLoadingAccount, isBankingJobColumnEnabled) => (index, adjustment, onChange) => {
  const {
    id, accountId, amount = '', quantity = '', description, taxCodeId, jobId,
  } = adjustment;
  return (
    <BulkAdd.Row key={id} index={index}>
      <BulkAdd.RowItem
        columnName={accountColumn.label}
        {...accountColumn}
      >
        <AccountCombobox
          items={accounts}
          onChange={handleComboboxChange('accountId', onChange)}
          selectedId={accountId}
          addNewAccount={() => onAddAccount(handleComboboxChange('accountId', onChange))}
          disabled={isLoadingAccount}
        />
      </BulkAdd.RowItem>
      <BulkAdd.RowItem
        columnName={amountColumn.label}
        {...amountColumn}
      >
        <AmountInput
          name="amount"
          textAlign="right"
          onChange={handleAmountInputChange(onChange)}
          value={amount}
          disabled={isLoadingAccount}
        />
      </BulkAdd.RowItem>
      <BulkAdd.RowItem
        columnName={quantityColumn.label}
        {...quantityColumn}
      >
        <AmountInput
          name="quantity"
          textAlign="right"
          onChange={handleAmountInputChange(onChange)}
          value={quantity}
          disabled={isLoadingAccount}
        />
      </BulkAdd.RowItem>
      <BulkAdd.RowItem
        columnName={descColumn.label}
        {...descColumn}
      >
        <Input name="description" disabled={isLoadingAccount} onChange={handleInputChange(onChange)} value={description} />
      </BulkAdd.RowItem>
      {isBankingJobColumnEnabled && <BulkAdd.RowItem
        columnName={jobColumn.label}
        {...jobColumn}
      >
        <JobCombobox
          onChange={handleComboboxChange('jobId', onChange)}
          items={jobs}
          selectedId={jobId}
          disabled={isLoadingAccount}
          allowClear
        />
      </BulkAdd.RowItem> }
      <BulkAdd.RowItem
        columnName={taxColumn.label}
        {...taxColumn}
      >
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
  onUpdateAdjustment,
  onRemoveAdjustment,
  onAddAdjustment,
  adjustments,
  accounts,
  taxCodes,
  jobs,
  taxCodeLabel,
  isLoadingAccount,
  isBankingJobColumnEnabled,
}) => {
  const tableColumns = getTableColumns({
    taxCodeLabel,
    isBankingJobColumnEnabled,
  });
  const responsiveWidths = getResponsiveWidths(taxCodeLabel, isBankingJobColumnEnabled);

  return (
    <BulkAdd responsiveWidths={responsiveWidths}>
      <BulkAdd.Header>
        {tableColumns.filter(e => e).map(column => (
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
          accounts, taxCodes, jobs,
          tableColumns, onAddAccount, isLoadingAccount, isBankingJobColumnEnabled,
        )}
        onRowChange={onUpdateAdjustment}
        onRemoveRow={onRemoveAdjustment}
        onAddRow={onAddAdjustment}
      />
    </BulkAdd>
  );
};

const mapStateToProps = state => ({
  adjustments: getAdjustments(state),
  taxCodes: getTaxCodes(state),
  accounts: getAccounts(state),
  jobs: getJobs(state),
  taxCodeLabel: getRegionToDialectText(state.region)('Tax code'),
  isLoadingAccount: getIsLoadingAccount(state),
  isBankingJobColumnEnabled: getIsBankingJobColumnEnabled(state),
});

export default connect(mapStateToProps)(MatchTransactionAdjustments);
