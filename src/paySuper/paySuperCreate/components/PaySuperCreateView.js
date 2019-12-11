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
  getAuthorisationCode,
  getBalanceValue,
  getDateOfPayment,
  getFilterOptions,
  getIsLoading,
  getIsTableLoading,
  getModal,
  getOrder,
  getPaySuperDescription,
  getReferenceNumber,
  getSelectedAccountId,
  getSuperPayments,
  getTotalPayment,
} from '../paySuperCreateSelector';
import PageView from '../../../components/PageView/PageView';
import PaySuperCreateDetailHeader from './PaySuperCreateDetailHeader';
import RecordAndAuthoriseModal from './RecordAndAutoriseModal';
import SuperPaymentsTable from '../../components/SuperPaymentsTable';
import styles from '../../paySuper.module.css';

const PaySuperCreateView = ({
  alert,
  onDismissAlert,
  isLoading,
  onInputChange,
  paySuperDescription,
  referenceNumber,
  dateOfPayment,
  superPayments,
  accounts,
  onUpdateFilterBarOptions,
  onRecord,
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
  onCloseModalClick,
  onCancelButtonClick,
  onModalCancelButtonClick,
  onDoNotAuthoriseButtonClick,
  onAuthoriseButtonClick,
  onYesAuthoriseButtonClick,
  onResendAuthorisationCodeClick,
  authorisationCode,
  updateAuthorisationCode,
  onDateLinkClick,
  employeeTransactionModal,
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
      {employeeTransactionModal}
      {alertComponent}
      {modal && (
        <RecordAndAuthoriseModal
          modal={modal}
          onModalCancelButtonClick={onModalCancelButtonClick}
          onCloseModal={onCloseModalClick}
          onDoNotAuthoriseButtonClick={onDoNotAuthoriseButtonClick}
          onYesAuthoriseButtonClick={onYesAuthoriseButtonClick}
          authorisationCode={authorisationCode}
          updateAuthorisationCode={updateAuthorisationCode}
          onAuthoriseButtonClick={onAuthoriseButtonClick}
          onResendAuthorisationCodeClick={onResendAuthorisationCodeClick}
        />
      )}
      <PageHead title="Create super payment" testId="paySuperCreateHeader" />
      <Card>
        <FilterBar onApply={onApplyFilter}>
          <FilterBar.Group>
            <DatePicker label="Transactions from" name="datepicker-from" value={dateFrom} onSelect={onDatePickerChange('dateFrom')} />
            <DatePicker label="Transactions to" name="datepicker-to" value={dateTo} onSelect={onDatePickerChange('dateTo')} />
          </FilterBar.Group>
        </FilterBar>
      </Card>

      <Card footer={totalPaymentFooter}>
        <PaySuperCreateDetailHeader
          testId="PaySuperCreateDetailHeader"
          accounts={accounts}
          selectedAccountId={selectedAccountId}
          onAccountChange={onAccountChange}
          balanceValue={balanceValue}
          onInputChange={onInputChange}
          paySuperDescription={paySuperDescription}
          referenceNumber={referenceNumber}
          dateOfPayment={dateOfPayment}
        />
        <SuperPaymentsTable
          superPayments={superPayments}
          onSort={onSort}
          selectItem={selectItem}
          selectAll={selectAll}
          isTableLoading={isTableLoading}
          order={order}
          onDateLinkClick={onDateLinkClick}
          renderCheckbox
        />
      </Card>
      <div style={{ marginTop: '12px' }}>
        <ButtonRow>
          <Button onClick={onCancelButtonClick} type="secondary">Cancel</Button>
          <Button onClick={onRecord}>Record</Button>
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
  superPayments: getSuperPayments(state),
  accounts: getAccounts(state),
  filterOptions: getFilterOptions(state),
  selectedAccountId: getSelectedAccountId(state),
  balanceValue: getBalanceValue(state),
  totalPayment: getTotalPayment(state),
  order: getOrder(state),
  isTableLoading: getIsTableLoading(state),
  alert: getAlert(state),
  paySuperDescription: getPaySuperDescription(state),
  referenceNumber: getReferenceNumber(state),
  dateOfPayment: getDateOfPayment(state),
  modal: getModal(state),
  authorisationCode: getAuthorisationCode(state),
});

export default connect(mapStateToProps)(PaySuperCreateView);
