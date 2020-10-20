import { Table } from '@myob/myob-widgets';
import React from 'react';

import AccountNameRowItem from './accountRowItems/AccountNameRowItem';
import AccountNumberRowItem from './accountRowItems/AccountNumberRowItem';
import AccountTypeRowItem, {
  ReadyOnlyAccountTypeRowItem,
} from './accountRowItems/AccountTypeRowItem';
import OpeningBalanceRowItem from './accountRowItems/OpeningBalanceRowItem';
import ReadOnlyRowItem from './accountRowItems/ReadOnlyRowItem';
import TaxCodeRowItem from './accountRowItems/TaxCodeRowItem';

const getReadOnlyFields = (
  tableConfig,
  onAccountDetailsChange,
  calculateRemainingHistoricalBalance,
  index,
  id,
  accountNumber,
  accountName,
  balance,
  isSystem,
  isHeader,
  indentLevel,
  openingBalance,
  subAccountType,
  taxCode,
  hideAccountNumber,
  accountClassifications,
  accountType
) => (
  <Table.Row key={id}>
    {!hideAccountNumber && (
      <ReadOnlyRowItem
        config={tableConfig.accountNumber}
        value={accountNumber}
        indentLevel={indentLevel}
        isSystem={isSystem}
        isHeader={isHeader}
      />
    )}
    <ReadOnlyRowItem
      config={tableConfig.accountName}
      value={accountName}
      isSystem={isSystem}
      isHeader={isHeader}
    />
    <ReadyOnlyAccountTypeRowItem
      config={tableConfig.type}
      accountClassifications={accountClassifications}
      accountType={accountType}
      subAccountType={subAccountType}
      isSystem={isSystem}
      isHeader={isHeader}
    />
    <ReadOnlyRowItem
      config={tableConfig.taxCode}
      isSystem={isSystem}
      isHeader={isHeader}
      value={taxCode}
    />
    <OpeningBalanceRowItem
      config={tableConfig.openingBalance}
      isSystem={isSystem}
      isHeader={isHeader}
      openingBalance={openingBalance}
      index={index}
      onChange={onAccountDetailsChange}
      onBlur={calculateRemainingHistoricalBalance}
    />
    <ReadOnlyRowItem
      config={tableConfig.balance}
      value={balance}
      isSystem={isSystem}
      isHeader={isHeader}
    />
  </Table.Row>
);

const getEditableFields = (
  tableConfig,
  onAccountDetailsChange,
  onAccountNumberChange,
  onAccountNumberBlur,
  calculateRemainingHistoricalBalance,
  accountClassifications,
  taxCodeList,
  accountNumberCount,
  index,
  id,
  accountNumber,
  accountName,
  balance,
  isSystem,
  isHeader,
  indentLevel,
  openingBalance,
  subAccountType,
  accountType,
  taxCode,
  taxCodeId,
  hideAccountNumber
) => (
  <Table.Row key={id}>
    {!hideAccountNumber && (
      <AccountNumberRowItem
        config={tableConfig.accountNumber}
        accountNumber={accountNumber}
        indentLevel={indentLevel}
        isSystem={isSystem}
        isHeader={isHeader}
        index={index}
        onChange={onAccountNumberChange}
        onBlur={onAccountNumberBlur}
        prefix={accountClassifications[accountType].prefix}
        accountNumberCount={accountNumberCount}
      />
    )}
    <AccountNameRowItem
      config={tableConfig.accountName}
      accountName={accountName}
      isSystem={isSystem}
      isHeader={isHeader}
      index={index}
      onChange={onAccountDetailsChange}
    />
    <AccountTypeRowItem
      config={tableConfig.type}
      isSystem={isSystem}
      isHeader={isHeader}
      accountClassifications={accountClassifications}
      accountType={accountType}
      subAccountType={subAccountType}
      index={index}
      onChange={onAccountDetailsChange}
    />
    <TaxCodeRowItem
      config={tableConfig.taxCode}
      isSystem={isSystem}
      isHeader={isHeader}
      taxCodeList={taxCodeList}
      taxCode={taxCode}
      selectedTaxCodeId={taxCodeId}
      index={index}
      onChange={onAccountDetailsChange}
    />
    <OpeningBalanceRowItem
      config={tableConfig.openingBalance}
      isSystem={isSystem}
      isHeader={isHeader}
      openingBalance={openingBalance}
      index={index}
      onChange={onAccountDetailsChange}
      onBlur={calculateRemainingHistoricalBalance}
    />
    <ReadOnlyRowItem
      config={tableConfig.balance}
      value={balance}
      isSystem={isSystem}
      isHeader={isHeader}
    />
  </Table.Row>
);

const AccountBulkEditListTableRow = ({
  tableConfig,
  onAccountDetailsChange,
  onAccountNumberChange,
  onAccountNumberBlur,
  calculateRemainingHistoricalBalance,
  accountClassifications,
  taxCodeList,
  accountNumberCount,
  index,
  id,
  accountNumber,
  accountName,
  balance,
  isSystem,
  isHeader,
  indentLevel,
  openingBalance,
  subAccountType,
  accountType,
  taxCode,
  taxCodeId,
  hideAccountNumber,
  onEntryHover,
  onEntryLeave,
  hoveredRowIndex,
  dirty,
}) => (
  <div onMouseEnter={() => onEntryHover(index)} onMouseLeave={onEntryLeave}>
    {hoveredRowIndex === index || dirty
      ? getEditableFields(
          tableConfig,
          onAccountDetailsChange,
          onAccountNumberChange,
          onAccountNumberBlur,
          calculateRemainingHistoricalBalance,
          accountClassifications,
          taxCodeList,
          accountNumberCount,
          index,
          id,
          accountNumber,
          accountName,
          balance,
          isSystem,
          isHeader,
          indentLevel,
          openingBalance,
          subAccountType,
          accountType,
          taxCode,
          taxCodeId,
          hideAccountNumber
        )
      : getReadOnlyFields(
          tableConfig,
          onAccountDetailsChange,
          calculateRemainingHistoricalBalance,
          index,
          id,
          accountNumber,
          accountName,
          balance,
          isSystem,
          isHeader,
          indentLevel,
          openingBalance,
          subAccountType,
          taxCode,
          hideAccountNumber,
          accountClassifications,
          accountType
        )}
  </div>
);

const areEqual = (prevProps, nextProps) => {
  return (
    prevProps.accountNumber === nextProps.accountNumber &&
    prevProps.accountName === nextProps.accountName &&
    prevProps.subAccountType === nextProps.subAccountType &&
    prevProps.taxCodeId === nextProps.taxCodeId &&
    prevProps.openingBalance === nextProps.openingBalance &&
    prevProps.index !== nextProps.hoveredRowIndex &&
    prevProps.index !== prevProps.hoveredRowIndex
  );
};

export default React.memo(AccountBulkEditListTableRow, areEqual);
