import { Select, Table } from '@myob/myob-widgets';
import React from 'react';

import {
  getAccountSubTypes,
  getAccountTypeName,
} from '../../../AccountListSelectors';
import ReadOnlyRowItem from './ReadOnlyRowItem';
import styles from '../../AccountListTable.module.css';

const handleSelectChange = (handler, index) => (e) => {
  const { name, value } = e.target;
  handler({ index, key: name, value });
};

const AccountTypeRowItem = ({
  config,
  isSystem,
  isHeader,
  accountClassifications,
  accountType,
  subAccountType,
  index,
  onChange,
}) => {
  const accountTypeName = getAccountTypeName(
    accountClassifications,
    accountType
  );
  const accountSubTypes = getAccountSubTypes(
    accountClassifications,
    accountType
  );

  if (isHeader || !accountSubTypes) {
    return (
      <ReadOnlyRowItem
        config={config}
        value={accountTypeName}
        title={subAccountType}
        isSystem={isSystem}
        isHeader={isHeader}
      />
    );
  }

  const accountSubTypeOptions = Object.entries(
    accountSubTypes
  ).map(([key, value]) => (
    <Select.Option key={key} value={key} label={value.displayName} />
  ));

  return (
    <Table.RowItem
      className={styles.accountInputRowItem}
      columnName={config.columnName}
      {...config.styles}
    >
      <Select
        name={config.fieldName}
        label="Account Type"
        hideLabel
        value={subAccountType}
        width="md"
        onChange={handleSelectChange(onChange, index)}
      >
        <Select.OptionGroup label={accountTypeName}>
          {accountSubTypeOptions}
        </Select.OptionGroup>
      </Select>
    </Table.RowItem>
  );
};

export const ReadyOnlyAccountTypeRowItem = ({
  config,
  isSystem,
  isHeader,
  accountClassifications,
  accountType,
  subAccountType,
}) => {
  const accountTypeName = getAccountTypeName(
    accountClassifications,
    accountType
  );
  const accountSubTypes = getAccountSubTypes(
    accountClassifications,
    accountType
  );

  if (isHeader || !accountSubTypes) {
    return (
      <ReadOnlyRowItem
        config={config}
        value={accountTypeName}
        title={subAccountType}
        isSystem={isSystem}
        isHeader={isHeader}
      />
    );
  }
  return (
    <ReadOnlyRowItem
      config={config}
      value={accountSubTypes[subAccountType].displayName}
      title={subAccountType}
      isSystem={isSystem}
      isHeader={isHeader}
    />
  );
};

export default AccountTypeRowItem;
