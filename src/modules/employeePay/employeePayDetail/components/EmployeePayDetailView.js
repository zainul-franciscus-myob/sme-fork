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
    isReversalPreview,
    stpAlertMessage,
    isDeletable,
  } = employeePay;

  const infoReversal = isReversalPreview && (
    <Alert type="info" testid="reversalInfoMsg">
      This pay has been reported to the ATO for Single Touch Payroll. When you
      record the reversal, you will have to report it to STP for reporting
      purposes.
    </Alert>
  );

  const alertStpAlertMessage = featureToggles &&
    featureToggles.isPayrollReversibleEnabled &&
    stpAlertMessage && (
      <Alert type="warning" testid="stp-alert-message-id">
        {stpAlertMessage}
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
      showReverse={
        featureToggles &&
        featureToggles.isPayrollReversibleEnabled &&
        isReversible
      }
      showDelete={isDeletable}
    />
  );

  const view = (
    <BaseTemplate>
      {alertStpAlertMessage}
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
