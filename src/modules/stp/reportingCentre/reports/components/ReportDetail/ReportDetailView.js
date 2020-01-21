import {
  Aside, Button, ButtonRow, Icons,
} from '@myob/myob-widgets';
import React from 'react';

import AbnMismatch from './AbnMismatch';
import BaseInformation from './BaseInformation';
import EmployeeErrorsList from './EmployeeErrorsList';
import EmployerErrorsList from './EmployerErrorsList';
import PageView from '../../../../../../components/PageView/PageView';
import PayRunErrorsList from './PayRunErrorsList';
import ReportsStatusLabel from '../ReportsStatusLabel';
import StatusMessage from './StatusMessage';
import styles from './ReportDetailView.module.css';

const ReportDetailView = ({
  loadingState,
  payEvent: {
    status,
    declaredBy,
    declarationDate,
    eventType,
    payPeriod,
    paymentDate,
    recordedDate,
    employeeCount,
    gross,
    tax,
    payRunErrors,
    employerErrors,
    employeeErrors,
    mismatchedAbns,
  },
  onClose,
  showDeclareAction,
  onDeclare,
}) => {
  const actions = (
    <Aside.Actions>
      <Button icon={<Icons.GenericDocument />} type="link">View Employee YTD report (PDF)</Button>
    </Aside.Actions>
  );

  const statusLabel = status && (
    <ReportsStatusLabel status={status} size="small" />
  );

  const statusMessage = status && (
    <div className={styles.statusContainer}>
      <StatusMessage status={status.label} />
    </div>
  );

  const header = (
    <Aside.Header actions={actions}>
      <Aside.Title className={styles.vCentre}>
        STP report status&nbsp;
        {statusLabel}
      </Aside.Title>
      <Aside.Button onClick={onClose} icon={<Icons.Cross />}>
        esc
      </Aside.Button>
    </Aside.Header>
  );

  const payRunErrorsList = payRunErrors && (
    <PayRunErrorsList errors={payRunErrors} />
  );

  const employerErrorsList = employerErrors && (
    <EmployerErrorsList errors={employerErrors} />
  );

  const employeeErrorsList = employeeErrors && (
    <EmployeeErrorsList employeeErrors={employeeErrors} />
  );

  const abnMismatch = mismatchedAbns && (
    <AbnMismatch mismatchedAbns={mismatchedAbns} />
  );

  const declarationAction = showDeclareAction && (
    <ButtonRow>
      <Button type="primary" onClick={onDeclare}>Send to ATO</Button>
    </ButtonRow>
  );

  const view = (
    <>
      {statusMessage}
      {payRunErrorsList}
      {employerErrorsList}
      {employeeErrorsList}
      {abnMismatch}
      <hr />
      <BaseInformation
        declaredBy={declaredBy}
        declarationDate={declarationDate}
        eventType={eventType}
        payPeriod={payPeriod}
        paymentDate={paymentDate}
        recordedDate={recordedDate}
        employeeCount={employeeCount}
        gross={gross}
        tax={tax}
      />
      <hr />
      {declarationAction}
    </>
  );

  return (
    <Aside header={header} className={styles.aside}>
      <PageView loadingState={loadingState} view={view} />
    </Aside>
  );
};

export default ReportDetailView;
