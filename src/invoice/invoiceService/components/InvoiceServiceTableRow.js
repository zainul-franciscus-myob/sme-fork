import { Input, LineItemTable } from '@myob/myob-widgets';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import React from 'react';

import { getInvoiceLine } from '../invoiceServiceSelectors';
import AccountCombobox from '../../../components/combobox/AccountCombobox';
import AmountInput from '../../../components/autoFormatter/AmountInput/AmountInput';
import TaxCodeCombobox from '../../../components/combobox/TaxCodeCombobox';

const handleOnComboboxChange = (handler, name) => item => handler({
  target: {
    name,
    value: item.id,
  },
});


const InvoiceServiceTableRow = ({
  invoiceLine,
  index,
  onChange,
  onComboboxChange,
  onAmountInputFieldChange,
  onRowInputBlur,
  ...feelixInjectedProps
}) => {
  const {
    description,
    accounts,
    allocatedAccountId,
    taxCodes,
    taxCodeId,
    amount,
  } = invoiceLine;

  return (
    <LineItemTable.Row
      index={index}
      id={index}
      {...feelixInjectedProps}
    >
      <Input
        label="Description"
        hideLabel
        name="description"
        value={description}
        onChange={onChange}
        maxLength={255}
      />
      <AccountCombobox
        onChange={handleOnComboboxChange(onComboboxChange, 'allocatedAccountId')}
        items={accounts}
        selectedId={allocatedAccountId}
      />
      <TaxCodeCombobox
        onChange={handleOnComboboxChange(onComboboxChange, 'taxCodeId')}
        items={taxCodes}
        selectedId={taxCodeId}
      />
      <AmountInput
        label="Amount"
        hideLabel
        name="amount"
        value={amount}
        onChange={onAmountInputFieldChange}
        onBlur={onRowInputBlur}
      />
    </LineItemTable.Row>
  );
};

InvoiceServiceTableRow.propTypes = {
  invoiceLine: PropTypes.shape().isRequired,
  index: PropTypes.number.isRequired,
  onChange: PropTypes.func.isRequired,
};

const mapStateToProps = (state, props) => ({
  invoiceLine: getInvoiceLine(state, props),
});

export default connect(mapStateToProps)(InvoiceServiceTableRow);
