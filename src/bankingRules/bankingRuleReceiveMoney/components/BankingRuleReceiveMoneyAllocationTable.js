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
  getTaxCodeLabel,
} from '../bankingRuleReceiveMoneySelectors';
import TableRow from './BankingRuleReceiveMoneyAllocationTableRow';
import styles from './BankingRuleReceiveMoneyView.module.css';

const renderRow = onRowInputBlur => (index, _, onChange, labels) => (
  <TableRow
    index={index}
    key={index}
    labels={labels}
    onRowInputBlur={onRowInputBlur}
    onChange={onChange}
  />
);

const BankingRuleReceiveMoneyAllocationTable = ({
  tableData,
  allocationLabel,
  taxCodeLabel,
  remainingPercentage,
  isPercentageRed,
  showRemainingPercentage,
  onRowInputBlur,
  onAddRow,
  onRowChange,
  onRemoveRow,
}) => {
  const accountLabel = 'Account';
  const remainingClassName = isPercentageRed ? '' : styles.remaining;

  const columnConfig = [
    {
      config: [
        {
          columnName: accountLabel,
          styles: {},
        },
        {
          columnName: allocationLabel,
          styles: { width: '12.8rem' },
        },
        {
          columnName: taxCodeLabel,
          styles: { width: '10.6rem' },
        },
      ],
    },
  ];

  const labels = [
    accountLabel, allocationLabel, taxCodeLabel,
  ];

  const headerItems = [
    (
      <LineItemTable.HeaderItem key={accountLabel} requiredLabel="required">
        {accountLabel}
      </LineItemTable.HeaderItem>
    ),
    (
      <LineItemTable.HeaderItem key={allocationLabel} requiredLabel="required">
        {allocationLabel}
      </LineItemTable.HeaderItem>
    ),
    (
      <LineItemTable.HeaderItem key={taxCodeLabel}>
        {taxCodeLabel}
      </LineItemTable.HeaderItem>
    ),
  ];
  return (
    <div className={remainingClassName}>
      <LineItemTable
        labels={labels}
        renderRow={renderRow(onRowInputBlur, allocationLabel)}
        data={tableData}
        onAddRow={onAddRow}
        onRowChange={onRowChange}
        onRemoveRow={onRemoveRow}
        columnConfig={columnConfig}
        headerItems={headerItems}
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
  taxCodeLabel: getTaxCodeLabel(state),
});

export default connect(mapStateToProps)(BankingRuleReceiveMoneyAllocationTable);
