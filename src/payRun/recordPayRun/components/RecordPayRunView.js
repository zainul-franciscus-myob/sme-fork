import { FieldGroup, PageHead } from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';

import { getNumberOfSelected } from '../RecordPayRunSelectors';
import EmployeePayHeader from '../../components/EmployeePayHeader';
import FormCard from '../../../components/FormCard/FormCard';
import RecordPayRunActions from './RecordPayRunActions';

const RecordPayRunView = ({
  numberOfSelected,
  onRecordButtonClick,
  onPreviousButtonClick,
}) => (
  <React.Fragment>
    <PageHead title="Record and report" />
    <EmployeePayHeader />
    <FormCard>
      <FieldGroup label={`Record pay for ${numberOfSelected} employees?`}>
        Once you&apos;ve recorded these payments, you&apos;ll need to authorise MYOB to send this
        information to the ATO as part of Single Touch Payroll.
      </FieldGroup>
    </FormCard>
    <RecordPayRunActions
      onRecordButtonClick={onRecordButtonClick}
      onPreviousButtonClick={onPreviousButtonClick}
    />
  </React.Fragment>
);

const mapStateToProps = state => ({
  numberOfSelected: getNumberOfSelected(state),
});

export default connect(mapStateToProps)(RecordPayRunView);
