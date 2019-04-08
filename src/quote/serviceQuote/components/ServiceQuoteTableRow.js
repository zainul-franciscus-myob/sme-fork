import { Input, LineItemTable } from '@myob/myob-widgets';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import React from 'react';

import { getQuoteLine } from '../ServiceQuoteSelectors';
import AccountCombobox from '../../../components/combobox/AccountCombobox';
import TaxCodeCombobox from '../../../components/combobox/TaxCodeCombobox';

const ServiceQuoteTableRow = ({
  quoteLine, index,
}) => {
  const {
    description,
    accounts,
    selectedAccountIndex,
    taxCodes,
    selectedTaxCodeIndex,
    amount,
  } = quoteLine;
  return (
    <LineItemTable.Row
      index={index}
      id={index}
      moveRow={() => {}}
    >
      <Input
        label="Description"
        hiddenLabel
        name="description"
        value={description}
        onChange={() => {}}
      />
      <AccountCombobox
        onChange={() => {}}
        items={accounts}
        selectedIndex={selectedAccountIndex}
      />
      <TaxCodeCombobox
        onChange={() => {}}
        items={taxCodes}
        selectedIndex={selectedTaxCodeIndex}
      />
      <Input
        label="Amount"
        hiddenLabel
        name="amount"
        value={amount}
        onChange={() => {}}
      />
    </LineItemTable.Row>
  );
};

ServiceQuoteTableRow.propTypes = {
  quoteLine: PropTypes.shape().isRequired,
  index: PropTypes.number.isRequired,
};

const mapStateToProps = (state, props) => ({
  quoteLine: getQuoteLine(state, props),
});

export default connect(mapStateToProps)(ServiceQuoteTableRow);
