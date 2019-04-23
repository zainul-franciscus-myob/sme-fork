import { Input, LineItemTable } from '@myob/myob-widgets';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import React from 'react';

import {
  getLineDataByIndexSelector, getNewLineData,
} from '../IncomeAllocationSelectors';
import AccountCombobox from '../../components/combobox/AccountCombobox';

const eventWrapper = (name, onChange) => (item) => {
  onChange({
    target: {
      name,
      value: item.id,
    },
  });
};

const IncomeAllocationRow = (props) => {
  const {
    index,
    onRowInputBlur,
    onChange,
    isNewLineRow,
    lineData,
    newLineData,
    ...feelixInjectedProps
  } = props;

  const data = isNewLineRow ? newLineData : lineData;

  const {
    headerAccounts,
    headerAccountIndex,
    retainedEarningsAccounts,
    retainedEarningsAccountIndex,
    currentEarningsAccounts,
    currentEarningsAccountIndex,
    equity = '',
  } = data;

  return (
    <LineItemTable.Row
      id={index}
      index={index}
      {...feelixInjectedProps}
    >
      <AccountCombobox
        items={headerAccounts}
        selectedIndex={headerAccountIndex}
        onChange={eventWrapper('headerAccountId', onChange)}
      />
      <AccountCombobox
        items={retainedEarningsAccounts}
        selectedIndex={retainedEarningsAccountIndex}
        onChange={eventWrapper('retainedEarningsAccountId', onChange)}
        disabled={isNewLineRow}
      />
      <AccountCombobox
        items={currentEarningsAccounts}
        selectedIndex={currentEarningsAccountIndex}
        onChange={eventWrapper('currentEarningsAccountId', onChange)}
        disabled={isNewLineRow}
      />
      <Input
        type="number"
        label="Equity"
        hideLabel
        name="equity"
        value={equity}
        disabled={isNewLineRow}
        onChange={onChange}
        step="0.01"
        onBlur={onRowInputBlur(index)}
      />
    </LineItemTable.Row>);
};

IncomeAllocationRow.propTypes = {
  index: PropTypes.number.isRequired,
  onRowInputBlur: PropTypes.func.isRequired,
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

export default connect(makeMapRowStateToProps)(IncomeAllocationRow);
