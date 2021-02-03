import { Button, ButtonRow } from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';

import { getIsBusinessOnboarded } from '../../PayRunSelectors';

const RecordPayRunActions = ({
  onRecordButtonClick,
  onViewPayrollVerifyReportClick,
  onPreviousButtonClick,
  isBusinessOnboarded,
  isPaydayFilingEnabled,
}) => (
  <ButtonRow
    primary={[
      <Button
        key="payrollVerificationReport"
        name="payrollVerificationReport"
        type="secondary"
        testid="payrollVerificationReport"
        onClick={onViewPayrollVerifyReportClick}
      >
        View payroll verification report
      </Button>,
      <Button
        key="previous"
        name="previous"
        type="secondary"
        onClick={onPreviousButtonClick}
        testid="previousButton"
      >
        Previous
      </Button>,
      !isPaydayFilingEnabled || isBusinessOnboarded ? (
        <Button
          key="save"
          name="save"
          type="primary"
          onClick={onRecordButtonClick}
          testid="saveButton"
        >
          Record
        </Button>
      ) : (
        <Button
          key="saveWithoutFiling"
          name="saveWithoutFiling"
          type="primary"
          onClick={onRecordButtonClick}
          testid="saveWithoutFilingButton"
        >
          Record pay run without filing with IR
        </Button>
      ),
    ]}
  />
);

const mapStateToProps = (state) => ({
  isBusinessOnboarded: getIsBusinessOnboarded(state),
});

export default connect(mapStateToProps)(RecordPayRunActions);
