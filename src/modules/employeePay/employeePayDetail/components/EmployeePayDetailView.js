import {
  Alert,
  BaseTemplate,
  Button,
  ButtonRow,
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
  onReverseButtonClick,
  onRecordReversalButtonClick,
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
    isReversalPreview,
    isDeletable,
    isRejected,
    isPending,
  } = employeePay;

  const infoReversal = isReversalPreview && (
    <Alert type="info" testid="reversalInfoMsg">
      This pay has been reported to the ATO for Single Touch Payroll. When you
      record the reversal, you will have to report it to STP for reporting
      purposes.
    </Alert>
  );

  const pendingAlertMessage = isPending && (
    <Alert type="warning" testid="pending-alert-message-id">
      This pay is still processing to the ATO for Single Touch Payroll
      reporting. If you need to reverse the pay, you will be able to, once it
      has processed. You can check the status of the pay in Single Touch Payroll
      reporting
    </Alert>
  );

  const rejectedAlertMessage = isRejected && (
    <Alert type="warning" testid="reject-alert-message-id">
      This pay was rejected by the ATO for Single Touch Payroll reporting. You
      can delete the pay, and the deletion does not need to be reported. We
      recommend fixing the reason for the rejection, so you don’t continue to
      have rejected reports.
      <a
        href="https://help.myob.com/wiki/x/M6hqAg"
        target="_blank"
        rel="noopener noreferrer"
      >
        Learn More
      </a>
    </Alert>
  );
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

  const modalButtons = isReversalPreview ? (
    <ButtonRow
      primary={[
        <Button
          testid="view-record-reverse-back-btn"
          type="secondary"
          onClick={onGoBackClick}
        >
          Cancel
        </Button>,
        <Button
          testid="view-record-reverse-btn"
          onClick={onRecordReversalButtonClick}
        >
          Record reversal
        </Button>,
      ]}
    />
  ) : (
    <EmployeePayDetailButtons
      onDeleteButtonClick={onDeleteButtonClick}
      onGoBackClick={onGoBackClick}
      onReverseButtonClick={onReverseButtonClick}
      onRecordReversalButtonClick={onRecordReversalButtonClick}
      showReverse={isReversible}
      showDelete={isDeletable}
    />
  );

  const view = (
    <BaseTemplate>
      {pendingAlertMessage}
      {rejectedAlertMessage}
      {alert}
      {infoReversal}
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
      {modalButtons}
    </BaseTemplate>
  );

  return <PageView loadingState={loadingState} view={view} />;
};

const mapStateToProps = (state) => ({
  loadingState: getLoadingState(state),
  employeePay: getEmployeePay(state),
  pageTitle: getPageTitle(state),
  electronicPaymentLink: getElectronicPaymentLink(state),
  alertMessage: getAlert(state),
  isDeleteModalOpen: getIsDeleteModalOpen(state),
});

export default connect(mapStateToProps)(EmployeePayDetailView);
