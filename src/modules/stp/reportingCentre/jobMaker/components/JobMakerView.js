import { Alert, BaseTemplate } from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';

import {
  getCurrentPayrollYearLabel,
  getCurrentPeriodDetails,
  getDropdownAction,
  getEmployees,
  getIsShowingJobMakerActionModal,
  getIsTableLoading,
  getLoadingState,
} from '../JobMakerSelector';
import JobMakerActionModal from './JobMakerActionModal';
import JobMakerActionTypes, {
  isValidJobMakerAction,
} from '../JobMakerActionTypes';
import JobMakerHeader from './JobMakerHeader';
import JobMakerLanding from './JobMakerLanding';
import JobMakerTable from './JobMakerTable';
import PageView from '../../../../../components/PageView/PageView';
import styles from './JobMakerView.module.css';

const JobMakerActionClaimModalBody = () => (
  <div>
    <p>
      I declare that the employee has worked on average more than 20 hours per
      week across the claim period.
    </p>
    Visit our{' '}
    <a
      href="https://help.myob.com/wiki/x/mAaFAw#expand-4Declareemployeeeligibilityforaclaimperiod"
      target="_blank"
      rel="noopener noreferrer"
    >
      help page
    </a>{' '}
    for more details.
  </div>
);

const JobMakerActionCancelClaimModalBody = () => (
  <div>
    <p>
      I am removing this employee’s declaration because they didn’t work a
      minimum average of 20 hours per week for the claim period.
    </p>
    You will not be able to claim JobMaker for this employee for this claim
    period.
  </div>
);

const JobMakerView = ({
  featureToggles,
  currentPayrollYearLabel,
  currentPeriodDetails,
  employees,
  onJobMakerTableDropdownItemClicked,
  isTableLoading,
  dropDownAction,
  isShowingJobMakerActionModal,
  onCloseModal,
  onModalActionClicked,
}) => {
  const actionModalConfigsList = Object.freeze([
    {
      key: JobMakerActionTypes.Nominate,
      actionButtonLabel: 'Nominate',
      title: 'Nominate employee',
      body: 'I nominate this employee for the JobMaker Hiring Credit.',
    },
    {
      key: JobMakerActionTypes.CancelNominate,
      actionButtonLabel: 'Remove',
      title: 'Remove nomination',
      body:
        'Removing this nomination will remove the employee from JobMaker claims with the ATO.',
    },
    {
      key: JobMakerActionTypes.Claim,
      actionButtonLabel: 'Declare',
      title: 'Declare employee as eligible',
      body: <JobMakerActionClaimModalBody />,
    },
    {
      key: JobMakerActionTypes.CancelClaim,
      actionButtonLabel: 'Remove',
      title: 'Remove employee declaration',
      body: <JobMakerActionCancelClaimModalBody />,
    },
  ]);
  const actionModalConfigs = {};
  actionModalConfigsList.forEach((x) => {
    const { actionButtonLabel, title, body } = x;
    actionModalConfigs[x.key] = {
      actionButtonLabel,
      title,
      body,
      testid: `jobmakerAction-modal-${x.key}`,
    };
  });
  // make sure cannot be modified afterward
  Object.freeze(actionModalConfigs);
  const infoComponent = (
    <Alert type="info">
      Employee nominations and declarations for JobMaker period&nbsp;
      {currentPeriodDetails.period} can be made from the&nbsp;
      {currentPeriodDetails.claimStart} till the&nbsp;
      {currentPeriodDetails.claimBestBefore}. Claims through the ATO service
      close&nbsp;
      {currentPeriodDetails.claimEnd}.&nbsp;
      <a
        href="https://help.myob.com/wiki/x/mAaFAw#expand-5ClaimJobMakerpayments"
        target="_blank"
        rel="noopener noreferrer"
      >
        Learn more.
      </a>
    </Alert>
  );
  const renderJobMakerActionModal = () => {
    if (!isShowingJobMakerActionModal || !isValidJobMakerAction(dropDownAction))
      return null;
    const modalConfig = actionModalConfigs[dropDownAction];
    if (!modalConfig) return null;
    const { body, title, actionButtonLabel, testid } = modalConfig;
    return (
      <JobMakerActionModal
        onConfirmAction={onModalActionClicked}
        onCloseModal={onCloseModal}
        body={body}
        title={title}
        actionButtonLabel={actionButtonLabel}
        testid={testid}
      />
    );
  };

  const jobMakerTable = (
    <JobMakerTable
      isTableLoading={isTableLoading}
      currentPeriodDetails={currentPeriodDetails}
      onDropdownItemClicked={onJobMakerTableDropdownItemClicked}
      employees={employees}
    />
  );

  const view = featureToggles.isJobMakerDeclarationEnabled ? (
    <BaseTemplate
      templateClassName={styles.jobmakerTemplate}
      containerClassName={styles.jobmakerContainer}
    >
      <JobMakerHeader
        currentPayrollYearLabel={currentPayrollYearLabel}
        currentPeriodDetails={currentPeriodDetails}
      />
      {infoComponent}
      {renderJobMakerActionModal()}
      {jobMakerTable}
    </BaseTemplate>
  ) : (
    <JobMakerLanding />
  );

  return <PageView view={view} />;
};

const mapStateToProps = (state) => ({
  loadingState: getLoadingState(state),
  isTableLoading: getIsTableLoading(state),
  currentPayrollYearLabel: getCurrentPayrollYearLabel(state),
  currentPeriodDetails: getCurrentPeriodDetails(state),
  employees: getEmployees(state),
  isShowingJobMakerActionModal: getIsShowingJobMakerActionModal(state),
  dropDownAction: getDropdownAction(state),
});

export default connect(mapStateToProps)(JobMakerView);
