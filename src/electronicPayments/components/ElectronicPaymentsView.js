import {
  Alert,
  BaseTemplate,
  Button,
  ButtonRow,
  Card,
  DatePicker,
  DetailHeader,
  FilterBar,
  FormHorizontal,
  Input,
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
  getOrder,
  getReferenceNumber,
  getSelectedAccountId,
  getTotalPayment,
  getTransactionDescription,
} from '../ElectronicPaymentsSelector';
import AccountCombobox from '../../components/combobox/AccountCombobox';
import ElectronicPaymentsTable from './ElectronicPaymentsTable';
import PageView from '../../components/PageView/PageView';
import handleComboboxChange from '../../components/handlers/handleComboboxChange';
import handleDateChange from '../../components/handlers/handleDateChange';
import handleInputChange from '../../components/handlers/handleInputChange';

const ElectronicPaymentsView = ({
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
}) => {
  const onDatePickerChange = filterName => ({ value }) => {
    onUpdateFilterBarOptions({ filterName, value });
  };

  const primary = (
    <div>
      <AccountCombobox
        items={accounts}
        selectedId={selectedAccountId}
        onChange={handleComboboxChange('id', onAccountChange)}
        label="Account *"
        hideLabel={false}
      />
      <FormHorizontal>
        <h5>
          <span>
            Balance
          </span>
          <span style={{ float: 'right' }}>
            {balanceValue}
          </span>
        </h5>
      </FormHorizontal>
      <Input
        name="transactionDescription"
        label="Description of transaction"
        value={transactionDescription}
        onChange={handleInputChange(onInputChange)}
      />
    </div>
  );

  const secondary = (
    <div>
      <Input
        name="referenceNumber"
        label="Reference number *"
        value={referenceNumber}
        onChange={handleInputChange(onInputChange)}
      />
      <DatePicker
        name="dateOfPayment"
        label="Date of payment *"
        value={dateOfPayment}
        onSelect={handleDateChange('dateOfPayment', onInputChange)}
      />
      <Input
        name="bankStatementDescription"
        label="Description of your bank statement *"
        value={bankStatementDescription}
        onChange={handleInputChange(onInputChange)}
      />
    </div>
  );

  const totalPaymentStyle = {
    paddingTop: '1.6rem',
    paddingRight: '1.6rem',
    textAlign: 'right',
  };

  const totalPaymentFooter = (
    <div style={totalPaymentStyle}>
      <h4>
        <span style={{ paddingRight: '3rem' }}>Total payment</span>
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
      <Alert type="info">Make sure the employee&apos;s BSB and account number is correct. You may not be able to recover a payment made to the wrong account.</Alert>
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
        <DetailHeader primary={primary} secondary={secondary} />
        <ElectronicPaymentsTable
          electronicPayments={electronicPayments}
          onSort={onSort}
          selectItem={selectItem}
          selectAll={selectAll}
          isTableLoading={isTableLoading}
          order={order}
        />
      </Card>
      <ButtonRow>
        <Button onClick={onRecordAndDownloadBankFile}>Record and download bank file</Button>
      </ButtonRow>
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
});

export default connect(mapStateToProps)(ElectronicPaymentsView);
