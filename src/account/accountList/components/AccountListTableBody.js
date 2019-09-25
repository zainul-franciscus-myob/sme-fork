import { Label, Table } from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';
import classNames from 'classnames';

import { getAppliedFilterOptionsShowInactive, getTableEntries } from '../AccountListSelectors';
import styles from './AccountListTableBody.module.css';

const StatusRowItem = ({ tableConfig, isInactive }) => (
  <Table.RowItem {...tableConfig.status}>
    {isInactive && (<Label type="boxed" color="light-grey" size="small">Inactive</Label>)}
  </Table.RowItem>
);

const AccountRowItem = ({
  config, value, indentLevel, isSystem, isHeader,
}) => {
  const className = classNames({
    [styles.systemAccount]: isSystem,
    [styles.headerAccount]: isHeader,
  });

  return (
    <Table.RowItem {...config} indentLevel={indentLevel}>
      <span className={className}>{value}</span>
    </Table.RowItem>
  );
};

const AccountListTableBody = ({
  tableConfig, showInactive, entries,
}) => {
  const rows = entries.map((entry) => {
    const {
      id,
      accountNumber,
      accountName,
      type,
      taxCode,
      linked,
      displayLevel,
      balance,
      isSystem,
      isHeader,
      isInactive,
      indentLevel,
    } = entry;

    return (
      <Table.Row key={id}>
        <AccountRowItem
          config={tableConfig.accountNumber}
          value={accountNumber}
          indentLevel={indentLevel}
          isSystem={isSystem}
          isHeader={isHeader}
        />
        <AccountRowItem
          config={tableConfig.accountName}
          value={accountName}
          isSystem={isSystem}
          isHeader={isHeader}
        />
        { showInactive && StatusRowItem({ tableConfig, isInactive })}
        <AccountRowItem
          config={tableConfig.type}
          value={type}
        />
        <AccountRowItem
          config={tableConfig.taxCode}
          value={taxCode}
          isSystem={isSystem}
          isHeader={isHeader}
        />
        <AccountRowItem
          config={tableConfig.linked}
          value={linked}
          isSystem={isSystem}
          isHeader={isHeader}
        />
        <AccountRowItem
          config={tableConfig.level}
          value={displayLevel}
          isSystem={isSystem}
          isHeader={isHeader}
        />
        <AccountRowItem
          config={tableConfig.balance}
          value={balance}
          isSystem={isSystem}
          isHeader={isHeader}
        />
      </Table.Row>
    );
  });

  return (
    <Table.Body>
      {rows}
    </Table.Body>
  );
};

const mapStateToProps = state => ({
  showInactive: getAppliedFilterOptionsShowInactive(state),
  entries: getTableEntries(state),
});

export default connect(mapStateToProps)(AccountListTableBody);
