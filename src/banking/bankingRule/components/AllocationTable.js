import { LineItemTable } from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';

import {
  getAllocationLabel,
  getIsPercentageRed,
  getRemainingPercentage,
  getShowRemainingPercentage,
  getTableData, getTaxCodeLabel,
} from '../bankingRuleSelectors';
import TableRow from './AllocationTableRow';
import styles from './AllocationTable.module.css';

const columnConfig = (allocationLabel, taxCodeLabel) => [
  {
    config: [
      {
        columnName: 'Account',
        styles: {},
      },
      {
        columnName: allocationLabel,
        styles: { width: '12.6rem' },
      },
      {
        columnName: taxCodeLabel,
        styles: { width: '10.6rem' },
      },
    ],
  },
];

const labels = (allocationLabel, taxCodeLabel) => [
  'Account', allocationLabel, taxCodeLabel,
];

const headerItems = (allocationLabel, taxCodeLabel) => [
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
      {taxCodeLabel}
    </LineItemTable.HeaderItem>
  ),
];

const renderRow = (onRowInputBlur, allocationLabel, taxCodeLabel) => (index, data, onChange) => (
  <TableRow
    index={index}
    key={index}
    labels={labels(allocationLabel, taxCodeLabel)}
    onRowInputBlur={onRowInputBlur}
    onChange={onChange}
  />
);

const AllocationTable = ({
  taxCodeLabel,
  allocations,
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
    <div className={`${styles.allocationTable} ${remainingClassName}`}>
      <LineItemTable
        labels={labels(allocationLabel, taxCodeLabel)}
        renderRow={renderRow(onRowInputBlur, allocationLabel, taxCodeLabel)}
        data={allocations}
        onAddRow={onAddRow}
        onRowChange={onRowChange}
        onRemoveRow={onRemoveRow}
        columnConfig={columnConfig(allocationLabel, taxCodeLabel)}
        headerItems={headerItems(allocationLabel, taxCodeLabel)}
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
  allocationLabel: getAllocationLabel(state),
  allocations: getTableData(state),
  showRemainingPercentage: getShowRemainingPercentage(state),
  remainingPercentage: getRemainingPercentage(state),
  isPercentageRed: getIsPercentageRed(state),
  taxCodeLabel: getTaxCodeLabel(state),
});

export default connect(mapStateToProps)(AllocationTable);
