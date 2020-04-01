import { LineItemTable, TextArea } from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';
import classnames from 'classnames';

import {
  getAccountOptions,
  getIsSubmitting,
  getIsSupplierBlocking,
  getLineDataByIndexSelector,
  getNewLineData,
  getTaxCodeOptions,
} from '../spendMoneyDetailSelectors';
import AccountCombobox from '../../../../components/combobox/AccountCombobox';
import Calculator from '../../../../components/Calculator/Calculator';
import TaxCodeCombobox from '../../../../components/combobox/TaxCodeCombobox';
import styles from './SpendMoneyDetailRow.module.css';

const onAmountInputChange = (name, onChange) => (e) => {
  onChange({
    target: {
      name,
      value: e.target.rawValue,
    },
  });
};

const onComboboxChange = (name, onChange) => (item) => {
  onChange({
    target: {
      name,
      value: item.id,
    },
  });
};

const SpendMoneyDetailRow = (props) => {
  const {
    index,
    onRowInputBlur,
    onChange,
    isNewLineRow,
    lineData,
    newLineData,
    accountOptions,
    taxCodeOptions,
    isSupplierBlocking,
    isSubmitting,
    onAddAccount,
    ...feelixInjectedProps
  } = props;
  const data = isNewLineRow ? newLineData : lineData;

  const {
    displayAmount = '',
    description = '',
    accountId,
    taxCodeId,
    quantity,
    prefillStatus = {},
  } = data;

  const onChangeAccountId = onComboboxChange('accountId', onChange);

  return (
    <LineItemTable.Row id={index} index={index} {...feelixInjectedProps}>
      <AccountCombobox
        label="Accounts"
        hideLabel={false}
        items={accountOptions}
        selectedId={accountId}
        onChange={onComboboxChange('accountId', onChange)}
        disabled={isSupplierBlocking || isSubmitting}
        addNewAccount={() => onAddAccount(onChangeAccountId)}
      />
      <Calculator
        label="Amount"
        hideLabel
        name="amount"
        value={displayAmount}
        onChange={onAmountInputChange('amount', onChange)}
        onBlur={onRowInputBlur}
        className={classnames({ [styles.prefilled]: Boolean(prefillStatus.amount) })}
        numeralDecimalScaleMin={2}
        disabled={isSupplierBlocking || isSubmitting}
      />
      <Calculator
        label="Quantity"
        name="quantity"
        value={quantity}
        onChange={onAmountInputChange('quantity', onChange)}
        onBlur={onRowInputBlur}
        numeralDecimalScaleMin={0}
        numeralDecimalScaleMax={6}
        numeralIntegerScale={13}
        disabled={isSupplierBlocking || isSubmitting}
      />
      <div className={classnames({ [styles.prefilled]: Boolean(prefillStatus.description) })}>
        <TextArea
          label="Description"
          maxLength={255}
          hideLabel
          rows={1}
          autoSize
          name="description"
          value={description}
          onChange={onChange}
          disabled={isSubmitting}
        />
      </div>
      <TaxCodeCombobox
        label="Tax code"
        hideLabel={false}
        items={taxCodeOptions}
        selectedId={taxCodeId}
        onChange={onComboboxChange('taxCodeId', onChange)}
        disabled={isSupplierBlocking || isSubmitting}
      />
    </LineItemTable.Row>
  );
};

const makeMapRowStateToProps = () => {
  const lineDataByIndex = getLineDataByIndexSelector();
  return (state, ownProps) => ({
    lineData: lineDataByIndex(state, ownProps),
    newLineData: getNewLineData(state),
    accountOptions: getAccountOptions(state),
    taxCodeOptions: getTaxCodeOptions(state),
    isSupplierBlocking: getIsSupplierBlocking(state),
    isSubmitting: getIsSubmitting(state),
  });
};

export default connect(makeMapRowStateToProps)(SpendMoneyDetailRow);
