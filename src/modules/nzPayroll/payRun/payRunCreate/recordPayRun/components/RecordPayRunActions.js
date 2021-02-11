import { Button, ButtonRow } from '@myob/myob-widgets';
import React from 'react';

import MainActionType from './RecordPayRunMainActionType';

const createMainActionButton = (key, name, type, onClick, testid, display) => (
  <Button key={key} name={name} type={type} onClick={onClick} testid={testid}>
    {display}
  </Button>
);

const RecordPayRunActions = ({
  onMainActionButtonClick,
  onViewPayrollVerifyReportClick,
  onPreviousButtonClick,
  mainActionType,
}) => {
  let mainActionButton;

  switch (mainActionType) {
    case MainActionType.NEXT:
      mainActionButton = createMainActionButton(
        'next',
        'next',
        'primary',
        onMainActionButtonClick,
        'nextButton',
        'Next'
      );
      break;
    case MainActionType.RECORD_WITHOUT_FILING:
      mainActionButton = createMainActionButton(
        'recordWithoutFiling',
        'recordWithoutFiling',
        'primary',
        onMainActionButtonClick,
        'recordWithoutFilingButton',
        'Record without filing with IR'
      );
      break;
    case MainActionType.RECORD:
    default:
      mainActionButton = createMainActionButton(
        'record',
        'record',
        'primary',
        onMainActionButtonClick,
        'recordButton',
        'Record'
      );
      break;
  }

  return (
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
        mainActionButton,
      ]}
    />
  );
};

export default RecordPayRunActions;
