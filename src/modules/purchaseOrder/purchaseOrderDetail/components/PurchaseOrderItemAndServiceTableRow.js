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

const PurchaseOrderItemAndServiceTableRow = ({
  index,
  purchaseOrderLine,
  accountOptions,
  taxCodeOptions,
  isBlocking,
  isNewLine,
  isReadOnly,
  onChange,
  onAddAccount,
  onAddJob,
  onRowInputBlur,
  renderItemCombobox,
  ...feelixInjectedProps
}) => {
  const prefillStatus = purchaseOrderLine.prefillStatus || {};
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
    lineJobOptions,
  } = purchaseOrderLine;

  if (
    [PurchaseOrderLineType.HEADER, PurchaseOrderLineType.SUB_TOTAL].includes(
      type
    )
  ) {
    return (
      <LineItemTable.Row index={index} id={index} {...feelixInjectedProps}>
        <PurchaseOrderTableReadOnlyRowItem />
        <PurchaseOrderTableReadOnlyRowItem value={description} />
        <PurchaseOrderTableReadOnlyRowItem />
        <PurchaseOrderTableReadOnlyRowItem />
        <PurchaseOrderTableReadOnlyRowItem />
        <PurchaseOrderTableReadOnlyRowItem />
        <PurchaseOrderTableReadOnlyRowItem value={amount} />
        <PurchaseOrderTableReadOnlyRowItem />
        <PurchaseOrderTableReadOnlyRowItem />
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
        items={taxCodeOptions}
        selectedId={taxCodeId}
        onChange={handleComboboxChange(onChange, 'taxCodeId')}
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
  isBlocking: getIsBlocking(state),
  isReadOnly: getIsReadOnly(state),
});

export default connect(mapStateToProps)(PurchaseOrderItemAndServiceTableRow);
