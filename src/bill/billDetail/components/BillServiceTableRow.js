import { LineItemTable, TextArea } from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';

import {
  getAccountOptions, getBillLine, getIsBlocking, getIsNewLine, getTaxCodeOptions,
} from '../selectors/billSelectors';
import AccountCombobox from '../../../components/combobox/AccountCombobox';
import AmountInput from '../../../components/autoFormatter/AmountInput/AmountInput';
import TaxCodeCombobox from '../../../components/combobox/TaxCodeCombobox';

const handleComboboxChange = (handler, name) => item => handler({
  target: {
    name,
    value: item.id,
  },
});

const handleAmountInputChange = handler => e => (
  handler({
    target: {
      name: e.target.name,
      value: e.target.rawValue,
    },
  })
);

const BillServiceTableRow = ({
  billLine,
  index,
  accountOptions,
  taxCodeOptions,
  isNewLine,
  isBlocking,
  onChange,
  onRowInputBlur,
  ...feelixInjectedProps
}) => {
  const {
    description,
    accountId,
    taxCodeId,
    displayAmount,
  } = billLine;

  return (
    <LineItemTable.Row
      index={index}
      id={index}
      {...feelixInjectedProps}
    >
      <TextArea
        name="description"
        value={description}
        onChange={onChange}
        autoSize
        disabled={isNewLine || isBlocking}
      />
      <AccountCombobox
        onChange={handleComboboxChange(onChange, 'accountId')}
        items={accountOptions}
        selectedId={accountId}
        disabled={isBlocking}
      />
      <AmountInput
        name="amount"
        value={displayAmount}
        onChange={handleAmountInputChange(onChange)}
        onBlur={onRowInputBlur}
        textAlign="right"
        disabled={isNewLine || isBlocking}
      />
      <TaxCodeCombobox
        onChange={handleComboboxChange(onChange, 'taxCodeId')}
        items={taxCodeOptions}
        selectedId={taxCodeId}
        disabled={isNewLine || isBlocking}
        left
      />
    </LineItemTable.Row>
  );
};

const mapStateToProps = (state, props) => ({
  billLine: getBillLine(state, props),
  accountOptions: getAccountOptions(state),
  taxCodeOptions: getTaxCodeOptions(state),
  isNewLine: getIsNewLine(state, props),
  isBlocking: getIsBlocking(state, props),
});

export default connect(mapStateToProps)(BillServiceTableRow);
