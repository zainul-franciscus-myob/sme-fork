import { LineItemTable, TextArea } from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';
import classnames from 'classnames';

import {
  getAccountOptions,
  getBillLine,
  getIsBlocking,
  getIsNewLine,
  getIsReadOnlyLayout,
  getIsSupplierBlocking,
  getJobOptions,
  getTaxCodeOptions,
} from '../selectors/billSelectors';
import AccountCombobox from '../../../../components/combobox/AccountCombobox';
import BillLineType from '../types/BillLineType';
import BillTableReadOnlyRowItem from './BillTableReadOnlyRowItem';
import Calculator from '../../../../components/Calculator/Calculator';
import JobCombobox from '../../../../components/combobox/JobCombobox';
import TaxCodeCombobox from '../../../../components/combobox/TaxCodeCombobox';
import styles from './BillTableRow.module.css';

const handleComboboxChange = (handler, name) => item => handler({
  target: {
    name,
    value: item.id,
  },
});

const handleAmountInputChange = handler => e => handler({
  target: {
    name: e.target.name,
    value: e.target.rawValue,
  },
});

const handleAmountInputBlur = (handler, index) => (e) => {
  const { name: key, rawValue: value } = e.target;

  handler({ index, key, value });
};

const BillServiceTableRow = ({
  billLine,
  index,
  accountOptions,
  jobOptions,
  taxCodeOptions,
  isNewLine,
  isBlocking,
  isSupplierDisabled,
  isReadOnlyLayout,
  onChange,
  onRowInputBlur,
  onAddAccount,
  onAddJob,
  isBillJobColumnEnabled,
  ...feelixInjectedProps
}) => {
  if ([BillLineType.HEADER, BillLineType.SUB_TOTAL].includes(billLine.type)) {
    return (
      <LineItemTable.Row index={index} id={index} {...feelixInjectedProps}>
        <BillTableReadOnlyRowItem value={billLine.description} />
        <BillTableReadOnlyRowItem />
        <BillTableReadOnlyRowItem value={billLine.amount} />
        {isBillJobColumnEnabled && <BillTableReadOnlyRowItem />}
        <BillTableReadOnlyRowItem />
      </LineItemTable.Row>
    );
  }

  const prefillStatus = billLine.prefillStatus || {};
  const {
    description, accountId, jobId, taxCodeId, amount,
  } = billLine;

  return (
    <LineItemTable.Row index={index} id={index} {...feelixInjectedProps}>
      <TextArea
        name="description"
        value={description}
        onChange={onChange}
        maxLength={255}
        autoSize
        disabled={isBlocking || isSupplierDisabled || isReadOnlyLayout}
      />
      <AccountCombobox
        onChange={handleComboboxChange(onChange, 'accountId')}
        addNewAccount={() => onAddAccount(
          handleComboboxChange(onChange, 'accountId'),
        )}
        items={accountOptions}
        selectedId={accountId}
        disabled={isBlocking || isSupplierDisabled || isReadOnlyLayout}
      />
      <Calculator
        name="amount"
        value={amount}
        onChange={handleAmountInputChange(onChange)}
        onBlur={handleAmountInputBlur(onRowInputBlur, index)}
        className={classnames({ [styles.prefilled]: Boolean(prefillStatus.amount) })}
        textAlign="right"
        disabled={isBlocking || isSupplierDisabled || isReadOnlyLayout}
        numeralDecimalScaleMin={2}
        numeralDecimalScaleMax={2}
      />
      {isBillJobColumnEnabled && <JobCombobox
        items={jobOptions}
        selectedId={jobId}
        addNewJob={() => onAddJob(
          handleComboboxChange(onChange, 'jobId'),
        )}
        onChange={handleComboboxChange(onChange, 'jobId')}
        disabled={isBlocking || isSupplierDisabled || isReadOnlyLayout}
        allowClear
        left
      />}
      <TaxCodeCombobox
        onChange={handleComboboxChange(onChange, 'taxCodeId')}
        items={taxCodeOptions}
        selectedId={taxCodeId}
        disabled={isBlocking || isSupplierDisabled || isReadOnlyLayout}
      />
    </LineItemTable.Row>
  );
};

const mapStateToProps = (state, props) => ({
  billLine: getBillLine(state, props),
  accountOptions: getAccountOptions(state),
  jobOptions: getJobOptions(state),
  taxCodeOptions: getTaxCodeOptions(state),
  isNewLine: getIsNewLine(state, props),
  isBlocking: getIsBlocking(state, props),
  isSupplierDisabled: getIsSupplierBlocking(state),
  isReadOnlyLayout: getIsReadOnlyLayout(state),
});

export default connect(mapStateToProps)(BillServiceTableRow);
