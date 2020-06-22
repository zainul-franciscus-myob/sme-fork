import {
  Alert,
  BaseTemplate,
  Card,
  Icons,
  PageHead,
  Separator,
} from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';

import {
  getAlert,
  getElectronicPaymentLink,
  getEmployeePay,
  getIsDeleteModalOpen,
  getLoadingState,
  getPageTitle,
} from '../EmployeePayDetailSelectors';
import DeleteModal from '../../../../components/modal/DeleteModal';
import EmployeePayDetailButtons from './EmployeePayDetailButtons';
import EmployeePayDetailHeader from './EmployeePayDetailHeader';
import EmployeePayDetailTable from './EmployeePayDetailTable';
import PageView from '../../../../components/PageView/PageView';
import styles from './EmployeePayDetailView.module.css';

const EmployeePayDetailView = ({
  loadingState,
  onGoBackClick,
  employeePay,
  pageTitle,
  electronicPaymentLink,
  alertMessage,
  onDismissAlert,
  isDeleteModalOpen,
  onDeleteButtonClick,
  onDeleteConfirmButtonClick,
  onDeleteCancelButtonClick,
  featureToggles,
}) => {
  const alert = alertMessage && (
    <Alert type="danger" onDismiss={onDismissAlert}>
      {alertMessage}
    </Alert>
  );

  const deleteModal = isDeleteModalOpen && (
    <DeleteModal
      title="Delete this transaction?"
      description="This can't be undone, or recovered later."
      onCancel={onDeleteCancelButtonClick}
      onConfirm={onDeleteConfirmButtonClick}
    />
  );

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
    parentBusinessEventId,
    parentBusinessEventDisplayId,
    isReversible,
  } = employeePay;

  const electronicPaymentFooter = (
    <p className={styles.electronicPaymentFooter}>
      <Icons.Dollar />
      <span className={styles.successColour}>
        &nbsp;Electronic payment recorded&nbsp;
      </span>
      Reference number&nbsp;
      <span>
        <a href={electronicPaymentLink}>{parentBusinessEventDisplayId}</a>
      </span>
    </p>
  );

  const totalsFooter = (
    <div className={styles.footerContainer}>
      <h3>
        <span className={styles.netPayLabel}>Total net payment</span>
        <span>{totalNetPayment}</span>
      </h3>
      {parentBusinessEventId && electronicPaymentFooter}
    </div>
  );

  const view = (
    <BaseTemplate>
      {alert}
      {deleteModal}
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
      <EmployeePayDetailButtons
        onDeleteButtonClick={onDeleteButtonClick}
        onGoBackClick={onGoBackClick}
        showReverse={featureToggles && featureToggles.isPayrollReversibleEnabled && isReversible}
      />
    </BaseTemplate>
  );

  return <PageView loadingState={loadingState} view={view} />;
};

const mapStateToProps = state => ({
  loadingState: getLoadingState(state),
  employeePay: getEmployeePay(state),
  pageTitle: getPageTitle(state),
  electronicPaymentLink: getElectronicPaymentLink(state),
  alertMessage: getAlert(state),
  isDeleteModalOpen: getIsDeleteModalOpen(state),
});

export default connect(mapStateToProps)(EmployeePayDetailView);
