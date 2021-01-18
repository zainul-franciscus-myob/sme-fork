import { BaseTemplate, Card, PageHead, Separator } from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';

import {
  getEmployeePay,
  getLoadingState,
  getPageTitle,
} from '../EmployeePayDetailSelectors';
import EmployeePayDetailButtons from './EmployeePayDetailButtons';
import EmployeePayDetailHeader from './EmployeePayDetailHeader';
import EmployeePayDetailTable from './EmployeePayDetailTable';
import PageView from '../../../../../components/PageView/PageView';
import styles from './EmployeePayDetailView.module.css';

const EmployeePayDetailView = ({
  loadingState,
  onGoBackClick,
  employeePay,
  pageTitle,
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
  } = employeePay;

  const totalsFooter = (
    <div className={styles.footerContainer}>
      <h3>
        <span className={styles.netPayLabel}>Total net payment</span>
        <span>{totalNetPayment}</span>
      </h3>
    </div>
  );

  const modalButtons = (
    <EmployeePayDetailButtons onGoBackClick={onGoBackClick} />
  );

  const view = (
    <BaseTemplate>
      <PageHead title={pageTitle} />
      <Card footer={totalsFooter}>
        <EmployeePayDetailHeader
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
        <EmployeePayDetailTable payItemGroups={lines} />
      </Card>
      {modalButtons}
    </BaseTemplate>
  );

  return <PageView loadingState={loadingState} view={view} />;
};

const mapStateToProps = (state) => ({
  loadingState: getLoadingState(state),
  employeePay: getEmployeePay(state),
  pageTitle: getPageTitle(state),
});

export default connect(mapStateToProps)(EmployeePayDetailView);
