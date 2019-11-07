import { PageHead, Stepper } from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';

import { getIsEtpOpen } from '../EmployeePayListSelectors';
import EmployeePayActions from './EmployeePayActions';
import EmployeePayHeader from '../../components/EmployeePayHeader';
import EmployeePayTable from './EmployeePayTable';
import EtpModal from './EtpModal';
import styles from './PayRunListEmployees.module.css';

const PayRunSteps = [
  {
    number: '1',
    title: 'Select pay period',
    type: 'complete',
  },
  {
    number: '2',
    title: 'Calculate pays',
    type: 'incomplete',
  },
  {
    number: '3',
    title: 'Record and report',
    type: 'incomplete',
  },
  {
    number: '4',
    title: 'Prepare pay slips',
    type: 'incomplete',
  },
  {
    number: '5',
    title: 'Done!',
    type: 'incomplete',
  },
];

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
      <Stepper activeStepNumber="2" steps={PayRunSteps} />
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
});

export default connect(mapStateToProps)(PayRunListEmployees);
