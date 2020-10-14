import { LineItemTable } from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';

import {
  getAllocationLabel,
  getIsPercentageRed,
  getRemainingPercentage,
  getShowRemainingPercentage,
  getTableData,
  getTaxCodeLabel,
} from '../bankingRuleSelectors';
import TableRow from './AllocationTableRow';
import styles from './AllocationTable.module.css';

const renderRow = (index, _, onChange, labels) => (
  <TableRow index={index} key={index} labels={labels} onChange={onChange} />
);

const AllocationTable = ({
  taxCodeLabel,
  allocations,
  allocationLabel,
  remainingPercentage,
  isPercentageRed,
  showRemainingPercentage,
  onAddRow,
  onRowChange,
  onRemoveRow,
}) => {
  const accountLabel = 'Account';
  const jobLabel = 'Job';
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
          styles: { width: '12.6rem' },
        },
        {
          columnName: jobLabel,
          styles: { width: '11.6rem' },
        },
        {
          columnName: taxCodeLabel,
          styles: { width: '10.6rem' },
        },
      ],
    },
  ];

  const labels = [accountLabel, allocationLabel, jobLabel, taxCodeLabel];

  const headerItems = [
    <LineItemTable.HeaderItem key={accountLabel} requiredLabel="required">
      {accountLabel}
    </LineItemTable.HeaderItem>,
    <LineItemTable.HeaderItem key={allocationLabel} requiredLabel="required">
      {allocationLabel}
    </LineItemTable.HeaderItem>,
    <LineItemTable.HeaderItem key={jobLabel}>
      {jobLabel}
    </LineItemTable.HeaderItem>,
    <LineItemTable.HeaderItem key={taxCodeLabel}>
      {taxCodeLabel}
    </LineItemTable.HeaderItem>,
  ];
  return (
    <LineItemTable
      labels={labels}
      renderRow={renderRow}
      data={allocations}
      onAddRow={onAddRow}
      onRowChange={onRowChange}
      onRemoveRow={onRemoveRow}
      columnConfig={columnConfig}
      headerItems={headerItems}
      className={styles.allocationTable}
    >
      <LineItemTable.Total className={styles.totals}>
        {showRemainingPercentage && (
          <LineItemTable.Totals
            title="Remaining"
            amount={remainingPercentage}
            className={remainingClassName}
          />
        )}
      </LineItemTable.Total>
    </LineItemTable>
  );
};

const mapStateToProps = (state) => ({
  allocationLabel: getAllocationLabel(state),
  allocations: getTableData(state),
  showRemainingPercentage: getShowRemainingPercentage(state),
  remainingPercentage: getRemainingPercentage(state),
  isPercentageRed: getIsPercentageRed(state),
  taxCodeLabel: getTaxCodeLabel(state),
});

export default connect(mapStateToProps)(AllocationTable);
