import {
  Card, FieldGroup,
} from '@myob/myob-widgets';
import React from 'react';

import BankAccountsTable from './BankAccountsTable';
import styles from './BankAccounts.module.css';

const BankAccounts = ({
  onBankAccountLinkedAccountChange,
  onDeleteBankFeedAccountClick,
}) => (
  <Card>
    <FieldGroup label="Bank accounts" className={styles.fieldGroup}>
      <BankAccountsTable
        onBankAccountLinkedAccountChange={onBankAccountLinkedAccountChange}
        onDeleteBankFeedAccountClick={onDeleteBankFeedAccountClick}
      />
    </FieldGroup>
  </Card>
);

export default BankAccounts;
