import {
  Alert,
  BaseTemplate,
  Card,
  PageHead,
  Separator,
} from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';

import {
  getAlert,
  getDisplayDeleteModal,
  getEmployeePay,
  getLoadingState,
  getPageTitle,
} from '../EmployeePayDetailSelectors';
import DeleteConfirmationModal from './DeleteConfirmationModal';
import EmployeePayDetailButtons from './EmployeePayDetailButtons';
import EmployeePayDetailHeader from './EmployeePayDetailHeader';
import EmployeePayDetailTable from './EmployeePayDetailTable';
import PageView from '../../../../../components/PageView/PageView';
import styles from './EmployeePayDetailView.module.css';

const EmployeePayDetailView = ({
  loadingState,
  onGoBackClick,
  onDeleteClick,
  displayDeleteConfirmation = false,
  confirmModalListeners,
  employeePay,
  pageTitle,
  alert,
  onDismissAlertClick,
}) => {
  const {
    paymentMethod,
    payPeriodStart,
    payPeriodEnd,
    dateOfPayment,
    referenceNumber,
    accountName,
    balance,
    employeeBankStatementDesc,
    transactionDesc,
    lines,
    totalNetPayment,
  } = employeePay;

  const totalsFooter = (
    <div className={styles.footerContainer}>
      <h3>
        <span className={styles.netPayLabel}>Total net payment</span>
        <span>{totalNetPayment}</span>
      </h3>
    </div>
  );

  const deleteConfirmationModal = displayDeleteConfirmation && (
    <DeleteConfirmationModal confirmModalListeners={confirmModalListeners} />
  );

  const modalButtons = (
    <EmployeePayDetailButtons
      onGoBackClick={onGoBackClick}
      onDeleteClick={onDeleteClick}
    />
  );

  const alertComponent = alert && (
    <Alert type={alert.type} onDismiss={onDismissAlertClick}>
      {alert.message}
    </Alert>
  );

  const view = (
    <BaseTemplate>
      {alertComponent}
      <PageHead title={pageTitle} />
      <Card footer={totalsFooter}>
        <EmployeePayDetailHeader
          paymentMethod={paymentMethod}
          accountName={accountName}
          balance={balance}
          employeeBankStatementDesc={employeeBankStatementDesc}
          transactionDesc={transactionDesc}
          payPeriodStart={payPeriodStart}
          payPeriodEnd={payPeriodEnd}
          dateOfPayment={dateOfPayment}
          referenceNumber={referenceNumber}
        />
        <Separator />
        <EmployeePayDetailTable payItemGroups={lines} />
      </Card>
      {modalButtons}
      {deleteConfirmationModal}
    </BaseTemplate>
  );

  return <PageView loadingState={loadingState} view={view} />;
};

const mapStateToProps = (state) => ({
  loadingState: getLoadingState(state),
  employeePay: getEmployeePay(state),
  pageTitle: getPageTitle(state),
  displayDeleteConfirmation: getDisplayDeleteModal(state),
  alert: getAlert(state),
});

export default connect(mapStateToProps)(EmployeePayDetailView);
