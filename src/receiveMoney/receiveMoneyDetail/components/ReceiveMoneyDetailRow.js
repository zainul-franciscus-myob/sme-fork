import { Input, LineItemTable } from '@myob/myob-widgets';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import React from 'react';

import {
  getLineDataByIndexSelector, getNewLineData,
} from '../receiveMoneyDetailSelectors';
import AccountCombobox from '../../../components/combobox/AccountCombobox';
import TaxCodeCombobox from '../../../components/combobox/TaxCodeCombobox';

const eventWrapper = (name, onChange) => (item) => {
  onChange({
    target: {
      name,
      value: item.id,
    },
  });
};

const ReceiveMoneyDetailRow = (props) => {
  const {
    index,
    onMoveRow,
    onRowInputBlur,
    onChange,
    isNewLineRow,
    lineData,
    newLineData,
    ...feelixInjectedProps
  } = props;

  const data = isNewLineRow ? newLineData : lineData;

  const {
    amount = '',
    description = '',
    selectedAccountIndex,
    taxCodes,
    accounts,
    selectedTaxCodeIndex,
  } = data;

  return (
    <LineItemTable.Row
      id={index}
      index={index}
      moveRow={onMoveRow}
      {...feelixInjectedProps}
    >
      <AccountCombobox
        items={accounts}
        selectedIndex={selectedAccountIndex}
        onChange={eventWrapper('accountId', onChange)}
      />
      <Input
        type="number"
        label="Amount"
        hiddenLabel
        name="amount"
        value={amount}
        disabled={isNewLineRow}
        onChange={onChange}
        step="0.01"
      />
      <Input
        type="text"
        label="Description"
        hiddenLabel
        name="description"
        value={description}
        onChange={onChange}
        disabled={isNewLineRow}
      />
      <TaxCodeCombobox
        items={taxCodes}
        selectedIndex={selectedTaxCodeIndex}
        onChange={eventWrapper('taxCodeId', onChange)}
        disabled={isNewLineRow}
      />
    </LineItemTable.Row>);
};

ReceiveMoneyDetailRow.propTypes = {
  index: PropTypes.number.isRequired,
  onMoveRow: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  isNewLineRow: PropTypes.bool.isRequired,
  lineData: PropTypes.shape({}).isRequired,
  newLineData: PropTypes.shape({}).isRequired,
};

const makeMapRowStateToProps = () => {
  const lineDataByIndex = getLineDataByIndexSelector();
  return (state, ownProps) => ({
    lineData: lineDataByIndex(state, ownProps),
    newLineData: getNewLineData(state),
  });
};

export default connect(makeMapRowStateToProps)(ReceiveMoneyDetailRow);
