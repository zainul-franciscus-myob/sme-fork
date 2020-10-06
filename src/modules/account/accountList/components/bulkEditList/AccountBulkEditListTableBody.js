import { Table } from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';

import {
  getAccountClassifications,
  getAccountNumberCounts,
  getTableEntries,
  getTaxCodeList,
} from '../../AccountListSelectors';
import AccountNameRowItem from './accountRowItems/AccountNameRowItem';
import AccountNumberRowItem from './accountRowItems/AccountNumberRowItem';
import AccountTypeRowItem from './accountRowItems/AccountTypeRowItem';
import OpeningBalanceRowItem from './accountRowItems/OpeningBalanceRowItem';
import ReadOnlyRowItem from './accountRowItems/ReadOnlyRowItem';
import TaxCodeRowItem from './accountRowItems/TaxCodeRowItem';

const AccountBulkEditListTableBody = ({
  tableConfig,
  entries,
  onAccountDetailsChange,
  calculateRemainingHistoricalBalance,
  accountClassifications,
  taxCodeList,
}) => {
  const accountNumberCount = getAccountNumberCounts(entries);
  const rows = entries.map((entry, index) => {
    const {
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
    } = entry;

    return (
      <Table.Row key={id}>
        <AccountNumberRowItem
          config={tableConfig.accountNumber}
          accountNumber={accountNumber}
          indentLevel={indentLevel}
          isSystem={isSystem}
          isHeader={isHeader}
          index={index}
          onChange={onAccountDetailsChange}
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
  });

  return <Table.Body>{rows}</Table.Body>;
};

const mapStateToProps = (state) => ({
  entries: getTableEntries(state),
  accountClassifications: getAccountClassifications(state),
  taxCodeList: getTaxCodeList(state),
});

export default connect(mapStateToProps)(AccountBulkEditListTableBody);
