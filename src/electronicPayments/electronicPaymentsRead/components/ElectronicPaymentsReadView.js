import {
  BaseTemplate,
  ButtonRow,
  Card,
  PageHead,
} from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';

import { formatCurrency } from '../../../banking/bankingSelectors';
import {
  getAlert,
  getBankStatementDescription,
  getDateOfPayment,
  getElectronicPayments,
  getIsLoading,
  getIsTableLoading,
  getModal,
  getOrder,
  getReferenceNumber,
  getTransactionDescription,
} from '../../ElectronicPaymentsSelector';
import Button from '../../../components/Button/Button';
import ElectronicPaymentsReadDetailHeader from './ElectronicPaymentsReadDetailHeader';
import ElectronicPaymentsTable from '../../ElectronicPaymentsTable';
import styles from '../../ElectronicPayments.module.css';

const ElectronicPaymentsReadView = ({
  electronicPayments,
  isTableLoading,
  account,
  balance,
  transactionDescription,
  referenceNumber,
  dateOfPayment,
  bankStatementDescription,
  onSort,
  order,
  onGoBackClick,
  totalPayment,
}) => {
  const totalPaymentFooter = (
    <div className={styles.totalPaymentsFooter}>
      <h4>
        <span className={styles.totalPaymentsFooterLabel}>Total payment</span>
        <span>{totalPayment}</span>
      </h4>
    </div>
  );

  const view = (
    <BaseTemplate>
      <PageHead title="Create bank file to pay employees" />
      <Card
        footer={totalPaymentFooter}
      >
        <ElectronicPaymentsReadDetailHeader
          account={account}
          balance={balance}
          transactionDescription={transactionDescription}
          referenceNumber={referenceNumber}
          dateOfPayment={dateOfPayment}
          bankStatementDescription={bankStatementDescription}
        />
        <ElectronicPaymentsTable
          electronicPayments={electronicPayments}
          onSort={onSort}
          isTableLoading={isTableLoading}
          order={order}
        />
      </Card>
      <ButtonRow>
        <Button type="secondary" onClick={onGoBackClick}>
        Go back
        </Button>
        <Button type="secondary" onClick={() => { }}>
        Delete
        </Button>
      </ButtonRow>
    </BaseTemplate>
  );

  return view;
};

const getAccount = state => state.account;
const getBalance = state => state.balance;
export const getTotalPayment = (state) => {
  const selectedAmountList = state.electronicPayments.map(e => e.amount);
  const totalPayment = selectedAmountList
    .reduce((paymentOne, paymentTwo) => (paymentOne + paymentTwo), 0);
  return formatCurrency(totalPayment);
};

const mapStateToProps = state => ({
  isLoading: getIsLoading(state),
  electronicPayments: getElectronicPayments(state),
  account: getAccount(state),
  balance: getBalance(state),
  totalPayment: getTotalPayment(state),
  order: getOrder(state),
  isTableLoading: getIsTableLoading(state),
  alert: getAlert(state),
  transactionDescription: getTransactionDescription(state),
  referenceNumber: getReferenceNumber(state),
  dateOfPayment: getDateOfPayment(state),
  bankStatementDescription: getBankStatementDescription(state),
  modal: getModal(state),
});

export default connect(mapStateToProps)(ElectronicPaymentsReadView);
