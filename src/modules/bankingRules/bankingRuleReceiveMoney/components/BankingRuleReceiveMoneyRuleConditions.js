import {
  FieldGroup,
} from '@myob/myob-widgets';
import React from 'react';

import DescriptionSection from './BankingRuleReceiveMoneyDescriptionSection';
import TransactionSection from './BankingRuleReceiveMoneyTransactionSection';

const BankingRuleReceiveMoneyRuleConditions = ({
  onRuleConditionsChange,
  onRowInputBlur,
  onAddRow,
  onRowChange,
  onRemoveRow,
}) => (
  <FieldGroup label="Rule conditions">
    <DescriptionSection onRuleConditionsChange={onRuleConditionsChange} />
    <TransactionSection
      onRuleConditionsChange={onRuleConditionsChange}
      onRowInputBlur={onRowInputBlur}
      onAddRow={onAddRow}
      onRowChange={onRowChange}
      onRemoveRow={onRemoveRow}
    />
  </FieldGroup>
);

export default BankingRuleReceiveMoneyRuleConditions;
