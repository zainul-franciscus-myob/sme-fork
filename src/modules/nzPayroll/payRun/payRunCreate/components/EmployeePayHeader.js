import { connect } from 'react-redux';
import React from 'react';

import { getEmployeeHeader } from '../PayRunSelectors';
import PayHeader from '../../components/PayHeader';

const EmployeePayHeader = ({ employeeHeader }) => {
  const initItems = [
    {
      label: 'Pay cycle',
      name: 'paymentFrequency',
      value: employeeHeader.paymentFrequency,
      testid: 'test-payment-frequency',
    },
    {
      label: 'Pay period start',
      name: 'payPeriodStart',
      value: employeeHeader.payPeriodStart,
      testid: 'test-period-start',
    },
    {
      label: 'Pay period end',
      name: 'payPeriodEnd',
      value: employeeHeader.payPeriodEnd,
      testid: 'test-period-end',
    },
    {
      label: 'Date of payment',
      name: 'paymentDate',
      value: employeeHeader.paymentDate,
      testid: 'test-payment-date',
    },
  ];

  const items = employeeHeader.totalTakeHomePay
    ? [
        ...initItems,
        {
          label: 'Total take home pay',
          name: 'totalTakeHomePay',
          value: `$${employeeHeader.totalTakeHomePay}`,
          testid: 'test-take-home-pay',
        },
      ]
    : initItems;

  return <PayHeader items={items} />;
};

const mapStateToProps = (state) => ({
  employeeHeader: getEmployeeHeader(state),
});

export default connect(mapStateToProps)(EmployeePayHeader);
