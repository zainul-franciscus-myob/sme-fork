import { Input, LineItemTable } from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';

import {
  getLineDataByIndexSelector,
  getNewLineData,
} from '../IncomeAllocationSelectors';
import AccountCombobox from '../../../components/combobox/AccountCombobox';

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
    headerAccountId,
    retainedEarningsAccounts,
    retainedEarningsAccountId,
    currentEarningsAccounts,
    currentEarningsAccountId,
    equity = '',
  } = data;

  return (
    <LineItemTable.Row id={index} index={index} {...feelixInjectedProps}>
      <AccountCombobox
        items={headerAccounts}
        selectedId={headerAccountId}
        onChange={eventWrapper('headerAccountId', onChange)}
      />
      <AccountCombobox
        items={retainedEarningsAccounts}
        selectedId={retainedEarningsAccountId}
        onChange={eventWrapper('retainedEarningsAccountId', onChange)}
        disabled={isNewLineRow}
      />
      <AccountCombobox
        items={currentEarningsAccounts}
        selectedId={currentEarningsAccountId}
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
    </LineItemTable.Row>
  );
};

const makeMapRowStateToProps = () => {
  const lineDataByIndex = getLineDataByIndexSelector();
  return (state, ownProps) => ({
    lineData: lineDataByIndex(state, ownProps),
    newLineData: getNewLineData(state),
  });
};

export default connect(makeMapRowStateToProps)(IncomeAllocationRow);
