import {
  Alert,
  BaseTemplate, Button, ButtonRow, Card, PageHead,
} from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';

import {
  getAlert,
  getAllSelectedStatus,
  getEmployeeName,
  getLoadingState,
  getPays,
} from '../EtpSelector';
import PageView from '../../../../../components/PageView/PageView';
import PaysTable from './PaysTable';

const EtpView = ({
  loadingState,
  alert,
  name,
  selectedStatus,
  pays,
  onDismissAlert,
  onSelectAll,
  onRowSelect,
  onCancelClick,
  onRemoveClick,
}) => {
  const alertComponent = alert && (
    <Alert type={alert.type} onDismiss={onDismissAlert}>
      {alert.message}
    </Alert>
  );

  const cardBody = (
    <>
      <h2>Employment termination payments (ETP)</h2>
      <p>
        Select one of all Employees termination payments to remove. You&apos;ll also need to
        change or delete each pay that contains a deleted ETP transaction.
      </p>
      <PaysTable
        selectedStatus={selectedStatus}
        pays={pays}
        onSelectAll={onSelectAll}
        onRowSelect={onRowSelect}
      />
    </>
  );

  const actions = (
    <ButtonRow>
      <Button type="secondary" onClick={onCancelClick}>Cancel</Button>
      <Button type="primary" onClick={onRemoveClick}>Remove and notify the ATO</Button>
    </ButtonRow>
  );

  const view = (
    <BaseTemplate>
      {alertComponent}
      <PageHead title={name} />
      <Card body={cardBody} />
      {actions}
    </BaseTemplate>
  );

  return <PageView loadingState={loadingState} view={view} />;
};

const mapStateToProps = state => ({
  loadingState: getLoadingState(state),
  alert: getAlert(state),
  name: getEmployeeName(state),
  selectedStatus: getAllSelectedStatus(state),
  pays: getPays(state),
});

export default connect(mapStateToProps)(EtpView);
