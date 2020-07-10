import { Checkbox, Table } from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';

import { getJobsSelectStatus } from '../../payRunCreate/employeePayList/EmployeePayListSelectors';
import JobListModalTableBody from './JobListModalTableBody';
import TableView from '../../../../components/TableView/TableView';
import handleCheckboxChange from '../../../../components/handlers/handleCheckboxChange';
import styles from './JobListModalTable.module.css';

const tableConfig = {
  checkbox: { width: '3.7rem', cellRole: 'checkbox', valign: 'middle' },
  id: { columnName: 'Job', width: '20rem', valign: 'middle' },
  name: { columnName: '', width: 'flex-1', valign: 'middle' },
  amount: {
    columnName: 'Amount ($)',
    width: '20rem',
    valign: 'middle',
    align: 'left',
  },
};

const JobListModalTable = ({
  onAddJobCheckboxChange,
  onAddJobAmountChange,
  onAddJobAmountBlur,
  jobsSelectStatus,
  onAllJobsCheckboxChange,
}) => {
  const header = (
    <Table.Header className={styles.jobListTableHead}>
      <Table.HeaderItem {...tableConfig.checkbox}>
        <Checkbox
          onChange={handleCheckboxChange(onAllJobsCheckboxChange)}
          checked={jobsSelectStatus === 'checked'}
          indeterminate={jobsSelectStatus === 'indeterminate'}
        />
      </Table.HeaderItem>
      <Table.HeaderItem {...tableConfig.id}>
        {tableConfig.id.columnName}
      </Table.HeaderItem>
      <Table.HeaderItem {...tableConfig.name}></Table.HeaderItem>
      <Table.HeaderItem {...tableConfig.amount}>
        {tableConfig.amount.columnName}
      </Table.HeaderItem>
    </Table.Header>
  );

  const tableBody = (
    <JobListModalTableBody
      tableConfig={tableConfig}
      onAddJobCheckboxChange={onAddJobCheckboxChange}
      onAddJobAmountChange={onAddJobAmountChange}
      onAddJobAmountBlur={onAddJobAmountBlur}
    />
  );

  return (
    <TableView
      hasActions
      className={styles.jobListTable}
      header={header}
      // This prop is necessary to enable certain styling for the Table component in mobile view
      // for when the table has a checkbox/radio button, or any actionable item for each row.
      onRowSelect={() => {}}
    >
      {tableBody}
    </TableView>
  );
};

const mapStateToProps = (state) => ({
  jobsSelectStatus: getJobsSelectStatus(state),
});

export default connect(mapStateToProps)(JobListModalTable);
