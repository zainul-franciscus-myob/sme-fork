import { Aside, Button, ButtonRow, Icons } from '@myob/myob-widgets';
import React from 'react';

import EiSubmissionErrorMessage from './EiSubmissionErrorMessage';
import EiSubmissionsDetailedInformation from './EiSubmissionsDetailedInformation';
import EiSubmissionsPayrunDetails from './EiSubmissionsPayrunDetails';
import EiSubmissionsStatusLabel from './EiSubmissionsStatusLabel';
import EiSubmissionsStatusMessage from './EiSubmissionsStatusMessage';
import PageView from '../../../../../../../components/PageView/PageView';
import styles from '../EiSubmissionsView.module.css';

const EiSubmissionsDetailView = ({
  loadingState,
  onClose,
  payRun,
  onViewPayRunReportClick,
  shouldDisplaySubmissionInfo,
  showSubmitToIr = false,
  onSubmitToIrClick = () => {},
  detailsAlertMessage,
  onDismissDetailsAlert,
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

  const alertMessage = detailsAlertMessage && (
    <div className={styles.payRunStatusContainer}>
      <EiSubmissionErrorMessage
        onDismissAlert={onDismissDetailsAlert}
        alertMessage={detailsAlertMessage}
      />
    </div>
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

  const payRunDetails = <EiSubmissionsPayrunDetails payRun={payRun} />;

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
      {alertMessage}
      {statusMessage}
      <hr />
      <div className={styles.baseInformation}>
        {submissionInfo}
        {payRunDetails}
      </div>
      <hr />
      {resubmitAction}
    </>
  );

  return (
    <Aside header={header}>
      <PageView loadingState={loadingState} view={view} />
    </Aside>
  );
};

export default EiSubmissionsDetailView;
