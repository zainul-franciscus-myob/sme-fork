import { PageHead, Stepper } from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';

import { getIsEtpOpen } from '../EmployeePayListSelectors';
import { getStepNumber, getStepperSteps } from '../../PayRunSelectors';
import EmployeePayActions from './EmployeePayActions';
import EmployeePayHeader from '../../components/EmployeePayHeader';
import EmployeePayTable from './EmployeePayTable';
import EtpModal from './EtpModal';
import styles from './PayRunListEmployees.module.css';

const PayRunListEmployees = ({
  isEtpOpen,
  onSelectRow,
  onSelectAllRows,
  onEmployeePayItemChange,
  onEmployeePayItemBlur,
  onPreviousButtonClick,
  onChangeEtpCodeCategory,
  onChangeEtpCode,
  onCloseEtpModal,
  onOpenEtpModal,
  onSaveEtp,
  onNextButtonClick,
  stepNumber,
  payRunSteps,
}) => (
  <React.Fragment>
    { isEtpOpen && (
    <EtpModal
      onChangeEtpCode={onChangeEtpCode}
      onChangeEtpCodeCategory={onChangeEtpCodeCategory}
      onCloseEtpModal={onCloseEtpModal}
      onSaveEtp={onSaveEtp}
    />
    )}
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
    />
    <EmployeePayActions
      onNextButtonClick={onNextButtonClick}
      onPreviousButtonClick={onPreviousButtonClick}
    />
  </React.Fragment>
);

const mapStateToProps = state => ({
  isEtpOpen: getIsEtpOpen(state),
  stepNumber: getStepNumber(state),
  payRunSteps: getStepperSteps(state),
});

export default connect(mapStateToProps)(PayRunListEmployees);
