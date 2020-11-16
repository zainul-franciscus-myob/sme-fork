import { LineItemTable, TextArea } from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';
import classnames from 'classnames';

import {
  getAccountOptions,
  getBillLine,
  getIsBlocking,
  getIsNewLine,
  getIsReadOnly,
  getTaxCodeOptions,
} from '../selectors/billSelectors';
import AccountCombobox from '../../../../components/combobox/AccountCombobox';
import BillLineType from '../types/BillLineType';
import BillTableReadOnlyRowItem from './BillTableReadOnlyRowItem';
import Calculator from '../../../../components/Calculator/Calculator';
import TaxCodeCombobox from '../../../../components/combobox/TaxCodeCombobox';
import styles from './BillTableRow.module.css';

const handleComboboxChange = (handler, name) => (e) =>
  handler({
    target: {
      name,
      value: e.id,
    },
  });

const handleAutoCompleteItemChange = (handler, name) => (item) =>
  handler({
    target: {
      name,
      value: item ? item.id : '',
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

const BillItemAndServiceTableRow = ({
  index,
  billLine,
  accountOptions,
  taxCodeOptions,
  isBlocking,
  isNewLine,
  isLineWithoutItemFromInTray,
  isReadOnly,
  onChange,
  onAddAccount,
  onAddJob,
  onRowInputBlur,
  renderItemCombobox,
  renderJobCombobox,
  ...feelixInjectedProps
}) => {
  const prefillStatus = billLine.prefillStatus || {};
  const {
    type,
    description,
    accountId,
    jobId,
    taxCodeId,
    amount,
    units,
    unitPrice,
    itemId,
    discount,
  } = billLine;

  if ([BillLineType.HEADER, BillLineType.SUB_TOTAL].includes(type)) {
    return (
      <LineItemTable.Row index={index} id={index} {...feelixInjectedProps}>
        <BillTableReadOnlyRowItem />
        <BillTableReadOnlyRowItem value={description} />
        <BillTableReadOnlyRowItem />
        <BillTableReadOnlyRowItem />
        <BillTableReadOnlyRowItem />
        <BillTableReadOnlyRowItem />
        <BillTableReadOnlyRowItem value={amount} />
        <BillTableReadOnlyRowItem />
        <BillTableReadOnlyRowItem />
      </LineItemTable.Row>
    );
  }

  return (
    <LineItemTable.Row id={index} index={index} {...feelixInjectedProps}>
      {renderItemCombobox({
        name: 'itemId',
        label: 'Item Id',
        hideLabel: true,
        selectedId: itemId,
        disabled: isBlocking || isReadOnly,
        onChange: handleAutoCompleteItemChange(onChange, 'itemId'),
      })}
      <div
        className={classnames({
          [styles.prefilled]: Boolean(prefillStatus.description),
        })}
      >
        <TextArea
          name="description"
          autoSize
          value={description}
          onChange={onChange}
          disabled={isBlocking || isReadOnly}
          maxLength={1000}
        />
      </div>
      <AccountCombobox
        onChange={handleComboboxChange(onChange, 'accountId')}
        addNewAccount={() =>
          onAddAccount(handleComboboxChange(onChange, 'accountId'))
        }
        items={accountOptions}
        selectedId={accountId}
        disabled={isBlocking || isReadOnly}
      />
      <Calculator
        name="units"
        value={units}
        onChange={handleAmountInputChange(onChange)}
        onBlur={handleAmountInputBlur(onRowInputBlur, index)}
        className={classnames({
          [styles.prefilled]: Boolean(prefillStatus.units),
        })}
        disabled={isBlocking || isReadOnly}
        numeralIntegerScale={12}
        numeralDecimalScaleMax={6}
      />
      <Calculator
        name="unitPrice"
        value={unitPrice}
        onChange={handleAmountInputChange(onChange)}
        onBlur={handleAmountInputBlur(onRowInputBlur, index)}
        className={classnames({
          [styles.prefilled]: Boolean(prefillStatus.unitPrice),
        })}
        textAlign="right"
        disabled={isBlocking || isReadOnly}
        numeralDecimalScaleMin={2}
        numeralDecimalScaleMax={6}
      />
      <Calculator
        name="discount"
        value={discount}
        onChange={handleAmountInputChange(onChange)}
        onBlur={handleAmountInputBlur(onRowInputBlur, index)}
        className={classnames({
          [styles.prefilled]: Boolean(prefillStatus.discount),
        })}
        textAlign="right"
        disabled={isBlocking || isReadOnly}
        numeralDecimalScaleMin={2}
        numeralDecimalScaleMax={2}
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
      <TaxCodeCombobox
        items={taxCodeOptions}
        selectedId={taxCodeId}
        onChange={handleComboboxChange(onChange, 'taxCodeId')}
        disabled={isBlocking || isReadOnly}
      />
    </LineItemTable.Row>
  );
};

const mapStateToProps = (state, props) => ({
  billLine: getBillLine(state, props),
  accountOptions: getAccountOptions(state),
  taxCodeOptions: getTaxCodeOptions(state),
  isNewLine: getIsNewLine(state, props),
  isBlocking: getIsBlocking(state),
  isReadOnly: getIsReadOnly(state),
});

export default connect(mapStateToProps)(BillItemAndServiceTableRow);
