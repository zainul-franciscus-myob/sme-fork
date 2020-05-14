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
  getItemOptions,
  getJobOptions,
  getTaxCodeOptions,
} from '../selectors/billSelectors';
import AccountCombobox from '../../../../components/combobox/AccountCombobox';
import BillLineType from '../types/BillLineType';
import BillTableReadOnlyRowItem from './BillTableReadOnlyRowItem';
import Calculator from '../../../../components/Calculator/Calculator';
import ItemCombobox from '../../../../components/combobox/ItemCombobox';
import JobCombobox from '../../../../components/combobox/JobCombobox';
import TaxCodeCombobox from '../../../../components/combobox/TaxCodeCombobox';
import styles from './BillTableRow.module.css';

const handleComboboxChange = (handler, name) => e => handler({
  target: {
    name,
    value: e.id,
  },
});

const handleAmountInputChange = handler => e => (
  handler({
    target: {
      name: e.target.name,
      value: e.target.rawValue,
    },
  })
);

const handleAmountInputBlur = (handler, index) => (e) => {
  const { name: key, rawValue: value } = e.target;

  handler({ index, key, value });
};

const BillItemAndServiceTableRow = ({
  index,
  billLine,
  accountOptions,
  jobOptions,
  taxCodeOptions,
  itemOptions,
  isBlocking,
  isSupplierDisabled,
  isNewLine,
  isLineWithoutItemFromInTray,
  isReadOnlyLayout,
  onChange,
  onAddAccount,
  onRowInputBlur,
  onAddItemButtonClick,
  isBillJobColumnEnabled,
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
        {isBillJobColumnEnabled && <BillTableReadOnlyRowItem />}
        <BillTableReadOnlyRowItem />
      </LineItemTable.Row>
    );
  }

  return (
    <LineItemTable.Row
      id={index}
      index={index}
      {...feelixInjectedProps}
    >
      <ItemCombobox
        addNewItem={() => onAddItemButtonClick(handleComboboxChange(onChange, 'itemId'))}
        items={itemOptions}
        selectedId={itemId}
        onChange={handleComboboxChange(onChange, 'itemId')}
        disabled={isBlocking || isSupplierDisabled || isReadOnlyLayout}
      />
      <div className={classnames({ [styles.prefilled]: Boolean(prefillStatus.description) })}>
        <TextArea
          name="description"
          autoSize
          value={description}
          onChange={onChange}
          disabled={isBlocking || isSupplierDisabled || isReadOnlyLayout}
          maxLength={255}
        />
      </div>
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
        name="units"
        value={units}
        onChange={handleAmountInputChange(onChange)}
        onBlur={handleAmountInputBlur(onRowInputBlur, index)}
        className={classnames({ [styles.prefilled]: Boolean(prefillStatus.units) })}
        disabled={isBlocking || isSupplierDisabled || isReadOnlyLayout}
        numeralIntegerScale={12}
        numeralDecimalScaleMax={6}
      />
      <Calculator
        name="unitPrice"
        value={unitPrice}
        onChange={handleAmountInputChange(onChange)}
        onBlur={handleAmountInputBlur(onRowInputBlur, index)}
        className={classnames({ [styles.prefilled]: Boolean(prefillStatus.unitPrice) })}
        textAlign="right"
        disabled={isBlocking || isSupplierDisabled || isReadOnlyLayout}
        numeralDecimalScaleMin={2}
        numeralDecimalScaleMax={6}
      />
      <Calculator
        name="discount"
        value={discount}
        onChange={handleAmountInputChange(onChange)}
        onBlur={handleAmountInputBlur(onRowInputBlur, index)}
        className={classnames({ [styles.prefilled]: Boolean(prefillStatus.discount) })}
        textAlign="right"
        disabled={isBlocking || isSupplierDisabled || isReadOnlyLayout}
        numeralDecimalScaleMin={2}
        numeralDecimalScaleMax={2}
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
        onChange={handleComboboxChange(onChange, 'jobId')}
        disabled={isBlocking || isSupplierDisabled || isReadOnlyLayout}
        allowClear
        left
      />}
      <TaxCodeCombobox
        items={taxCodeOptions}
        selectedId={taxCodeId}
        onChange={handleComboboxChange(onChange, 'taxCodeId')}
        disabled={isBlocking || isSupplierDisabled || isReadOnlyLayout}
      />
    </LineItemTable.Row>
  );
};

const mapStateToProps = (state, props) => ({
  billLine: getBillLine(state, props),
  itemOptions: getItemOptions(state),
  accountOptions: getAccountOptions(state),
  jobOptions: getJobOptions(state),
  taxCodeOptions: getTaxCodeOptions(state),
  isNewLine: getIsNewLine(state, props),
  isBlocking: getIsBlocking(state),
  isSupplierDisabled: getIsSupplierBlocking(state),
  isReadOnlyLayout: getIsReadOnlyLayout(state),
});

export default connect(mapStateToProps)(BillItemAndServiceTableRow);
