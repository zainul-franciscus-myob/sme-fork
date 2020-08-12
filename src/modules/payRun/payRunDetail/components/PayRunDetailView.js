import {
  Alert,
  BaseTemplate,
  Button,
  ButtonRow,
  Card,
  PageHead,
} from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';

import {
  getAlert,
  getIsReversal,
  getLoadingState,
} from '../payRunDetailSelector';
import PageView from '../../../../components/PageView/PageView';
import PayRunDetailHeader from './PayRunDetailHeader';
import PayRunEmployees from './PayRunEmployees';

const PayRunDetailView = ({
  loadingState,
  setSelectedTab,
  emailTabListeners,
  printTabListeners,
  onBackButtonClick,
  onEmployeeNameClick,
  exportPdf,
  alert,
  onDismissAlert,
  isReversal,
}) => {
  const alertComponent = alert && (
    <Alert type={alert.type} onDismiss={onDismissAlert}>
      {alert.message}
    </Alert>
  );

  const employeeCard = (
    <Card>
      <PayRunEmployees
        setSelectedTab={setSelectedTab}
        emailTabListeners={emailTabListeners}
        printTabListeners={printTabListeners}
        onEmployeeNameClick={onEmployeeNameClick}
        exportPdf={exportPdf}
        isReversal={isReversal}
      />
    </Card>
  );

  const payRunDetailView = (
    <BaseTemplate>
      {alertComponent}
      {isReversal ? (
        <PageHead title="Reversed pay details" />
      ) : (
        <PageHead title="Pay run details" />
      )}
      <PayRunDetailHeader />
      {employeeCard}
      <ButtonRow>
        <Button type="secondary" onClick={onBackButtonClick}>
          Go back
        </Button>
      </ButtonRow>
    </BaseTemplate>
  );

  return <PageView loadingState={loadingState} view={payRunDetailView} />;
};

const mapStateToProps = (state) => ({
  loadingState: getLoadingState(state),
  alert: getAlert(state),
  isReversal: getIsReversal(state),
});

export default connect(mapStateToProps)(PayRunDetailView);
