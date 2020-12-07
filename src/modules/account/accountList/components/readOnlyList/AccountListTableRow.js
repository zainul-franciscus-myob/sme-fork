import { Checkbox, Table } from '@myob/myob-widgets';
import React from 'react';

import AccountListRowItem from './accountListRowItems/AccountListRowItem';
import AccountListStatusRowItem from './accountListRowItems/AccountListStatusRowItem';
import styles from '../AccountListTable.module.css';

const onCheckboxChange = (onSelected, index) => (e) => {
  const { checked } = e.target;
  onSelected({ index, value: checked });
};

const getDisplayNameForSubAccountType = (
  accountClassifications,
  accountType,
  subAccountType
) => {
  if (accountClassifications[accountType].type)
    return accountClassifications[accountType].type[subAccountType].displayName;
  return accountClassifications[accountType].displayName;
};

const AccountListTableRow = ({
  accountClassifications,
  index,
  onAccountSelected,
  selected,
  tableConfig,
  accountNumber,
  indentLevel,
  isSystem,
  isHeader,
  hideAccountNumber,
  link,
  accountName,
  showInactive,
  isInactive,
  accountType,
  subAccountType,
  taxCode,
  linked,
  displayLevel,
  balance,
}) => (
  <Table.Row>
    <div className={styles.accSelectionColumn}>
      <Checkbox
        name={`${index}-select`}
        label={`Select row ${index}`}
        hideLabel
        onChange={onCheckboxChange(onAccountSelected, index)}
        checked={selected}
      />
    </div>
    <AccountListRowItem
      config={tableConfig.accountNumber}
      value={accountNumber}
      title={accountNumber}
      indentLevel={indentLevel}
      isSystem={isSystem}
      isHeader={isHeader}
      hideAccountNumber={hideAccountNumber}
      isAccountNumber
    />
    <AccountListRowItem
      config={tableConfig.accountName}
      value={<a href={link}>{accountName}</a>}
      title={accountName}
      isSystem={isSystem}
      isHeader={isHeader}
    />
    {showInactive && (
      <AccountListStatusRowItem
        tableConfig={tableConfig}
        isInactive={isInactive}
      />
    )}
    <AccountListRowItem
      config={tableConfig.type}
      value={
        isHeader
          ? accountClassifications[accountType].displayName
          : getDisplayNameForSubAccountType(
              accountClassifications,
              accountType,
              subAccountType
            )
      }
      title={subAccountType}
    />
    <AccountListRowItem
      config={tableConfig.taxCode}
      value={taxCode}
      title={taxCode}
      isSystem={isSystem}
      isHeader={isHeader}
    />

    <AccountListRowItem
      config={tableConfig.linked}
      value={linked}
      title={linked}
      isSystem={isSystem}
      isHeader={isHeader}
    />

    <AccountListRowItem
      config={tableConfig.level}
      value={displayLevel}
      isSystem={isSystem}
      isHeader={isHeader}
    />
    <AccountListRowItem
      config={tableConfig.balance}
      value={balance}
      isSystem={isSystem}
      isHeader={isHeader}
    />
  </Table.Row>
);

const areEqual = (prevProps, nextProps) => {
  return (
    prevProps.selected === nextProps.selected &&
    prevProps.accountNumber === nextProps.accountNumber &&
    prevProps.accountName === nextProps.accountName &&
    prevProps.showInactive === nextProps.showInactive &&
    prevProps.isInactive === nextProps.isInactive &&
    prevProps.isHeader === nextProps.isHeader &&
    prevProps.isSystem === nextProps.isSystem &&
    prevProps.accountType === nextProps.accountType &&
    prevProps.subAccountType === nextProps.subAccountType &&
    prevProps.taxCode === nextProps.taxCode &&
    prevProps.linked === nextProps.linked &&
    prevProps.displayLevel === nextProps.displayLevel &&
    prevProps.balance === nextProps.balance
  );
};

export default React.memo(AccountListTableRow, areEqual);
