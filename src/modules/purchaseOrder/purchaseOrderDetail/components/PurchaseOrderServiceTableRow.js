import { LineItemTable, TextArea } from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';
import classnames from 'classnames';

import {
  getAccountOptions,
  getIsBlocking,
  getIsNewLine,
  getIsReadOnly,
  getPurchaseOrderLine,
  getTaxCodeOptions,
} from '../selectors/purchaseOrderSelectors';
import AccountCombobox from '../../../../components/combobox/AccountCombobox';
import Calculator from '../../../../components/Calculator/Calculator';
import JobCombobox from '../../../../components/combobox/JobCombobox';
import PurchaseOrderLineType from '../types/PurchaseOrderLineType';
import PurchaseOrderTableReadOnlyRowItem from './PurchaseOrderTableReadOnlyRowItem';
import TaxCodeCombobox from '../../../../components/combobox/TaxCodeCombobox';
import styles from './PurchaseOrderTableRow.module.css';

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

const PurchaseOrderServiceTableRow = ({
  purchaseOrderLine,
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
  ...feelixInjectedProps
}) => {
  if (
    [PurchaseOrderLineType.HEADER, PurchaseOrderLineType.SUB_TOTAL].includes(
      purchaseOrderLine.type
    )
  ) {
    return (
      <LineItemTable.Row index={index} id={index} {...feelixInjectedProps}>
        <PurchaseOrderTableReadOnlyRowItem
          value={purchaseOrderLine.description}
        />
        <PurchaseOrderTableReadOnlyRowItem />
        <PurchaseOrderTableReadOnlyRowItem value={purchaseOrderLine.amount} />
        <PurchaseOrderTableReadOnlyRowItem />
        <PurchaseOrderTableReadOnlyRowItem />
      </LineItemTable.Row>
    );
  }

  const prefillStatus = purchaseOrderLine.prefillStatus || {};
  const {
    description,
    accountId,
    jobId,
    taxCodeId,
    amount,
    lineJobOptions,
  } = purchaseOrderLine;

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
        disabled={isBlocking || isReadOnly}
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
      <JobCombobox
        items={lineJobOptions}
        selectedId={jobId}
        addNewJob={() => onAddJob(handleComboboxChange(onChange, 'jobId'))}
        onChange={handleComboboxChange(onChange, 'jobId')}
        disabled={isBlocking || isReadOnly}
        allowClear
        left
      />
      <TaxCodeCombobox
        onChange={handleComboboxChange(onChange, 'taxCodeId')}
        items={taxCodeOptions}
        selectedId={taxCodeId}
        disabled={isBlocking || isReadOnly}
      />
    </LineItemTable.Row>
  );
};

const mapStateToProps = (state, props) => ({
  purchaseOrderLine: getPurchaseOrderLine(state, props),
  accountOptions: getAccountOptions(state),
  taxCodeOptions: getTaxCodeOptions(state),
  isNewLine: getIsNewLine(state, props),
  isBlocking: getIsBlocking(state, props),
  isReadOnly: getIsReadOnly(state),
});

export default connect(mapStateToProps)(PurchaseOrderServiceTableRow);
