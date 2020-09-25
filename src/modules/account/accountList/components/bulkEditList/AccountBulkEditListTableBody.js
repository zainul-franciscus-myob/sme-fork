import { Table } from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';
import classNames from 'classnames';

import { getTableEntries } from '../../AccountListSelectors';
import AmountInput from '../../../../../components/autoFormatter/AmountInput/AmountInput';
import styles from '../AccountListTable.module.css';

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
    [styles.bulkUpdateHeaderRow]: true,
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

const onAmountChange = (handler, index) => ({ target }) => {
  const { name, rawValue } = target;
  handler({ key: name, value: rawValue, index });
};

const EditableAccountRowItem = ({ config, onChange, onBlur, index, value }) => (
  <Table.RowItem columnName={config.columnName} {...config.styles}>
    <AmountInput
      textAlign="right"
      className={styles.textAlign}
      hideLabel
      name={`${config.fieldName}`}
      value={value}
      onChange={onAmountChange(onChange, index)}
      onBlur={onBlur}
      numeralDecimalScaleMax={2}
      numeralDecimalScaleMin={2}
      numeralIntegerScale={13}
    />
  </Table.RowItem>
);

const AccountBulkEditListTableBody = ({
  tableConfig,
  entries,
  onAccountDetailsChange,
  calculateRemainingHistoricalBalance,
}) => {
  const rows = entries.map((entry, index) => {
    const {
      id,
      accountNumber,
      accountName,
      link,
      balance,
      isSystem,
      isHeader,
      indentLevel,
      hideAccountNumber,
      openingBalance,
      type,
      taxCode,
    } = entry;

    return (
      <Table.Row key={id}>
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
        <AccountRowItem config={tableConfig.type} value={type} title={type} />
        <AccountRowItem
          config={tableConfig.taxCode}
          value={taxCode}
          title={taxCode}
          isSystem={isSystem}
          isHeader={isHeader}
        />
        {isHeader ? (
          <AccountRowItem
            config={tableConfig.openingBalance}
            value={openingBalance}
            title={openingBalance}
            isSystem={isSystem}
            isHeader={isHeader}
          />
        ) : (
          <EditableAccountRowItem
            config={tableConfig.openingBalance}
            index={index}
            value={openingBalance}
            onChange={({ key, value }) =>
              onAccountDetailsChange({ index, key, value })
            }
            onBlur={calculateRemainingHistoricalBalance}
          />
        )}
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
  entries: getTableEntries(state),
});

export default connect(mapStateToProps)(AccountBulkEditListTableBody);
