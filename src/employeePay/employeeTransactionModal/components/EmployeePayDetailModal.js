import {
  Button,
  ButtonRow,
  DetailHeader,
  Modal,
  ReadOnly,
  Separator,
} from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';

import {
  getDeletePopoverIsOpen,
  getEmployeeName,
  getIsLoading,
  getIsModalOpen,
  getModalEmployeeDetails,
} from '../EmployeeTransactionModalSelectors';
import DeleteButtonWithPopover from './DeleteButtonWithPopover';
import EmployeePayDetailModalTable from './EmployeePayDetailModalTable';
import LoadingPageState from '../../../components/LoadingPageState/LoadingPageState';
import style from './EmployeePayDetailModal.module.css';

const EmployeePayDetailModal = ({
  onBackButtonClick,
  onDeleteButtonClick,
  employeeDetails,
  isLoading,
  onDeletePopoverDelete,
  onDeletePopoverCancel,
  deletePopoverIsOpen,
  employeeName,
  isOpen,
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
  } = employeeDetails;

  if (!isOpen) {
    return null;
  }

  const primary = (
    <>
      <ReadOnly label="Payment Method" name="paymentMethod">
        {paymentMethod}
      </ReadOnly>
      <ReadOnly label="Account" name="account">
        {accountName}
      </ReadOnly>
      <ReadOnly label="Balance" name="balance">
        {balance}
      </ReadOnly>
      <ReadOnly label="Description on employee's bank statement" name="employeeBankStatementDesc">
        {employeeBankStatementDesc}
      </ReadOnly>
      <ReadOnly label="Description of transaction" name="transactionDesc">
        {transactionDesc}
      </ReadOnly>
    </>
  );

  const secondary = (
    <>
      <ReadOnly label="Pay period start" name="payPeriodStart">
        {payPeriodStart}
      </ReadOnly>
      <ReadOnly label="Pay period end" name="payPeriodEnd">
        {payPeriodEnd}
      </ReadOnly>
      <ReadOnly label="Date of payment" name="dateOfPayment">
        {dateOfPayment}
      </ReadOnly>
      <ReadOnly label="Reference number" name="referenceNumber">
        {referenceNumber}
      </ReadOnly>
    </>
  );

  const modalDetail = (
    <>
      <DetailHeader primary={primary} secondary={secondary} />
      <Separator />
      <EmployeePayDetailModalTable payItemGroups={lines} />
      <div className={style.textContainer}>
        <h4>
          <span className={style.netPayLabel}>Total net payment:</span>
          <span>{totalNetPayment}</span>
        </h4>
      </div>
    </>
  );

  return (
    <Modal title={employeeName} size="large" onCancel={onBackButtonClick} focusTrapPaused>
      <meta data-testid="pay-detail-modal" />
      <Modal.Body>
        {isLoading ? <LoadingPageState /> : modalDetail}
      </Modal.Body>
      <div className={style.footerStyle}>
        <ButtonRow
          secondary={[
            <DeleteButtonWithPopover
              key="delete"
              title="Delete employee's pay transaction"
              bodyText="This can't be undone, or recovered later."
              onDelete={onDeletePopoverDelete}
              onCancel={onDeletePopoverCancel}
              isOpen={deletePopoverIsOpen}
              openHandler={onDeleteButtonClick}
            />,
          ]}
          primary={[
            <Button
              key="modal-go-back-btn"
              id="modal-go-back-btn"
              type="secondary"
              onClick={onBackButtonClick}
            >
              Go back
            </Button>,
          ]}
        />
      </div>
    </Modal>
  );
};

const mapStateToProps = state => ({
  employeeDetails: getModalEmployeeDetails(state),
  isLoading: getIsLoading(state),
  employeeName: getEmployeeName(state),
  deletePopoverIsOpen: getDeletePopoverIsOpen(state),
  isOpen: getIsModalOpen(state),
});

export default connect(mapStateToProps)(EmployeePayDetailModal);