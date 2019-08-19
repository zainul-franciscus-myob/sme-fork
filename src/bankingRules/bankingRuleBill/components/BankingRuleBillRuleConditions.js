import {
  FieldGroup,
} from '@myob/myob-widgets';
import React from 'react';

import DescriptionSection from './BankingRuleBillDescriptionSection';
import TransactionSection from './BankingRuleBillTransactionSection';

const BankingRuleBillRuleConditions = ({
  onRuleConditionsChange,
}) => (
  <FieldGroup label="Rule conditions">
    <DescriptionSection onRuleConditionsChange={onRuleConditionsChange} />
    <TransactionSection
      onRuleConditionsChange={onRuleConditionsChange}
    />
  </FieldGroup>
);

export default BankingRuleBillRuleConditions;
