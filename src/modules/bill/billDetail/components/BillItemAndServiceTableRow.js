import { LineItemTable, TextArea } from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';
import classnames from 'classnames';

import {
  getAccountOptions,
  getBillLine,
  getIsBlocking,
  getIsNewLine,
  getItemOptions,
  getTaxCodeOptions,
} from '../selectors/billSelectors';
import AccountCombobox from '../../../../components/combobox/AccountCombobox';
import AmountInput from '../../../../components/autoFormatter/AmountInput/AmountInput';
import ItemCombobox from '../../../../components/combobox/ItemCombobox';
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

const handleAmountInputBlur = (handler, index, key) => () => handler({
  index,
  key,
});

const BillItemAndServiceTableRow = ({
  index,
  billLine,
  accountOptions,
  taxCodeOptions,
  itemOptions,
  isBlocking,
  isNewLine,
  isLineWithoutItemFromInTray,
  onChange,
  onAddAccount,
  onRowInputBlur,
  onAddItemButtonClick,
  ...feelixInjectedProps
}) => {
  const prefillStatus = billLine.prefillStatus || {};
  const {
    description,
    accountId,
    taxCodeId,
    displayAmount,
    units,
    unitPrice,
    itemId,
    displayDiscount,
  } = billLine;

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
        disabled={isBlocking}
      />
      <div className={classnames({ [styles.prefilled]: Boolean(prefillStatus.description) })}>
        <TextArea
          name="description"
          autoSize
          value={description}
          onChange={onChange}
          disabled={isBlocking}
        />
      </div>
      <AccountCombobox
        onChange={handleComboboxChange(onChange, 'accountId')}
        addNewAccount={() => onAddAccount(
          handleComboboxChange(onChange, 'accountId'),
        )}
        items={accountOptions}
        selectedId={accountId}
        disabled={isBlocking}
      />
      <AmountInput
        name="units"
        value={units}
        onChange={handleAmountInputChange(onChange)}
        onBlur={handleAmountInputBlur(onRowInputBlur, index, 'units')}
        className={classnames({ [styles.prefilled]: Boolean(prefillStatus.units) })}
        disabled={isBlocking}
        numeralDecimalScaleMax={6}
      />
      <AmountInput
        name="unitPrice"
        value={unitPrice}
        onChange={handleAmountInputChange(onChange)}
        onBlur={handleAmountInputBlur(onRowInputBlur, index, 'unitPrice')}
        className={classnames({ [styles.prefilled]: Boolean(prefillStatus.unitPrice) })}
        textAlign="right"
        disabled={isBlocking}
        numeralDecimalScaleMax={6}
      />
      <AmountInput
        name="discount"
        value={displayDiscount}
        onChange={handleAmountInputChange(onChange)}
        onBlur={handleAmountInputBlur(onRowInputBlur, index, 'discount')}
        className={classnames({ [styles.prefilled]: Boolean(prefillStatus.discount) })}
        textAlign="right"
        disabled={isBlocking}
      />
      <AmountInput
        name="amount"
        value={displayAmount}
        onChange={handleAmountInputChange(onChange)}
        onBlur={handleAmountInputBlur(onRowInputBlur, index, 'amount')}
        className={classnames({ [styles.prefilled]: Boolean(prefillStatus.amount) })}
        textAlign="right"
        disabled={isBlocking}
      />
      <TaxCodeCombobox
        items={taxCodeOptions}
        selectedId={taxCodeId}
        onChange={handleComboboxChange(onChange, 'taxCodeId')}
        disabled={isBlocking}
        left
      />
    </LineItemTable.Row>
  );
};

const mapStateToProps = (state, props) => ({
  billLine: getBillLine(state, props),
  itemOptions: getItemOptions(state),
  accountOptions: getAccountOptions(state),
  taxCodeOptions: getTaxCodeOptions(state),
  isNewLine: getIsNewLine(state, props),
  isBlocking: getIsBlocking(state),
});

export default connect(mapStateToProps)(BillItemAndServiceTableRow);
