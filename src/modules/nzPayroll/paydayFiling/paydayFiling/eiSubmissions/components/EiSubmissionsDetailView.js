import {
  Aside,
  Button,
  ButtonRow,
  FormHorizontal,
  Icons,
  ReadOnly,
} from '@myob/myob-widgets';
import React from 'react';

import EiSubmissionsDetailedInformation from './EiSubmissionsDetailedInformation';
import EiSubmissionsStatusLabel from './EiSubmissionsStatusLabel';
import EiSubmissionsStatusMessage from './EiSubmissionsStatusMessage';
import PageView from '../../../../../../components/PageView/PageView';
import styles from './EiSubmissionsView.module.css';

const EiSubmissionsDetailView = ({
  onClose,
  payRun,
  onViewPayRunReportClick,
  shouldDisplaySubmissionInfo,
  showSubmitToIr = false,
  onSubmitToIrClick = () => {},
}) => {
  const actions = (
    <Aside.Actions>
      <Button
        testid="viewPayRunReportPdf"
        onClick={onViewPayRunReportClick}
        icon={<Icons.GenericDocument />}
        type="link"
      >
        View return (PDF)
      </Button>
    </Aside.Actions>
  );

  const statusLabel = payRun.status && (
    <EiSubmissionsStatusLabel status={payRun.status} size="small" />
  );

  const statusMessage = payRun.status && (
    <div className={styles.payRunStatusContainer}>
      <EiSubmissionsStatusMessage
        status={payRun.status.label}
        detail={payRun.detail}
        responseCode={payRun.responseCode}
      />
    </div>
  );

  const resubmitAction = showSubmitToIr && (
    <ButtonRow>
      <Button
        type="primary"
        onClick={onSubmitToIrClick}
        testid="submitToIrTestId"
      >
        Submit to Inland Revenue
      </Button>
    </ButtonRow>
  );

  const submissionInfo = shouldDisplaySubmissionInfo && (
    <EiSubmissionsDetailedInformation
      username={payRun.username}
      submissionKey={payRun.submissionKey}
    />
  );

  const header = (
    <Aside.Header actions={actions}>
      <Aside.Title className={styles.payRunDetailTitle}>
        Submitted to IR&nbsp;
        {statusLabel}
      </Aside.Title>
      <Aside.Button
        onClick={onClose}
        icon={<Icons.Cross />}
        testid="onCloseTestId"
      >
        esc
      </Aside.Button>
    </Aside.Header>
  );

  const view = (
    <>
      {statusMessage}
      <hr />
      <div>
        {submissionInfo}

        <h3>Pay run</h3>
        <FormHorizontal testid="payRunInfoForm">
          <ReadOnly label="Pay period" name="payPeriod">
            {payRun.payPeriod}
          </ReadOnly>
          <ReadOnly label="Pay on date" name="payOnDate">
            {payRun.payOnDate}
          </ReadOnly>
          <ReadOnly label="Date recorded" name="dateRecorded">
            {payRun.dateRecorded}
          </ReadOnly>
          <ReadOnly label="Employees" name="employeesCount">
            {payRun.employeeCount}
          </ReadOnly>
          <ReadOnly label="Gross payments ($)" name="totalGross">
            {payRun.totalGross}
          </ReadOnly>
          <ReadOnly label="PAYE and/or schedular tax ($)" name="totalPaye">
            {payRun.totalPaye}
          </ReadOnly>
        </FormHorizontal>
      </div>
      <hr />
      {resubmitAction}
    </>
  );

  return (
    <Aside header={header}>
      <PageView view={view} />
    </Aside>
  );
};

export default EiSubmissionsDetailView;
