import {
  Columns, DatePicker, DetailHeader, Input, Separator, TextArea,
} from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';

import { getBalance, getTransferMoneyProperties } from '../transferMoneyDetailSelectors';
import AccountBalances from './TransferMoneyAccountBalance';
import AccountCombobox from '../../../../components/combobox/AccountCombobox';
import AmountInput from '../../../../components/autoFormatter/AmountInput/AmountInput';
import handleAmountInputChange from '../../../../components/handlers/handleAmountInputChange';
import handleComboboxChange from '../../../../components/handlers/handleComboboxChange';
import handleDateChange from '../../../../components/handlers/handleDateChange';
import handleInputChange from '../../../../components/handlers/handleInputChange';
import styles from './TransferMoneyDetailForm.module.css';

const TransferMoneyDetailForm = ({
  transferMoney: {
    referenceId, accounts, date, amount, description,
    selectedTransferFromAccountId,
    selectedTransferToAccountId,
  },
  balance: {
    transferFrom,
    transferTo,
  },
  onAmountInputBlur,
  onUpdateForm,
  isCreating,
}) => {
  const primary = (
    <React.Fragment>
      <AmountInput
        className={styles.amount}
        label="Amount ($)"
        requiredLabel="This is required"
        name="amount"
        value={amount}
        onChange={handleAmountInputChange(onUpdateForm)}
        onBlur={onAmountInputBlur}
        numeralIntegerScale={13}
        decimalScale={5}
        disabled={!isCreating}
        textAlign="right"
      />
      <TextArea
        name="description"
        label="Description of transaction"
        autoSize
        rows={1}
        maxLength={255}
        resize="vertical"
        value={description}
        onChange={handleInputChange(onUpdateForm)}
        disabled={!isCreating}
      />
    </React.Fragment>
  );

  const secondary = (
    <React.Fragment>
      <Input
        type="text"
        name="referenceId"
        label="Reference number"
        requiredLabel="This is required"
        value={referenceId}
        onChange={handleInputChange(onUpdateForm)}
        disabled={!isCreating}
        maxLength={8}
      />
      <DatePicker
        label="Date"
        name="date"
        requiredLabel="This is required"
        disabled={!isCreating}
        value={date}
        onSelect={handleDateChange('date', onUpdateForm)}
      />
    </React.Fragment>
  );

  return (
    <React.Fragment>
      <DetailHeader primary={primary} secondary={secondary} />
      <Separator />
      <Columns type="two">
        <AccountCombobox
          label="Bank account from"
          hideLabel={false}
          requiredLabel="This is required"
          items={accounts}
          selectedId={selectedTransferFromAccountId}
          onChange={handleComboboxChange('selectedTransferFromAccountId', onUpdateForm)}
          disabled={!isCreating}
        />
        <AccountCombobox
          label="Bank account to"
          hideLabel={false}
          requiredLabel="This is required"
          items={accounts}
          selectedId={selectedTransferToAccountId}
          onChange={handleComboboxChange('selectedTransferToAccountId', onUpdateForm)}
          disabled={!isCreating}
        />
        {
            isCreating && (
              <React.Fragment>
                <AccountBalances
                  currentBalance={transferFrom.currentBalance}
                  calculatedBalance={transferFrom.calculatedBalance}
                />
                <AccountBalances
                  currentBalance={transferTo.currentBalance}
                  calculatedBalance={transferTo.calculatedBalance}
                />
              </React.Fragment>
            )
          }
      </Columns>
    </React.Fragment>
  );
};

const mapStateToProps = state => ({
  transferMoney: getTransferMoneyProperties(state),
  balance: getBalance(state),
});

export default connect(mapStateToProps)(TransferMoneyDetailForm);
