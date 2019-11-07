import { LineItemTable } from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';

import {
  getAllocationLabel,
  getIsPercentageRed,
  getRemainingPercentage,
  getShowRemainingPercentage,
  getTableData,
} from '../bankingRuleSelectors';
import TableRow from './AllocationTableRow';
import styles from './AllocationTable.module.css';

const columnConfig = allocationLabel => [
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
        columnName: 'Tax code',
        styles: { width: '10.6rem' },
      },
    ],
  },
];

const labels = allocationLabel => [
  'Account', allocationLabel, 'Tax code',
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
      Tax code
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

const AllocationTable = ({
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
    <div className={remainingClassName}>
      <LineItemTable
        labels={labels(allocationLabel)}
        renderRow={renderRow(onRowInputBlur, allocationLabel)}
        data={allocations}
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
  allocationLabel: getAllocationLabel(state),
  allocations: getTableData(state),
  showRemainingPercentage: getShowRemainingPercentage(state),
  remainingPercentage: getRemainingPercentage(state),
  isPercentageRed: getIsPercentageRed(state),
});

export default connect(mapStateToProps)(AllocationTable);
