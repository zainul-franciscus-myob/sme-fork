import {
  LineItemTable,
} from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';

import {
  getAllocationLabel,
  getIsPercentageRed,
  getRemainingPercentage,
  getShowRemainingPercentage,
  getTableData,
} from '../bankingRuleReceiveMoneySelectors';
import TableRow from './BankingRuleReceiveMoneyAllocationTableRow';
import styles from './BankingRuleReceiveMoneyView.module.css';

const columnConfig = allocationLabel => [
  {
    config: [
      {
        columnName: 'Account',
        styles: { },
      },
      {
        columnName: allocationLabel,
        styles: { width: '12.8rem' },
      },
      {
        columnName: 'Taxcode',
        styles: { width: '10.6rem' },
      },
    ],
  },
];

const labels = allocationLabel => [
  'Account', allocationLabel, 'Taxcode',
];

const headerItems = allocationLabel => [
  (
    <LineItemTable.HeaderItem key="account" requiredLabel="required">
      Account
    </LineItemTable.HeaderItem>
  ),
  (
    <LineItemTable.HeaderItem key={allocationLabel} requiredLabel="required">
      {allocationLabel}
    </LineItemTable.HeaderItem>
  ),
  (
    <LineItemTable.HeaderItem key="taxcode">
      Taxcode
    </LineItemTable.HeaderItem>
  ),
];

const renderRow = (onRowInputBlur, allocationLabel) => (index, data, onChange) => (
  <TableRow
    index={index}
    key={index}
    labels={labels(allocationLabel)}
    onRowInputBlur={onRowInputBlur}
    onChange={onChange}
  />
);

const BankingRuleReceiveMoneyAllocationTable = ({
  tableData,
  allocationLabel,
  remainingPercentage,
  isPercentageRed,
  showRemainingPercentage,
  onRowInputBlur,
  onAddRow,
  onRowChange,
  onRemoveRow,
}) => {
  const remainingClassName = isPercentageRed ? '' : styles.remaining;
  return (
    <div className={remainingClassName}>
      <LineItemTable
        labels={labels(allocationLabel)}
        renderRow={renderRow(onRowInputBlur, allocationLabel)}
        data={tableData}
        onAddRow={onAddRow}
        onRowChange={onRowChange}
        onRemoveRow={onRemoveRow}
        columnConfig={columnConfig(allocationLabel)}
        headerItems={headerItems(allocationLabel)}
      >
        {
        showRemainingPercentage && (
        <LineItemTable.Total>
          <LineItemTable.Totals title="Remaining" amount={remainingPercentage} />
        </LineItemTable.Total>
        )
      }
      </LineItemTable>
    </div>
  );
};

const mapStateToProps = state => ({
  tableData: getTableData(state),
  allocationLabel: getAllocationLabel(state),
  remainingPercentage: getRemainingPercentage(state),
  isPercentageRed: getIsPercentageRed(state),
  showRemainingPercentage: getShowRemainingPercentage(state),
});

export default connect(mapStateToProps)(BankingRuleReceiveMoneyAllocationTable);
