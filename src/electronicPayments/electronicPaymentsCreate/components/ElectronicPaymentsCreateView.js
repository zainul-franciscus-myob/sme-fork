import {
  Alert,
  BaseTemplate,
  Button,
  ButtonRow,
  Card,
  DatePicker,
  FilterBar,
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
  getElectronicPayments,
  getFilterOptions,
  getIsLoading,
  getIsTableLoading,
  getModal,
  getOrder,
  getReferenceNumber,
  getSelectedAccountId,
  getTotalPayment,
  getTransactionDescription,
} from '../../ElectronicPaymentsSelector';
import ElectronicPaymentsDetailHeader from './ElectronicPaymentsCreateDetailHeader';
import ElectronicPaymentsTable from '../../ElectronicPaymentsTable';
import PageView from '../../../components/PageView/PageView';
import RecordAndCreateFileModal from './RecordAndCreateFileModal';
import styles from '../../ElectronicPayments.module.css';

const ElectronicPaymentsCreateView = ({
  alert,
  onDismissAlert,
  isLoading,
  onInputChange,
  transactionDescription,
  referenceNumber,
  dateOfPayment,
  bankStatementDescription,
  electronicPayments,
  accounts,
  onUpdateFilterBarOptions,
  onRecordAndDownloadBankFile,
  onApplyFilter,
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
    dateFrom,
    dateTo,
  },
  modal,
  onCancelButtonClick,
  onRecordButtonClick,
  onContinueButtonClick,
  onReferenceNumberClick,
  employeePayModal,
}) => {
  const onDatePickerChange = filterName => ({ value }) => {
    onUpdateFilterBarOptions({ filterName, value });
  };

  const totalPaymentFooter = (
    <div className={styles.totalPaymentsFooter}>
      <h4>
        <span className={styles.totalPaymentsFooterLabel}>Total payment</span>
        <span>{totalPayment}</span>
      </h4>
    </div>
  );

  const alertComponent = alert && (
    <Alert type={alert.type} onDismiss={onDismissAlert}>
      {alert.message}
    </Alert>
  );

  const view = (
    <BaseTemplate>
      {alertComponent}
      {employeePayModal}
      {modal && (
        <RecordAndCreateFileModal
          modal={modal}
          onCancelButtonClick={onCancelButtonClick}
          onRecordButtonClick={onRecordButtonClick}
          onContinueButtonClick={onContinueButtonClick}
        />
      )}
      { !alertComponent && (
        <Alert type="info">
          Make sure the employee&apos;s BSB and account number is correct.
          You may not be able to recover a payment made to the wrong account.
        </Alert>
      )}
      <PageHead title="Create bank file to pay employees" />
      <Card>
        <FilterBar onApply={onApplyFilter}>
          <FilterBar.Group>
            <DatePicker label="Transactions from" name="datepicker-from" value={dateFrom} onSelect={onDatePickerChange('dateFrom')} />
            <DatePicker label="Transactions to" name="datepicker-to" value={dateTo} onSelect={onDatePickerChange('dateTo')} />
          </FilterBar.Group>
        </FilterBar>
      </Card>
      <Card
        footer={totalPaymentFooter}
      >
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
        />
        <ElectronicPaymentsTable
          electronicPayments={electronicPayments}
          onSort={onSort}
          selectItem={selectItem}
          selectAll={selectAll}
          isTableLoading={isTableLoading}
          order={order}
          onReferenceNumberClick={onReferenceNumberClick}
          renderCheckbox
        />
      </Card>
      <div style={{ marginTop: '12px' }}>
        <ButtonRow>
          <Button onClick={onRecordAndDownloadBankFile}>Record and download bank file</Button>
        </ButtonRow>
      </div>
    </BaseTemplate>
  );
  return (
    <PageView isLoading={isLoading} view={view} />
  );
};

const mapStateToProps = state => ({
  isLoading: getIsLoading(state),
  electronicPayments: getElectronicPayments(state),
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
});

export default connect(mapStateToProps)(ElectronicPaymentsCreateView);
