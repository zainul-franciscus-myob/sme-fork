import {
  BaseTemplate,
  Card,
  PageHead,
  Separator,
} from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';

import {
  getEmployeePay,
  getIsLoading,
  getPageTitle,
} from '../EmployeePayDetailSelectors';
import EmployeePayDetailButtons from './EmployeePayDetailButtons';
import EmployeePayDetailHeader from './EmployeePayDetailHeader';
import EmployeePayDetailTable from './EmployeePayDetailTable';
import PageView from '../../../components/PageView/PageView';
import style from './EmployeePayDetailView.module.css';

const EmployeePayDetailView = ({
  isLoading,
  onGoBackClick,
  onDeleteButtonClick,
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
    <div className={style.textContainer}>
      <h3>
        <span className={style.netPayLabel}>Total net payment</span>
        <span>{totalNetPayment}</span>
      </h3>
    </div>
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
      <EmployeePayDetailButtons
        onDeleteButtonClick={onDeleteButtonClick}
        onGoBackClick={onGoBackClick}
      />
    </BaseTemplate>
  );

  return <PageView isLoading={isLoading} view={view} />;
};

const mapStateToProps = state => ({
  isLoading: getIsLoading(state),
  employeePay: getEmployeePay(state),
  pageTitle: getPageTitle(state),
});

export default connect(mapStateToProps)(EmployeePayDetailView);
