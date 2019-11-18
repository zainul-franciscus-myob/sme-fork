import {
  Card, FieldGroup,
} from '@myob/myob-widgets';
import React from 'react';

import CreditCardsTable from './CreditCardsTable';

const CreditCards = ({
  onCreditCardLinkedAccountChange,
  onDeleteBankFeedAccountClick,
}) => (
  <Card>
    <FieldGroup label="Credit cards">
      <CreditCardsTable
        onCreditCardLinkedAccountChange={onCreditCardLinkedAccountChange}
        onDeleteBankFeedAccountClick={onDeleteBankFeedAccountClick}
      />
    </FieldGroup>
  </Card>
);

export default CreditCards;
