import {
  Alert, Icons, Modal, Separator,
} from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';

import {
  getAlert,
  getDeletePopoverIsOpen,
  getElectronicPaymentLink,
  getEmployeeName,
  getEmployeePay,
  getIsModalOpen,
  getLoadingState,
  getReadonly,
} from '../EmployeePayModalSelectors';
import EmployeePayModalButtons from './EmployeePayModalButtons';
import EmployeePayModalHeader from './EmployeePayModalHeader';
import EmployeePayModalTable from './EmployeePayModalTable';
import LoadingState from '../../../../components/PageView/LoadingState';
import PageView from '../../../../components/PageView/PageView';
import styles from './EmployeePayModal.module.css';

const EmployeePayModal = ({
  onBackButtonClick,
  onDeleteButtonClick,
  onReverseButtonClick,
  employeePay,
  loadingState,
  onDeletePopoverDelete,
  onDeletePopoverCancel,
  deletePopoverIsOpen,
  employeeName,
  isOpen,
  electronicPaymentLink,
  alertMessage,
  onDismissAlert,
  featureToggles,
  isReadonly,
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
    parentBusinessEventId,
    parentBusinessEventDisplayId,
    isReversible,
    isReversalPreview,
  } = employeePay;

  if (!isOpen) {
    return null;
  }

  const alert = alertMessage && (
    <Alert type="danger" onDismiss={onDismissAlert}>
      {alertMessage}
    </Alert>
  );

  const infoReversal = isReversalPreview && (
    <Alert type="info" testid="reversalInfoMsg">
      This pay has been reported to the ATO for Single Touch Payroll.
      When you record the reversal, you will have to report it to STP for reporting purposes.
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

  const modalDetail = (
    <>
      {alert}
      {infoReversal}
      <EmployeePayModalHeader
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
      <EmployeePayModalTable payItemGroups={lines} />
      <div className={styles.footerContainer}>
        <h3>
          <span className={styles.netPayLabel}>Total net payment:</span>
          <span>{totalNetPayment}</span>
        </h3>
        {parentBusinessEventId && electronicPaymentFooter}
      </div>
    </>
  );

  return (
    <Modal title={employeeName} size="large" onCancel={onBackButtonClick} focusTrapPaused>
      <meta data-testid="pay-detail-modal" />
      <Modal.Body>
        <PageView loadingState={loadingState} view={modalDetail} />
      </Modal.Body>
      <div className={styles.modalButtons}>
        <EmployeePayModalButtons
          deletePopoverIsOpen={deletePopoverIsOpen}
          onDeletePopoverDelete={onDeletePopoverDelete}
          onDeletePopoverCancel={onDeletePopoverCancel}
          onDeleteButtonClick={onDeleteButtonClick}
          onReverseButtonClick={onReverseButtonClick}
          onBackButtonClick={onBackButtonClick}
          showReverse={featureToggles && featureToggles.isPayrollReversibleEnabled && isReversible}
          loadingSuccess={loadingState === LoadingState.LOADING_SUCCESS}
          isReversalPreview={isReversalPreview}
          isReadonly={isReadonly}
        />
      </div>
    </Modal>
  );
};

const mapStateToProps = state => ({
  employeePay: getEmployeePay(state),
  loadingState: getLoadingState(state),
  employeeName: getEmployeeName(state),
  deletePopoverIsOpen: getDeletePopoverIsOpen(state),
  isOpen: getIsModalOpen(state),
  electronicPaymentLink: getElectronicPaymentLink(state),
  alertMessage: getAlert(state),
  isReadonly: getReadonly(state),
});

export default connect(mapStateToProps)(EmployeePayModal);
