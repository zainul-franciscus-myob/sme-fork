import {
  BulkAdd,
  Input,
} from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';

import { getAccounts, getAdjustments } from '../bankingSelectors/matchTransactionSelectors';
import { getTaxCodes } from '../bankingSelectors';
import AccountCombobox from '../../../components/combobox/AccountCombobox';
import AmountInput from '../../../components/autoFormatter/AmountInput/AmountInput';
import TaxCodeCombobox from '../../../components/combobox/TaxCodeCombobox';
import getRegionToDialectText from '../../../dialect/getRegionToDialectText';
import handleAmountInputChange from '../../../components/handlers/handleAmountInputChange';
import handleComboboxChange from '../../../components/handlers/handleComboboxChange';
import handleInputChange from '../../../components/handlers/handleInputChange';

const getTableColumns = ({ taxCodeLabel }) => [
  { label: 'Account', requiredLabel: 'required', textWrap: 'wrap' },
  {
    label: 'Amount ($)', align: 'right', requiredLabel: 'required', width: '16.4rem',
  },
  {
    label: 'Quantity', align: 'right', width: '10.6rem',
  },
  { label: 'Description' },
  {
    label: taxCodeLabel, requiredLabel: 'required', width: '16.4rem', textWrap: 'wrap',
  },
];

const renderRow = (accounts, taxCodes, [
  accountColumn, amountColumn, quantityColumn, descColumn, taxColumn,
]) => (index, adjustment, onChange) => {
  const {
    id, accountId, amount = '', quantity = '', description, taxCodeId,
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
        />
      </BulkAdd.RowItem>
      <BulkAdd.RowItem
        columnName={amountColumn.label}
        {...amountColumn}
      >
        <AmountInput name="amount" textAlign="right" onChange={handleAmountInputChange(onChange)} value={amount} />
      </BulkAdd.RowItem>
      <BulkAdd.RowItem
        columnName={quantityColumn.label}
        {...quantityColumn}
      >
        <AmountInput name="quantity" textAlign="right" onChange={handleAmountInputChange(onChange)} value={quantity} />
      </BulkAdd.RowItem>
      <BulkAdd.RowItem
        columnName={descColumn.label}
        {...descColumn}
      >
        <Input name="description" onChange={handleInputChange(onChange)} value={description} />
      </BulkAdd.RowItem>
      <BulkAdd.RowItem
        columnName={taxColumn.label}
        {...taxColumn}
      >
        <TaxCodeCombobox
          items={taxCodes}
          selectedId={taxCodeId}
          onChange={handleComboboxChange('taxCodeId', onChange)}
        />
      </BulkAdd.RowItem>
    </BulkAdd.Row>
  );
};

const MatchTransactionAdjustments = ({
  onUpdateAdjustment,
  onRemoveAdjustment,
  onAddAdjustment,
  adjustments,
  accounts,
  taxCodes,
  taxCodeLabel,
}) => {
  const tableColumns = getTableColumns({
    taxCodeLabel,
  });

  return (
    <BulkAdd>
      <BulkAdd.Header>
        {tableColumns.map(column => (
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
        renderRow={renderRow(accounts, taxCodes, tableColumns)}
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
  taxCodeLabel: getRegionToDialectText(state.region)('Tax code'),
});

export default connect(mapStateToProps)(MatchTransactionAdjustments);
