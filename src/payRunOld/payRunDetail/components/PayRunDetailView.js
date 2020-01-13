import {
  BaseTemplate,
  Button,
  ButtonRow,
  Card,
  PageHead,
} from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';

import { getLoadingState } from '../payRunDetailSelector';
import PageView from '../../../components/PageView/PageView';
import PayRunDetailHeader from './PayRunDetailHeader';
import PayRunEmployees from './PayRunEmployees';

const PayRunDetailView = ({
  loadingState,
  setSelectedTab,
  emailTabListeners,
  printTabListeners,
  onBackButtonClick,
  onEmployeeNameClick,
  employeePayModal,
  emailPaySlipModal,
  exportPdf,
}) => {
  const employeeCard = (
    <Card>
      <PayRunEmployees
        setSelectedTab={setSelectedTab}
        emailTabListeners={emailTabListeners}
        printTabListeners={printTabListeners}
        onEmployeeNameClick={onEmployeeNameClick}
        exportPdf={exportPdf}
      />
    </Card>
  );

  const payRunDetailView = (
    <BaseTemplate>
      {employeePayModal}
      {emailPaySlipModal}
      <PageHead title="Pay run details" />
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

const mapStateToProps = state => ({
  loadingState: getLoadingState(state),
});

export default connect(mapStateToProps)(PayRunDetailView);
