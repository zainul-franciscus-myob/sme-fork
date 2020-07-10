import { Alert, BaseTemplate, Card, PageHead } from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';

import {
  getAccount,
  getAlert,
  getBalance,
  getBankStatementDescription,
  getDateOfPayment,
  getIsDeleteModalOpen,
  getLoadingState,
  getPageTitle,
  getReferenceNumber,
  getTableEntries,
  getTotalPayment,
  getTransactionDescription,
} from '../ElectronicPaymentsReadSelector';
import DeleteModal from '../../../../components/modal/DeleteModal';
import ElectronicPaymentsReadButtons from './ElectronicPaymentsReadButtons';
import ElectronicPaymentsReadHeader from './ElectronicPaymentsReadHeader';
import ElectronicPaymentsReadTable from './ElectronicPaymentsReadTable';
import PageView from '../../../../components/PageView/PageView';
import styles from './ElectronicPaymentsReadView.module.css';

const ElectronicPaymentsReadView = ({
  pageTitle,
  loadingState,
  electronicPayments,
  account,
  balance,
  transactionDescription,
  referenceNumber,
  dateOfPayment,
  bankStatementDescription,
  totalPayment,
  alertMessage,
  isDeleteModalOpen,
  onGoBackClick,
  onDeleteButtonClick,
  onDeleteConfirmButtonClick,
  onDeleteCancelButtonClick,
  onDismissAlert,
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

  const totalPaymentFooter = (
    <div className={styles.totalPaymentsFooter}>
      <h3>
        <span className={styles.totalPaymentsFooterLabel}>Total payment</span>
        <span>{totalPayment}</span>
      </h3>
    </div>
  );

  const view = (
    <BaseTemplate>
      {alert}
      {deleteModal}
      <PageHead title={pageTitle} />
      <Card footer={totalPaymentFooter}>
        <ElectronicPaymentsReadHeader
          account={account}
          balance={balance}
          transactionDescription={transactionDescription}
          referenceNumber={referenceNumber}
          dateOfPayment={dateOfPayment}
          bankStatementDescription={bankStatementDescription}
        />
        <ElectronicPaymentsReadTable electronicPayments={electronicPayments} />
      </Card>
      <ElectronicPaymentsReadButtons
        onGoBackClick={onGoBackClick}
        onDeleteButtonClick={onDeleteButtonClick}
      />
    </BaseTemplate>
  );

  return <PageView loadingState={loadingState} view={view} />;
};

const mapStateToProps = (state) => ({
  pageTitle: getPageTitle(state),
  loadingState: getLoadingState(state),
  electronicPayments: getTableEntries(state),
  account: getAccount(state),
  balance: getBalance(state),
  transactionDescription: getTransactionDescription(state),
  referenceNumber: getReferenceNumber(state),
  dateOfPayment: getDateOfPayment(state),
  bankStatementDescription: getBankStatementDescription(state),
  totalPayment: getTotalPayment(state),
  alertMessage: getAlert(state),
  isDeleteModalOpen: getIsDeleteModalOpen(state),
});

export default connect(mapStateToProps)(ElectronicPaymentsReadView);
