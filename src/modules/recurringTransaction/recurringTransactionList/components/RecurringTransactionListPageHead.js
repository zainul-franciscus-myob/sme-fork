import { CaretIcon, Dropdown, PageHead } from '@myob/myob-widgets';
import React from 'react';

import TransactionType from '../../types/TransactionType';

const items = [
  <Dropdown.Item
    key={TransactionType.INVOICE}
    label="Invoice"
    value={TransactionType.INVOICE}
  />,
];

const RecurringTransactionListPageHead = ({ onCreateButtonClick }) => (
  <PageHead title="Recurring transactions">
    <Dropdown
      onSelect={onCreateButtonClick}
      items={items}
      toggle={
        <Dropdown.Toggle type="primary">
          Create recurring transaction
          <CaretIcon />
        </Dropdown.Toggle>
      }
    />
  </PageHead>
);

export default RecurringTransactionListPageHead;
