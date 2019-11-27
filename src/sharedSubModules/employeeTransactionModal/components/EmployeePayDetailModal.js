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
  getModalEmployeeDetails,
} from '../EmployeeTransactionModalSelectors';
import DeleteButtonWithPopover from './DeleteButtonWithPopover';
import EmployeePayDetailModalTable from './EmployeePayDetailModalTable';
import LoadingPageState from '../../../components/LoadingPageState/LoadingPageState';

const footerStyle = {
  background: '#F3F4F5',
  borderTop: '1px solid #DCDFE1',
  padding: '16px',
};

const EmployeePayDetailModal = ({
  onBackButtonClick,
  onDeleteButtonClick,
  employeeDetails,
  isLoading,
  onDeletePopoverDelete,
  onDeletePopoverCancel,
  deletePopoverIsOpen,
  employeeName,
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

  const netPayStyle = {
    float: 'right',
    padding: '1.5rem',
  };
  const netPayLabelStyle = {
    paddingRight: '3rem',
  };

  const modalDetail = (
    <>
      <DetailHeader primary={primary} secondary={secondary} />
      <Separator />
      <EmployeePayDetailModalTable payItemGroups={lines} />
      <h4 style={netPayStyle}>
        <span style={netPayLabelStyle}>Total net payment:</span>
        <span>{totalNetPayment}</span>
      </h4>
    </>
  );

  return (
    <Modal title={employeeName} size="large" onCancel={onBackButtonClick} focusTrapPaused>
      <meta data-testid="pay-detail-modal" />
      <Modal.Body>
        {isLoading ? <LoadingPageState /> : modalDetail}
      </Modal.Body>
      <div style={footerStyle}>
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
});

export default connect(mapStateToProps)(EmployeePayDetailModal);
