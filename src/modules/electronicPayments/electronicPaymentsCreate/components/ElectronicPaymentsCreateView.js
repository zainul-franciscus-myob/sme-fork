import {
  BaseTemplate,
  Card,
  PageHead,
} from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';

import {
  getAccounts,
  getAlert,
  getBalanceValue,
  getBankStatementDescription,
  getDateOfPayment,
  getFilterOptions,
  getIsBeforeStartOfFinancialYear,
  getIsTableLoading,
  getLoadingState,
  getModal,
  getOrder,
  getPaymentTypes,
  getReferenceNumber,
  getSelectedAccountId,
  getTableEntries,
  getTotalPayment,
  getTransactionDescription,
} from '../ElectronicPaymentsCreateSelector';
import ElectronicPaymentsCreateAlert from './ElectronicPaymentsCreateAlerts';
import ElectronicPaymentsCreateButtons from './ElectronicPaymentsCreateButtons';
import ElectronicPaymentsCreateFilter from './ElectronicPaymentsCreateFilter';
import ElectronicPaymentsCreateModals from './ElectronicPaymentsCreateModals';
import ElectronicPaymentsCreateTable from './ElectronicPaymentsCreateTable';
import ElectronicPaymentsDetailHeader from './ElectronicPaymentsCreateHeader';
import PageView from '../../../../components/PageView/PageView';
import styles from './ElectronicPaymentsCreateView.module.css';

const ElectronicPaymentsCreateView = ({
  alert,
  onDismissAlert,
  loadingState,
  onInputChange,
  transactionDescription,
  referenceNumber,
  dateOfPayment,
  bankStatementDescription,
  transactions,
  accounts,
  paymentTypes,
  onUpdateFilterBarOptions,
  onRecordAndDownloadBankFile,
  onAccountChange,
  selectedAccountId,
  balanceValue,
  selectAll,
  selectItem,
  order,
  onSort,
  totalPayment,
  isTableLoading,
  filterOptions: {
    paymentType,
    dateFrom,
    dateTo,
  },
  modal,
  onCancelButtonClick,
  onRecordButtonClick,
  onContinueButtonClick,
  isSpendMoneyEnabled,
  isBeforeStartOfFinancialYear,
}) => {
  const totalPaymentFooter = (
    <div className={styles.totalPaymentsFooter}>
      <h3>
        <span className={styles.totalPaymentsFooterLabel}>Total payment</span>
        <span>{totalPayment}</span>
      </h3>
    </div>
  );

  const modalComponent = modal && (
    <ElectronicPaymentsCreateModals
      modal={modal}
      onCancelButtonClick={onCancelButtonClick}
      onRecordButtonClick={onRecordButtonClick}
      onContinueButtonClick={onContinueButtonClick}
    />
  );

  const view = (
    <BaseTemplate>
      {modalComponent}
      <ElectronicPaymentsCreateAlert alert={alert} onDismissAlert={onDismissAlert} />
      <PageHead title="Record payment and download bank file" />
      <Card>
        <ElectronicPaymentsCreateFilter
          paymentTypes={paymentTypes}
          paymentType={paymentType}
          dateFrom={dateFrom}
          dateTo={dateTo}
          onUpdateFilterBarOptions={onUpdateFilterBarOptions}
          isSpendMoneyEnabled={isSpendMoneyEnabled}
        />
      </Card>
      <Card footer={totalPaymentFooter}>
        <ElectronicPaymentsDetailHeader
          accounts={accounts}
          selectedAccountId={selectedAccountId}
          onAccountChange={onAccountChange}
          balanceValue={balanceValue}
          onInputChange={onInputChange}
          transactionDescription={transactionDescription}
          referenceNumber={referenceNumber}
          dateOfPayment={dateOfPayment}
          bankStatementDescription={bankStatementDescription}
          isBeforeStartOfFinancialYear={isBeforeStartOfFinancialYear}
        />
        <ElectronicPaymentsCreateTable
          transactions={transactions}
          onSort={onSort}
          selectItem={selectItem}
          selectAll={selectAll}
          isTableLoading={isTableLoading}
          order={order}
        />
      </Card>
      <ElectronicPaymentsCreateButtons onRecordAndDownloadBankFile={onRecordAndDownloadBankFile} />
    </BaseTemplate>
  );
  return (
    <PageView loadingState={loadingState} view={view} />
  );
};

const mapStateToProps = state => ({
  loadingState: getLoadingState(state),
  transactions: getTableEntries(state),
  paymentTypes: getPaymentTypes(state),
  accounts: getAccounts(state),
  filterOptions: getFilterOptions(state),
  selectedAccountId: getSelectedAccountId(state),
  balanceValue: getBalanceValue(state),
  totalPayment: getTotalPayment(state),
  order: getOrder(state),
  isTableLoading: getIsTableLoading(state),
  alert: getAlert(state),
  transactionDescription: getTransactionDescription(state),
  referenceNumber: getReferenceNumber(state),
  dateOfPayment: getDateOfPayment(state),
  bankStatementDescription: getBankStatementDescription(state),
  modal: getModal(state),
  isBeforeStartOfFinancialYear: getIsBeforeStartOfFinancialYear(state),
});

export default connect(mapStateToProps)(ElectronicPaymentsCreateView);
