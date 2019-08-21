import { Input, LineItemTable, TextArea } from '@myob/myob-widgets';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import React from 'react';

import {
  getLineDataByIndexSelector, getNewLineData,
} from '../generalJournalDetailSelectors';
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

const GeneralJournalDetailRow = (props) => {
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
    debitAmount = '',
    creditAmount = '',
    description = '',
    isCreditDisabled = false,
    isDebitDisabled = false,
    accountId,
    taxCodes,
    accounts,
    taxCodeId,
  } = data;

  return (
    <LineItemTable.Row
      id={index}
      index={index}
      {...feelixInjectedProps}
    >
      <AccountCombobox
        items={accounts}
        selectedId={accountId}
        onChange={eventWrapper('accountId', onChange)}
      />
      <Input
        type="number"
        label="DebitAmount"
        hideLabel
        name="debitAmount"
        value={debitAmount}
        disabled={isNewLineRow || isDebitDisabled}
        onChange={onChange}
        step="0.01"
        onBlur={onRowInputBlur(index)}
      />
      <Input
        type="number"
        label="CreditAmount"
        hideLabel
        name="creditAmount"
        value={creditAmount}
        disabled={isNewLineRow || isCreditDisabled}
        onChange={onChange}
        step="0.01"
        onBlur={onRowInputBlur(index)}
      />
      <TextArea
        rows={1}
        autoSize
        label="Description"
        hideLabel
        name="description"
        value={description}
        onChange={onChange}
        disabled={isNewLineRow}
      />
      <TaxCodeCombobox
        items={taxCodes}
        selectedId={taxCodeId}
        onChange={eventWrapper('taxCodeId', onChange)}
        disabled={isNewLineRow}
      />
    </LineItemTable.Row>);
};

GeneralJournalDetailRow.propTypes = {
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

export default connect(makeMapRowStateToProps)(GeneralJournalDetailRow);
