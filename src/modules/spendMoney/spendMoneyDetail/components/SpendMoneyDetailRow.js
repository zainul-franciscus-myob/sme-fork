import { LineItemTable, TextArea } from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';
import classnames from 'classnames';

import {
  getAccountOptions,
  getIsJobComboboxDisabled,
  getIsSpendMoneyJobColumnEnabled,
  getIsSubmitting,
  getIsSupplierBlocking,
  getLineDataByIndexSelector,
  getNewLineData,
  getTaxCodeOptions,
} from '../spendMoneyDetailSelectors';
import AccountCombobox from '../../../../components/combobox/AccountCombobox';
import Calculator from '../../../../components/Calculator/Calculator';
import JobCombobox from '../../../../components/combobox/JobCombobox';
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
    isJobComboboxDisabled,
    isSupplierBlocking,
    isSubmitting,
    onAddAccount,
    onAddJob,
    isSpendMoneyJobColumnEnabled,
    ...feelixInjectedProps
  } = props;
  const data = isNewLineRow ? newLineData : lineData;

  const {
    amount = '',
    description = '',
    accountId,
    taxCodeId,
    quantity,
    jobId,
    prefillStatus = {},
    lineJobOptions,
  } = data;

  const onChangeAccountId = onComboboxChange('accountId', onChange);
  const onChangeJobId = onComboboxChange('jobId', onChange);

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
        value={amount}
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
          maxLength={1000}
          hideLabel
          rows={1}
          autoSize
          name="description"
          value={description}
          onChange={onChange}
          disabled={isSubmitting}
        />
      </div>
      {isSpendMoneyJobColumnEnabled && <JobCombobox
        label="Job"
        onChange={onChangeJobId}
        items={lineJobOptions}
        selectedId={jobId}
        disabled={isSubmitting || isJobComboboxDisabled}
        addNewJob={() => onAddJob(onComboboxChange('jobId', onChange))}
        allowClear
        left
      />}
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
    isSpendMoneyJobColumnEnabled: getIsSpendMoneyJobColumnEnabled(state),
    isJobComboboxDisabled: getIsJobComboboxDisabled(state),
    isSupplierBlocking: getIsSupplierBlocking(state),
    isSubmitting: getIsSubmitting(state),
  });
};

export default connect(makeMapRowStateToProps)(SpendMoneyDetailRow);
