import {
  Dropdown,
  Icons,
  PageHead,
} from '@myob/myob-widgets';
import React from 'react';

import BankingRuleTypes from '../BankingRuleTypes';

const items = [
  <Dropdown.Item
    key={BankingRuleTypes.RECEIVE_MONEY}
    label="Receive money transaction"
    value={BankingRuleTypes.RECEIVE_MONEY}
  />,
  <Dropdown.Item
    key={BankingRuleTypes.SPEND_MONEY}
    label="Spend money transaction"
    value={BankingRuleTypes.SPEND_MONEY}
  />,
  <Dropdown.Item
    key={BankingRuleTypes.INVOICE}
    label="Invoice"
    value={BankingRuleTypes.INVOICE}
  />,
];

const BankingRuleListPageHead = ({ onSelectBankingRule }) => (
  <PageHead title="Bank feed rules">
    <Dropdown
      onSelect={onSelectBankingRule}
      items={items}
      toggle={(
        <Dropdown.Toggle type="primary">
          Create rule
          <Icons.Caret />
        </Dropdown.Toggle>
      )}
    />
  </PageHead>
);

export default BankingRuleListPageHead;
