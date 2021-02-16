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
import JobMakerActionTypes, {
  isValidJobMakerAction,
} from '../JobMakerActionTypes';
import JobMakerHeader from './JobMakerHeader';
import JobMakerLanding from './JobMakerLanding';
import JobMakerNominationModal from './JobMakerNominationModal';
import JobMakerTable from './JobMakerTable';
import PageView from '../../../../../components/PageView/PageView';
import styles from './JobMakerView.module.css';
// import JobMakerRemoveNominationModal from './JobMakerRemoveNominationModal';

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
  const JobMakerActionModal = () => {
    if (!isShowingJobMakerActionModal || !isValidJobMakerAction(dropDownAction))
      return null;
    switch (dropDownAction) {
      case JobMakerActionTypes.Nominate:
        return (
          <JobMakerNominationModal
            onNominate={onModalActionClicked}
            onCloseModal={onCloseModal}
          />
        );
      // case JobMakerActionTypes.CancelNominate:
      //   return (
      //     <JobMakerRemoveNominationModal
      //       onNominate={onModalActionClicked}
      //       onCloseModal={onCloseModal}
      //     />
      //   );
      default:
        return null;
    }
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
      {JobMakerActionModal()}
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
