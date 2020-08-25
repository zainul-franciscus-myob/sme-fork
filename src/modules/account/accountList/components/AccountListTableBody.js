import { Checkbox, Label, Table } from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';
import classNames from 'classnames';

import { getShowInactive, getTableEntries } from '../AccountListSelectors';
import styles from './AccountListTable.module.css';

const StatusRowItem = ({ tableConfig, isInactive }) => (
  <Table.RowItem
    columnName={tableConfig.status.columnName}
    className={!isInactive ? styles.hidden : ''}
  >
    {isInactive ? (
      <Label type="boxed" color="light-grey" size="small">
        Inactive
      </Label>
    ) : (
      <span />
    )}
  </Table.RowItem>
);

const AccountRowItem = ({
  config,
  value,
  indentLevel,
  isSystem,
  isHeader,
  isAccountNumber,
  title,
  hideAccountNumber,
}) => {
  const className = classNames({
    [styles.systemAccount]: isSystem,
    [styles.headerAccount]: isHeader,
    [styles.indent]: indentLevel > 0,
  });

  const isHidden = value === '' || value === undefined ? styles.hidden : '';
  const hideHeaderAccountNumber = hideAccountNumber && isAccountNumber;

  return (
    !config.isHidden &&
    !hideHeaderAccountNumber && (
      <Table.RowItem
        columnName={config.columnName}
        {...config.styles}
        className={isHidden}
      >
        <span
          title={title}
          className={className}
          data-indent-level={indentLevel}
        >
          {value}
        </span>
      </Table.RowItem>
    )
  );
};

const onCheckboxChange = (onSelected, index) => (e) => {
  const { checked } = e.target;
  onSelected({ index, value: checked });
};

const AccountListTableBody = ({
  tableConfig,
  showInactive,
  entries,
  onAccountSelected,
}) => {
  const rows = entries.map((entry, index) => {
    const {
      selected,
      id,
      accountNumber,
      accountName,
      type,
      taxCode,
      linked,
      link,
      displayLevel,
      balance,
      isSystem,
      isHeader,
      isInactive,
      indentLevel,
      hideAccountNumber,
    } = entry;

    return (
      <Table.Row key={id}>
        <div className={styles.accSelectionColumn}>
          <Checkbox
            name={`${index}-select`}
            label={`Select row ${index}`}
            hideLabel
            onChange={onCheckboxChange(onAccountSelected, index)}
            checked={selected}
          />
        </div>
        <AccountRowItem
          config={tableConfig.accountNumber}
          value={accountNumber}
          title={accountNumber}
          indentLevel={indentLevel}
          isSystem={isSystem}
          isHeader={isHeader}
          hideAccountNumber={hideAccountNumber}
          isAccountNumber
        />
        <AccountRowItem
          config={tableConfig.accountName}
          value={<a href={link}>{accountName}</a>}
          title={accountName}
          isSystem={isSystem}
          isHeader={isHeader}
        />
        {showInactive && StatusRowItem({ tableConfig, isInactive })}
        <AccountRowItem config={tableConfig.type} value={type} title={type} />
        <AccountRowItem
          config={tableConfig.taxCode}
          value={taxCode}
          title={taxCode}
          isSystem={isSystem}
          isHeader={isHeader}
        />
        <AccountRowItem
          config={tableConfig.linked}
          value={linked}
          title={linked}
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

  return <Table.Body>{rows}</Table.Body>;
};

const mapStateToProps = (state) => ({
  showInactive: getShowInactive(state),
  entries: getTableEntries(state),
});

export default connect(mapStateToProps)(AccountListTableBody);
