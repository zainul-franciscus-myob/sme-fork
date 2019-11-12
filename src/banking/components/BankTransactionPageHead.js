import {
  Button, Icons, Tooltip, TotalsHeader,
} from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';

import {
  getBankAccount, getBankAccounts, getDisplayBalances,
} from '../bankingSelectors';
import AccountCombobox from '../../components/combobox/AccountCombobox';
import styles from './BankTransactionsPageHead.module.css';

const onComboBoxChange = onBankAccountChange => (item) => {
  const { id } = item;
  onBankAccountChange({ value: id });
};

const BankTransactionPageHead = ({
  bankAccount,
  bankAccounts,
  balances: {
    bankBalance,
    myobBalance,
    unallocated,
    balanceTooltip,
  },
  onBankAccountChange,
  onRedirectToReconciliation,
}) => {
  const totalItems = [
    <Tooltip>{balanceTooltip}</Tooltip>,
    <TotalsHeader.TotalItem
      key="bank-feed-balance"
      label="Bank feed balance"
      count={bankBalance}
    />,
    <TotalsHeader.TotalItem
      key="ledger-balance"
      label="Ledger balance"
      count={myobBalance}
    />,
    <TotalsHeader.TotalItem
      key="out-of-balance"
      label="Out of balance"
      count={unallocated}
    />,
  ];

  const actions = [
    <AccountCombobox
      items={bankAccounts}
      selectedId={bankAccount}
      onChange={onComboBoxChange(onBankAccountChange)}
      label="Bank account"
      hideLabel={false}
    />,
    <Button key="reconcile" type="link" onClick={onRedirectToReconciliation} icon={<Icons.Compliance />}>
      Reconcile
    </Button>,
  ];
  return (
    <div className={styles.pageHead}>
      <TotalsHeader
        title="Bank feed transactions"
        actions={actions}
        totalItems={totalItems}
      />
    </div>
  );
};

const mapStateToProps = state => ({
  bankAccount: getBankAccount(state),
  bankAccounts: getBankAccounts(state),
  balances: getDisplayBalances(state),
});

export default connect(mapStateToProps)(BankTransactionPageHead);
