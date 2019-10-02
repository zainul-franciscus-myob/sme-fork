import React from 'react';

import styles from './TransferMoneyDetailForm.module.css';

const AccountBalances = ({ currentBalance, calculatedBalance }) => (
  <div className={styles.balances}>
    <div className={styles.balanceRow}>
      <span>Current balance</span>
      <span>{currentBalance}</span>
    </div>
    <div className={styles.balanceRow}>
      <strong>Balance after transfer</strong>
      <strong>{calculatedBalance}</strong>
    </div>
  </div>
);

export default AccountBalances;
