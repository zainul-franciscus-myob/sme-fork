import {
  Checkbox, Table,
} from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';

import { getSelectedPayItemJobs } from '../../payRunCreate/employeePayList/EmployeePayListSelectors';
import AmountInput from '../../../../components/autoFormatter/AmountInput/AmountInput';
import handleAmountInputChange from '../../../../components/handlers/handleAmountInputChange';
import handleCheckboxChange from '../../../../components/handlers/handleCheckboxChange';
import styles from './JobListModalTableBody.module.css';

const JobListModalTableBody = ({
  tableConfig,
  jobs,
  onAddJobCheckboxChange,
  onAddJobAmountBlur,
  onAddJobAmountChange,
}) => {
  const rows = jobs.map(job => {
    const onCheckboxChanged = ({ value }) => {
      onAddJobCheckboxChange({ id: job.id, isSelected: value, amount: job.amount });
    };

    const onAmountChanged = ({ value }) => {
      onAddJobAmountChange({ id: job.id, amount: value });
    };

    const onAmountBlur = ({ value }) => {
      onAddJobAmountBlur({ id: job.id, amount: value });
    };

    const checkbox = (
      <Checkbox
        name={job.id}
        hideLabel
        value={job.id}
        checked={job.isSelected}
        onChange={handleCheckboxChange(onCheckboxChanged)}
      />
    );

    const onRowSelect = () => { };

    return (
      <Table.Row onRowSelect={onRowSelect} key={`${job.id}`}>
        <Table.RowItem {...tableConfig.checkbox}>
          {checkbox}
        </Table.RowItem>
        <Table.RowItem {...tableConfig.id}>
          {job.jobNumber}
        </Table.RowItem>
        <Table.RowItem {...tableConfig.name}>
          {job.jobName}
        </Table.RowItem>
        <Table.RowItem {...tableConfig.amount}>
        <AmountInput
          textAlign="left"
          name="value"
          value={job.amount}
          onChange={handleAmountInputChange(onAmountChanged)}
          onBlur={handleAmountInputChange(onAmountBlur)}
          numeralDecimalScaleMin={2}
          numeralDecimalScaleMax={2}
        />
        </Table.RowItem>
      </Table.Row>
    );
  });

  return (
    <Table.Body className={styles.jobListTableBody}>
      {rows}
    </Table.Body>
  );
};

const mapStateToProps = (state) => ({
  jobs: getSelectedPayItemJobs(state),
});

export default connect(mapStateToProps)(JobListModalTableBody);
