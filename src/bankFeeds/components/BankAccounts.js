import {
  Card, FieldGroup,
} from '@myob/myob-widgets';
import React from 'react';

import BankAccountsTable from './BankAccountsTable';

const BankAccounts = ({
  onBankAccountLinkedAccountChange,
  onDeleteBankFeedAccountClick,
}) => (
  <Card>
    <FieldGroup label="Bank accounts">
      <BankAccountsTable
        onBankAccountLinkedAccountChange={onBankAccountLinkedAccountChange}
        onDeleteBankFeedAccountClick={onDeleteBankFeedAccountClick}
      />
    </FieldGroup>
  </Card>
);

export default BankAccounts;
