import {
  Icons,
  Modal,
  Separator,
} from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';

import {
  getDeletePopoverIsOpen,
  getElectronicPaymentLink,
  getEmployeeName,
  getEmployeePay,
  getIsModalOpen,
  getLoadingState,
} from '../EmployeePayModalSelectors';
import EmployeePayModalButtons from './EmployeePayModalButtons';
import EmployeePayModalHeader from './EmployeePayModalHeader';
import EmployeePayModalTable from './EmployeePayModalTable';
import PageView from '../../../../components/PageView/PageView';
import styles from './EmployeePayModal.module.css';

const EmployeePayModal = ({
  onBackButtonClick,
  onDeleteButtonClick,
  employeePay,
  loadingState,
  onDeletePopoverDelete,
  onDeletePopoverCancel,
  deletePopoverIsOpen,
  employeeName,
  isOpen,
  electronicPaymentLink,
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
  } = employeePay;

  if (!isOpen) {
    return null;
  }

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
          onBackButtonClick={onBackButtonClick}
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
});

export default connect(mapStateToProps)(EmployeePayModal);
