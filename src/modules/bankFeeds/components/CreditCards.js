import {
  Card, FieldGroup,
} from '@myob/myob-widgets';
import React from 'react';

import CreditCardsTable from './CreditCardsTable';
import styles from './CreditCards.module.css';

const CreditCards = ({
  onCreditCardLinkedAccountChange,
  onDeleteBankFeedAccountClick,
}) => (
  <Card>
    <FieldGroup label="Credit cards" className={styles.fieldGroup}>
      <CreditCardsTable
        onCreditCardLinkedAccountChange={onCreditCardLinkedAccountChange}
        onDeleteBankFeedAccountClick={onDeleteBankFeedAccountClick}
      />
    </FieldGroup>
  </Card>
);

export default CreditCards;
