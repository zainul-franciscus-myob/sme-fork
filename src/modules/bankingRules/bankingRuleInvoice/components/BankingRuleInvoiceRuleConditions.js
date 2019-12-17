import {
  FieldGroup,
} from '@myob/myob-widgets';
import React from 'react';

import DescriptionSection from './BankingRuleInvoiceDescriptionSection';
import TransactionSection from './BankingRuleInvoiceTransactionSection';

const BankingRuleInvoiceRuleConditions = ({
  onRuleConditionsChange,
}) => (
  <FieldGroup label="Rule conditions">
    <DescriptionSection onRuleConditionsChange={onRuleConditionsChange} />
    <TransactionSection
      onRuleConditionsChange={onRuleConditionsChange}
    />
  </FieldGroup>
);

export default BankingRuleInvoiceRuleConditions;
