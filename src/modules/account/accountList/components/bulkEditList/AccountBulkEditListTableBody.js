import { Table } from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';

import {
  getAccountClassifications,
  getAccountNumberCounts,
  getHoveredRowIndex,
  getTableEntries,
  getTaxCodeList,
} from '../../AccountListSelectors';
import AccountBulkEditListTableRow from './AccountBulkEditListTableRow';

const AccountBulkEditListTableBody = ({
  tableConfig,
  entries,
  onAccountDetailsChange,
  onAccountNumberChange,
  onAccountNumberBlur,
  calculateRemainingHistoricalBalance,
  accountClassifications,
  taxCodeList,
  onEntryHover,
  onEntryLeave,
  hoveredRowIndex,
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
      hideAccountNumber,
      dirty,
    } = entry;

    return (
      <AccountBulkEditListTableRow
        tableConfig={tableConfig}
        onAccountDetailsChange={onAccountDetailsChange}
        onAccountNumberChange={onAccountNumberChange}
        onAccountNumberBlur={onAccountNumberBlur}
        calculateRemainingHistoricalBalance={
          calculateRemainingHistoricalBalance
        }
        accountClassifications={accountClassifications}
        taxCodeList={taxCodeList}
        accountNumberCount={accountNumberCount}
        index={index}
        id={id}
        accountNumber={accountNumber}
        accountName={accountName}
        balance={balance}
        isSystem={isSystem}
        isHeader={isHeader}
        indentLevel={indentLevel}
        openingBalance={openingBalance}
        subAccountType={subAccountType}
        accountType={accountType}
        taxCode={taxCode}
        taxCodeId={taxCodeId}
        hideAccountNumber={hideAccountNumber}
        onEntryHover={onEntryHover}
        hoveredRowIndex={hoveredRowIndex}
        dirty={dirty}
      />
    );
  });

  return (
    <div onMouseLeave={onEntryLeave}>
      <Table.Body>{rows}</Table.Body>
    </div>
  );
};

const mapStateToProps = (state) => ({
  entries: getTableEntries(state),
  accountClassifications: getAccountClassifications(state),
  taxCodeList: getTaxCodeList(state),
  hoveredRowIndex: getHoveredRowIndex(state),
});

export default connect(mapStateToProps)(AccountBulkEditListTableBody);
