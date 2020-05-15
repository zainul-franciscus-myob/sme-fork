import {
  Alert, Button, LineItemTable, Modal,
} from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';

import { getJobAmount, getJobListModalLoadingState } from '../../payRunCreate/employeePayList/EmployeePayListSelectors';
import JobListModalTable from './JobListModalTable';
import LoadingState from '../../../../components/PageView/LoadingState';
import PageView from '../../../../components/PageView/PageView';

const JobListModalView = ({
  onSave,
  onCancel,
  onAddJobCheckboxChange,
  onAddJobAmountChange,
  onAddJobAmountBlur,
  onAllJobsCheckboxChange,
  amount,
  loadingState,
}) => {
  const alertComponent = amount.unallocated < 0 && (
    <Alert type="danger">
      {'Unable to add jobs because the total allocated is more than the pay item amount.'}
    </Alert>
  );

  const jobListView = (
    <div className={''}>
      { alertComponent }
      <JobListModalTable
        onAddJobCheckboxChange={onAddJobCheckboxChange}
        onAllJobsCheckboxChange={onAllJobsCheckboxChange}
        onAddJobAmountChange={onAddJobAmountChange}
        onAddJobAmountBlur={onAddJobAmountBlur}
      />
      <LineItemTable.Total>
        <LineItemTable.Totals
          title="Total allocated"
          amount={`${amount.formatedAllocated} (${amount.allocatedPercent}%)`}
        />
        <LineItemTable.Totals
          totalAmount
          title="Unallocated"
          amount={`${amount.formatedUnallocated} (${amount.unallocatedPercent}%)`}
        />
      </LineItemTable.Total>
    </div>
  );

  const modal = (
    <Modal
      title="Add job"
      onCancel={onCancel}
      size="large"
    >
      <Modal.Body>
        <PageView loadingState={loadingState} view={jobListView} />
      </Modal.Body>
      <Modal.Footer>
        <Button
          type="secondary"
          onClick={onCancel}
        >
          Cancel
        </Button>
        <Button
          type="primary"
          onClick={onSave}
          disabled={loadingState !== LoadingState.LOADING_SUCCESS || amount.unallocated < 0}
        >
          Add
        </Button>
      </Modal.Footer>
    </Modal>
  );

  return modal;
};

const mapStateToProps = (state) => ({
  amount: getJobAmount(state),
  loadingState: getJobListModalLoadingState(state),
});

export default connect(mapStateToProps)(JobListModalView);
