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
      title: 'Nominate Employee',
      body: 'I nominate this employee for the JobMaker Hiring Credit.',
    },
    {
      key: JobMakerActionTypes.CancelNominate,
      actionButtonLabel: 'Remove',
      title: 'Remove Nomination',
      body:
        'Removing this nomination will remove the employee from JobMaker claims with the ATO.',
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
      Employee nominations and declarations for claim period&nbsp;
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
