import {
  BaseTemplate,
  Button,
  ButtonRow,
  Card,
  PageHead,
} from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';

import {
  getDeletePopoverIsOpen,
  getEmployeeDetailModal,
  getIsModalLoading,
  getModalEmployeeDetails,
} from '../payRunDetailSelector';
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
  onEmployeeNameClick,
  modal,
  employeeTransactionModal,
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
      <PageHead title="Pay run details" />
      <PayRunDetailHeader />
      {employeeCard}
      <ButtonRow>
        <Button type="secondary" onClick={onBackButtonClick}>
          Go back
        </Button>
      </ButtonRow>
      {
        modal && employeeTransactionModal
      }
    </BaseTemplate>
  );

  return <PageView isLoading={isLoading} view={payRunDetailView} />;
};

const mapStateToProps = state => ({
  isLoading: getIsLoading(state),
  isModalLoading: getIsModalLoading(state),
  employeeDetails: getModalEmployeeDetails(state),
  modal: getEmployeeDetailModal(state),
  deletePopoverIsOpen: getDeletePopoverIsOpen(state),
});

export default connect(mapStateToProps)(PayRunDetailView);
