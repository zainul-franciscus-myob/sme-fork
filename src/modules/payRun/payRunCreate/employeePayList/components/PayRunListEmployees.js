import { PageHead, Stepper } from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';

import { getIsEtpOpen, getIsJobListModalOpen, getIsUnsavedModalOpen } from '../EmployeePayListSelectors';
import {
  getStepNumber, getStepperSteps,
} from '../../PayRunSelectors';
import EmployeePayActions from './EmployeePayActions';
import EmployeePayHeader from '../../components/EmployeePayHeader';
import EmployeePayTable from './EmployeePayTable';
import EtpModal from './EtpModal';
import JobListModalView from '../../../jobListModal/components/JobListModalView';
import UnsavedModal from '../../../../../components/modal/UnsavedModal';
import UpgradeModal from './UpgradeModal';
import styles from './PayRunListEmployees.module.css';

const PayRunListEmployees = ({
  isEtpOpen,
  isJobListModalOpen,
  onSelectRow,
  onSelectAllRows,
  onEmployeePayItemChange,
  onEmployeePayItemBlur,
  onPreviousButtonClick,
  onSaveAndCloseButtonClick,
  onChangeEtpCodeCategory,
  onChangeEtpCode,
  onCloseEtpModal,
  onOpenEtpModal,
  onSaveEtp,
  onNextButtonClick,
  stepNumber,
  payRunSteps,
  onUpgradeModalUpgradeButtonClick,
  onUpgradeModalDismiss,
  isUnsavedModalOpen,
  onUnsavedModalCancel,
  onUnsavedModalDiscard,
  onUnsavedModalSave,
  onAddJob,
  onAddJobCancel,
  onAddJobSave,
  onAddJobCheckboxChange,
  onAddJobAmountChange,
  onAddJobAmountBlur,
  onAllJobsCheckboxChange,
}) => (
  <React.Fragment>
    <UpgradeModal
      onUpgradeModalUpgradeButtonClick={onUpgradeModalUpgradeButtonClick}
      onUpgradeModalDismiss={onUpgradeModalDismiss}
    />
    { isJobListModalOpen
    && (<JobListModalView
      onSave={onAddJobSave}
      onCancel={onAddJobCancel}
      onAddJobCheckboxChange={onAddJobCheckboxChange}
      onAddJobAmountChange={onAddJobAmountChange}
      onAddJobAmountBlur={onAddJobAmountBlur}
      onAllJobsCheckboxChange={onAllJobsCheckboxChange}
    />)}
    { isEtpOpen && (
    <EtpModal
      onChangeEtpCode={onChangeEtpCode}
      onChangeEtpCodeCategory={onChangeEtpCodeCategory}
      onCloseEtpModal={onCloseEtpModal}
      onSaveEtp={onSaveEtp}
    />
    )}
    { isUnsavedModalOpen && (
    <UnsavedModal
      onCancel={onUnsavedModalCancel}
      onConfirmSave={onUnsavedModalSave}
      onConfirmUnsave={onUnsavedModalDiscard}
    />
    ) }
    <PageHead title="Calculate pays" />
    <div className={styles.stepper}>
      <Stepper activeStepNumber={stepNumber} steps={payRunSteps} />
    </div>
    <EmployeePayHeader />
    <EmployeePayTable
      onSelectRow={onSelectRow}
      onSelectAllRows={onSelectAllRows}
      onOpenEtpModal={onOpenEtpModal}
      onEmployeePayItemChange={onEmployeePayItemChange}
      onEmployeePayItemBlur={onEmployeePayItemBlur}
      onAddJob={onAddJob}
    />
    <EmployeePayActions
      onNextButtonClick={onNextButtonClick}
      onPreviousButtonClick={onPreviousButtonClick}
      onSaveAndCloseButtonClick={onSaveAndCloseButtonClick}
    />
  </React.Fragment>
);

const mapStateToProps = state => ({
  isEtpOpen: getIsEtpOpen(state),
  isJobListModalOpen: getIsJobListModalOpen(state),
  stepNumber: getStepNumber(state),
  payRunSteps: getStepperSteps(state),
  isUnsavedModalOpen: getIsUnsavedModalOpen(state),
});

export default connect(mapStateToProps)(PayRunListEmployees);
