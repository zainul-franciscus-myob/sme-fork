import { LineItemTable, TextArea } from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';
import classnames from 'classnames';

import {
  getAccountOptions,
  getBillLine,
  getIsBlocking,
  getIsNewLine,
  getIsPreConversion,
  getIsReadOnly,
  getIsShowIsTaxInclusiveAndTaxCodeColumn,
  getTaxCodeOptions,
} from '../selectors/billSelectors';
import AccountCombobox from '../../../../components/combobox/AccountCombobox';
import BillLineType from '../types/BillLineType';
import BillTableReadOnlyRowItem from './BillTableReadOnlyRowItem';
import Calculator from '../../../../components/Calculator/Calculator';
import TaxCodeCombobox from '../../../../components/combobox/TaxCodeCombobox';
import styles from './BillTableRow.module.css';

const handleComboboxChange = (handler, name) => (item) =>
  handler({
    target: {
      name,
      value: item.id,
    },
  });

const handleAmountInputChange = (handler) => (e) =>
  handler({
    target: {
      name: e.target.name,
      value: e.target.rawValue,
    },
  });

const handleAmountInputBlur = (handler, index) => (e) => {
  const { name: key, rawValue: value } = e.target;

  handler({ index, key, value });
};

const handleAutoCompleteItemChange = (handler, name) => (item) => {
  handler({
    target: {
      name,
      value: item ? item.id : '',
    },
  });
};

const BillServiceTableRow = ({
  billLine,
  index,
  accountOptions,
  taxCodeOptions,
  isNewLine,
  isBlocking,
  isReadOnly,
  onChange,
  onRowInputBlur,
  onAddAccount,
  onAddJob,
  isPreConversion,
  renderJobCombobox,
  isShowIsTaxInclusiveAndTaxCodeColumn,
  ...feelixInjectedProps
}) => {
  if ([BillLineType.HEADER, BillLineType.SUB_TOTAL].includes(billLine.type)) {
    return (
      <LineItemTable.Row index={index} id={index} {...feelixInjectedProps}>
        <BillTableReadOnlyRowItem value={billLine.description} />
        <BillTableReadOnlyRowItem />
        <BillTableReadOnlyRowItem value={billLine.amount} />
        <BillTableReadOnlyRowItem />
        {isShowIsTaxInclusiveAndTaxCodeColumn && <BillTableReadOnlyRowItem />}
      </LineItemTable.Row>
    );
  }

  const prefillStatus = billLine.prefillStatus || {};
  const { description, accountId, jobId, taxCodeId, amount } = billLine;

  return (
    <LineItemTable.Row index={index} id={index} {...feelixInjectedProps}>
      <TextArea
        name="description"
        value={description}
        onChange={onChange}
        maxLength={1000}
        autoSize
        disabled={isBlocking || isReadOnly}
      />
      <AccountCombobox
        onChange={handleComboboxChange(onChange, 'accountId')}
        addNewAccount={() =>
          onAddAccount(handleComboboxChange(onChange, 'accountId'))
        }
        items={accountOptions}
        selectedId={accountId}
        disabled={isBlocking || isReadOnly || isPreConversion}
      />
      <Calculator
        name="amount"
        value={amount}
        onChange={handleAmountInputChange(onChange)}
        onBlur={handleAmountInputBlur(onRowInputBlur, index)}
        className={classnames({
          [styles.prefilled]: Boolean(prefillStatus.amount),
        })}
        textAlign="right"
        disabled={isBlocking || isReadOnly}
        numeralDecimalScaleMin={2}
        numeralDecimalScaleMax={2}
      />
      {renderJobCombobox({
        name: 'jobId',
        label: 'Job',
        hideLabel: true,
        selectedId: jobId,
        disabled: isBlocking || isReadOnly,
        onChange: handleAutoCompleteItemChange(onChange, 'jobId'),
        left: true,
      })}
      {isShowIsTaxInclusiveAndTaxCodeColumn && (
        <TaxCodeCombobox
          onChange={handleComboboxChange(onChange, 'taxCodeId')}
          items={taxCodeOptions}
          selectedId={taxCodeId}
          disabled={isBlocking || isReadOnly}
        />
      )}
    </LineItemTable.Row>
  );
};

const mapStateToProps = (state, props) => ({
  billLine: getBillLine(state, props),
  accountOptions: getAccountOptions(state),
  taxCodeOptions: getTaxCodeOptions(state),
  isNewLine: getIsNewLine(state, props),
  isBlocking: getIsBlocking(state, props),
  isReadOnly: getIsReadOnly(state),
  isPreConversion: getIsPreConversion(state),
  isShowIsTaxInclusiveAndTaxCodeColumn: getIsShowIsTaxInclusiveAndTaxCodeColumn(
    state
  ),
});

export default connect(mapStateToProps)(BillServiceTableRow);
