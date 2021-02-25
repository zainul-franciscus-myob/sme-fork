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
import { isValidJobMakerAction } from '../JobMakerActionTypes';
import JobMakerActionModal from './JobMakerActionModal';
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
  onModalCheckboxChanged,
  loadingState,
}) => {
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
    return (
      <JobMakerActionModal
        onConfirmAction={onModalActionClicked}
        onCloseModal={onCloseModal}
        dropDownAction={dropDownAction}
        onModalCheckboxChanged={onModalCheckboxChanged}
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

  return <PageView loadingState={loadingState} view={view} />;
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
