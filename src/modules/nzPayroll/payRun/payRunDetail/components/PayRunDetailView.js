import {
  BaseTemplate,
  Button,
  ButtonRow,
  Card,
  PageHead,
} from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';

import { getLoadingState } from '../payRunDetailNzSelector';
import PageView from '../../../../../components/PageView/PageView';
import PayRunDetailEmployeesTable from './PayRunDetailEmployeesTable';
import PayRunDetailHeader from './PayRunDetailHeader';

const PayRunDetailView = ({ loadingState, onBack }) => {
  const employeeCard = (
    <Card>
      <PayRunDetailEmployeesTable />
    </Card>
  );

  const payRunDetailView = (
    <BaseTemplate>
      <PageHead title="Pay run details" />
      <PayRunDetailHeader />
      {employeeCard}
      <ButtonRow>
        <Button name="goBackButton" type="secondary" onClick={onBack}>
          Go back
        </Button>
      </ButtonRow>
    </BaseTemplate>
  );

  return <PageView loadingState={loadingState} view={payRunDetailView} />;
};

const mapStateToProps = (state) => ({
  loadingState: getLoadingState(state),
});

export default connect(mapStateToProps)(PayRunDetailView);
