import { Select } from '@myob/myob-widgets';
import React from 'react';

import handleSelectChange from '../../../components/handlers/handleSelectChange';

export const SourceJournalType = {
  ALL: 'All',
  GENERAL: 'General',
  SALE: 'Sale',
  PURCHASE: 'Purchase',
  PAYROLL: 'Payroll',
  CASH_PAYMENT: 'CashPayment',
  CASH_RECEIPT: 'CashReceipt',
  INVENTORY: 'Inventory',
};

const sourceJournals = [
  {
    name: 'All',
    value: SourceJournalType.ALL,
  },
  {
    name: 'General journal',
    value: SourceJournalType.GENERAL,
  },
  {
    name: 'Sales journal',
    value: SourceJournalType.SALE,
  },
  {
    name: 'Purchases journal',
    value: SourceJournalType.PURCHASE,
  },
  {
    name: 'Payroll',
    value: SourceJournalType.PAYROLL,
  },
  {
    name: 'Cash Payments',
    value: SourceJournalType.CASH_PAYMENT,
  },
  {
    name: 'Cash Receipts',
    value: SourceJournalType.CASH_RECEIPT,
  },
  {
    name: 'Inventory journal',
    value: SourceJournalType.INVENTORY,
  },
];

const SourceJournalSelect = ({
  value,
  onChange,
  className,
  showSourceJournalTypes = Object.values(SourceJournalType),
}) => (
  <Select
    className={className}
    name="sourceJournal"
    label="Source journal"
    value={value}
    onChange={handleSelectChange(onChange)}
  >
    {sourceJournals
      .filter((_) => {
        return showSourceJournalTypes.includes(_.value);
      })
      .map((_) => (
        <Select.Option value={_.value} label={_.name} key={_.value} />
      ))}
  </Select>
);

export default SourceJournalSelect;
