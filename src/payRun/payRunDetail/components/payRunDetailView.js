import {
  BaseTemplate,
  Button,
  ButtonRow,
  Card,
  PageHead,
} from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';

import { getIsLoading } from '../../payRunList/payRunListSelectors';
import PageView from '../../../components/PageView/PageView';
import PayRunDetailHeader from './PayRunDetailHeader';
import PayRunEmployees from './PayRunEmployees';

const PayRunDetailView = ({
  isLoading,
  setSelectedTab,
  emailTabListeners,
  printTabListeners,
  onBackButtonClick,
}) => {
  const employeeCard = (
    <Card>
      <PayRunEmployees
        setSelectedTab={setSelectedTab}
        emailTabListeners={emailTabListeners}
        printTabListeners={printTabListeners}
      />
    </Card>
  );

  const payRunDetailView = (
    <BaseTemplate>
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

  return <PageView isLoading={isLoading} view={payRunDetailView} />;
};

const mapStateToProps = state => ({
  isLoading: getIsLoading(state),
});

export default connect(mapStateToProps)(PayRunDetailView);
