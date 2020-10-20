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
} from '../bankingRuleDetailSelectors';
import LineItemTableHeader from '../../../../components/LineItemTable/LineItemTableHeader';
import NoMoveWrapper from '../../../../components/LineItemTable/NoMoveWrapper';
import TableRow from './BankingRuleDetailAllocationTableRow';
import styles from './BankingRuleDetailView.module.css';

const renderRow = (onAddJob) => (index, _, onChange, labels) => (
  <TableRow
    index={index}
    key={index}
    labels={labels}
    onChange={onChange}
    onAddJob={onAddJob}
  />
);

const BankingRuleDetailAllocationTable = ({
  tableData,
  allocationLabel,
  taxCodeLabel,
  remainingPercentage,
  isPercentageRed,
  showRemainingPercentage,
  onAddRow,
  onAddJob,
  onRowChange,
  onRemoveRow,
  onViewedAccountToolTip,
}) => {
  const accountLabel = 'Account';
  const jobLabel = 'Job';

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
          columnName: jobLabel,
          styles: { width: '11.7rem' },
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
    <LineItemTableHeader
      label={accountLabel}
      required="This is required"
      toolTipContent="Use accounts to categorise transactions"
      toolTipMouseEnter={onViewedAccountToolTip}
    />,
    <LineItemTable.HeaderItem
      key={allocationLabel}
      requiredLabel="This is required"
    >
      {allocationLabel}
    </LineItemTable.HeaderItem>,
    <LineItemTable.HeaderItem key={jobLabel}>
      {jobLabel}
    </LineItemTable.HeaderItem>,
    <LineItemTable.HeaderItem key={taxCodeLabel}>
      {taxCodeLabel}
    </LineItemTable.HeaderItem>,
  ];

  const remainingClassName = isPercentageRed ? '' : styles.remaining;
  return (
    <div className={remainingClassName}>
      <NoMoveWrapper>
        <LineItemTable
          labels={labels}
          renderRow={renderRow(onAddJob)}
          data={tableData}
          onAddRow={onAddRow}
          onRowChange={onRowChange}
          onRemoveRow={onRemoveRow}
          columnConfig={columnConfig}
          headerItems={headerItems}
        >
          <div className={styles.totals}>
            <LineItemTable.Total>
              {showRemainingPercentage && (
                <LineItemTable.Totals
                  title="Remaining"
                  amount={remainingPercentage}
                />
              )}
            </LineItemTable.Total>
          </div>
        </LineItemTable>
      </NoMoveWrapper>
    </div>
  );
};

const mapStateToProps = (state) => ({
  tableData: getTableData(state),
  allocationLabel: getAllocationLabel(state),
  taxCodeLabel: getTaxCodeLabel(state),
  remainingPercentage: getRemainingPercentage(state),
  isPercentageRed: getIsPercentageRed(state),
  showRemainingPercentage: getShowRemainingPercentage(state),
});

export default connect(mapStateToProps)(BankingRuleDetailAllocationTable);
