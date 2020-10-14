import { Table } from '@myob/myob-widgets';
import React from 'react';

import AccountNameRowItem from './accountRowItems/AccountNameRowItem';
import AccountNumberRowItem from './accountRowItems/AccountNumberRowItem';
import AccountTypeRowItem from './accountRowItems/AccountTypeRowItem';
import OpeningBalanceRowItem from './accountRowItems/OpeningBalanceRowItem';
import ReadOnlyRowItem from './accountRowItems/ReadOnlyRowItem';
import TaxCodeRowItem from './accountRowItems/TaxCodeRowItem';

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
}) => {
  return (
    <Table.Row key={id}>
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
};

const areEqual = (prevProps, nextProps) => {
  return (
    prevProps.accountNumber === nextProps.accountNumber &&
    prevProps.accountName === nextProps.accountName &&
    prevProps.subAccountType === nextProps.subAccountType &&
    prevProps.taxCodeId === nextProps.taxCodeId &&
    prevProps.openingBalance === nextProps.openingBalance
  );
};

export default React.memo(AccountBulkEditListTableRow, areEqual);
